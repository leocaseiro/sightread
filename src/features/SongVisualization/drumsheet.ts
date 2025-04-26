import { GivenState } from './canvasRenderer'
import { CanvasItem, getItemsInView, Viewport } from './utils'
import {
  drawKeySignature,
  drawPlayNotesLine,
  drawStaffConnectingLine,
  drawDrumStaffLines,
  drawTimeSignature,
  STAFF_SPACE,
  drawPercussionClef,
} from '@/features/drawing'
import { Clef, SongMeasure, SongNote } from '@/types'
import { pickHex } from '@/utils'
import {
  drawMusicNote,
  drawSymbol,
  PLAY_NOTES_WIDTH,
} from '../drawing/sheet'
import {
  getDrumNoteY,
  getDrumProp,
} from '../drawing/drumsheet'
import { getKey, getKeyDetails, getNote, glyphs } from '../theory'
import midiState from '../midi'
import { isHitNote, isMissedNote } from '../player'

const TEXT_FONT = 'Arial'
const STAFF_START_X = 30
const STAFF_FIVE_LINES_HEIGHT = 80
const PLAY_NOTES_LINE_OFFSET = STAFF_SPACE // offset above and below the staff lines

function getViewport(state: Readonly<GivenState>): Viewport {
  return {
    start: state.time * state.pps,
    end: state.time * state.pps + (state.windowWidth - STAFF_START_X),
  }
}

export type State = GivenState & {
  viewport: Viewport
}

export function deriveState(state: GivenState) {
  return { ...state, viewport: getViewport(state) }
}

// Optimization ideas:
// - can use offdom canvas (not OffscreenCanvas API) for background since its repainting over and over.
// - can also treat it all as one giant image that gets partially drawn each frame.
export function renderDrumSheetVis(givenState: GivenState): void {
  const state = deriveState(givenState)
  state.ctx.clearRect(0, 0, state.windowWidth, state.height)
  drawStaticsUnderlay(state)
  const items = getSheetItemsInView(state)
  for (const item of items) {
    if (item.type === 'measure') {
      continue
    }
    renderDrumSheetNote(state, item)
  }
  drawDrumStaticsOverlay(state)
  renderDrumMidiPressedKeys(state, items)
}

function getSheetItemsInView(state: State): CanvasItem[] {
  const startPred = (item: CanvasItem) => getItemStartEnd(state, item).end >= 0
  const endPred = (item: CanvasItem) => getItemStartEnd(state, item).start > state.windowWidth
  return getItemsInView(state, startPred, endPred)
}

function drawDrumStaticsOverlay(state: State) {
  const { ctx } = state
  const overlayEnd = getPlayNotesLineX(state) - STAFF_SPACE * 2
  ctx.clearRect(0, 0, overlayEnd, state.height)
  ctx.fillStyle = 'black'
  ctx.strokeStyle = 'black'

  const staffHeight = STAFF_FIVE_LINES_HEIGHT
  const trebleTopY = getDrumStaffTopY(state)
  const bassTopY = getDrumStaffTopY(state)
  drawDrumStaffLines(state.ctx, STAFF_START_X, bassTopY, overlayEnd)
//   drawStaffConnectingLine(state.ctx, STAFF_START_X, trebleTopY - 1, bassTopY + staffHeight + 1)

  const playLineTop = trebleTopY - PLAY_NOTES_LINE_OFFSET
  const playLineBottom = bassTopY + staffHeight + PLAY_NOTES_LINE_OFFSET
  drawPlayNotesLine(ctx, getPlayNotesLineX(state) - 2, playLineTop, playLineBottom)

  drawPercussionClef(ctx, getClefX(), bassTopY)

  if (state.timeSignature) {
    const x = getTimeSignatureX(state)
    drawTimeSignature(ctx, x, bassTopY, state.timeSignature)
  }
}

function drawStaticsUnderlay(state: State) {
  const { ctx } = state
  ctx.fillStyle = 'black'
  ctx.strokeStyle = 'black'

  const bassTopY = getDrumStaffTopY(state)
  drawDrumStaffLines(state.ctx, STAFF_START_X, bassTopY, state.windowWidth)
}

function getDrumStaffTopY(state: State) {
  const staffHeight = STAFF_FIVE_LINES_HEIGHT
  return state.height / 2 - 150 - staffHeight
}
function getClefX() {
  return STAFF_START_X + STAFF_SPACE
}

function getKeySignatureX() {
  return getClefX() + 3 * STAFF_SPACE
}

function getTimeSignatureX(state: State) {
  const fifths = getKeyDetails(state.keySignature).notes.length
  return getKeySignatureX() + fifths * STAFF_SPACE + STAFF_SPACE
}

function getPlayNotesLineX(state: State) {
  return getTimeSignatureX(state) + STAFF_SPACE * 4
}

const colorMap = {
  primary: '121,74,227',
  hover: '185,154,244',
  disabled: '100,100,100',
  black: '0,0,0',
}

const coloredNotesMapAcronym: { [acronym: string]: string } = {
  HH:  '168, 101, 35',
  HHE: '168, 101, 35',
  OH:  '255, 155, 23',
  OHE: '255, 155, 23',
  PH:  '168, 101, 35',
  RD:  '246, 220, 67',
  RDB: '250, 213, 154',
  SP:  '255,215,0',
  CR:  '255,255,0',
  CH:  '213, 199, 163',
  SN:  '181, 252, 205',
  T1:  '0,255,255',
  T2:  '27, 86, 253',
  T3:  '156, 39, 176',
  T4: '255,20,147',
  BD:  '255,0,255',
};

function getGameColorPrefix(state: State, note: SongNote, canvasX: number) {
  const playNotesLineX = getPlayNotesLineX(state)
  const isPlayingNote = canvasX <= playNotesLineX

  if (isHitNote(state.player, note) && midiState.getPressedNotes().has(note.midiNote)) {
    return colorMap.hover
  } else if (isMissedNote(state.player, note)) {
    return colorMap.disabled
  } else if (isPlayingNote) {
    return colorMap.primary
  }
  return colorMap.black
}

function getLearnSongColorPrefix(
  state: State,
  note: SongNote,
  canvasX: number,
  coloredNotes: boolean,
  step: string,
) {
  const playNotesLineX = getPlayNotesLineX(state)
  const isPlayingNote = canvasX <= playNotesLineX

  if (isPlayingNote) {
    return colorMap.primary
  }

  return getNoteColorAcronym(coloredNotes, getDrumProp<string>(note.midiNote, 'acronym'))
}

function renderDrumSheetNote(state: State, note: SongNote): void {
  const { ctx, pps, keySignature } = state
  ctx.save()
  const length = Math.round(pps * note.duration)
  const posX = getItemStartEnd(state, note).start
  const staffTopY = getDrumStaffTopY(state)
  const playNotesLineX = getPlayNotesLineX(state)
  let canvasX = posX + playNotesLineX + PLAY_NOTES_WIDTH / 2
  let canvasY = getDrumNoteY(note.midiNote, 'drum', staffTopY)

  const key = getKey(note.midiNote, state.keySignature)
  const prefix = state.game
    ? getGameColorPrefix(state, note, canvasX)
    : getLearnSongColorPrefix(state, note, canvasX, state.coloredNotes, key[0])

  const trailLength = length - STAFF_SPACE
  const trailHeight = 10
  const noteGradient = ctx.createLinearGradient(
    playNotesLineX - STAFF_SPACE * 2,
    0,
    playNotesLineX,
    0,
  )
  fadeColorToWhite(prefix, noteGradient)

  ctx.fillStyle = noteGradient
  ctx.strokeStyle = noteGradient
  ctx.fillRect(canvasX + STAFF_SPACE / 2, canvasY - trailHeight / 2, trailLength, trailHeight)
  ctx.globalCompositeOperation = 'source-over'

  // Return after drawing the tail for the notes that have already crossed.
  if (canvasX < playNotesLineX - STAFF_SPACE * 2) {
    ctx.restore()
    return
  }

  drawMusicNote(ctx, canvasX, canvasY, noteGradient)
  if (state.drawNotes) {
    ctx.font = `9px ${TEXT_FONT}`
    ctx.fillStyle = 'white'
    ctx.fillText(String(getDrumProp<string>(note.midiNote, 'acronym')), canvasX - 3, canvasY + 3)
  }
  ctx.restore()
}

export function getItemStartEnd(state: State, item: CanvasItem): { start: number; end: number } {
  const start = item.time * state.pps - state.viewport.start
  const duration = item.type === 'note' ? item.duration : 100
  const end = start + duration * state.pps
  return { start, end }
}

function renderDrumMidiPressedKeys(state: State, inRange: (SongNote | SongMeasure)[]): void {
  const { ctx } = state
  const pressed = midiState.getPressedNotes()
  for (let note of pressed.keys()) {
    const staffTopY = getDrumStaffTopY(state)
    const canvasY = getDrumNoteY(note, 'drum', staffTopY)
    let canvasX = getPlayNotesLineX(state) - 2
    const key = getKey(note)
    drawMusicNote(
      ctx,
      canvasX,
      canvasY,
      state.coloredNotes ? `rgba(${getNoteColorAcronym(true, getDrumProp<string>(note, 'acronym'))},1)` : 'red',
    )

    if (state.drawNotes) {
      ctx.font = `9px ${TEXT_FONT}`
      ctx.fillStyle = 'white'
      ctx.fillText(String(getDrumProp<string>(note, 'acronym')), canvasX - 3, canvasY + 3)
    }
  }
}

function fadeColorToWhite(color: string, gradient: any) {
  gradient.addColorStop(0, `rgba(${color},0)`)
  gradient.addColorStop(0.5, `rgba(${color},0.1)`)
  gradient.addColorStop(0.8, `rgba(${color},0.3`)
  gradient.addColorStop(1, `rgba(${color},1)`)
}

function getNoteColorAcronym(coloredNotes: boolean, acronym: string): string {
  return coloredNotes ? coloredNotesMapAcronym[acronym] || colorMap.black : colorMap.black
}
