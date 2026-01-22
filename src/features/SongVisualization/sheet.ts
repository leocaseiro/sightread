import {
  drawCurlyBrace,
  drawFClef,
  drawGClef,
  drawKeySignature,
  drawPlayNotesLine,
  drawStaffConnectingLine,
  drawStaffLines,
  drawTimeSignature,
  STAFF_SPACE,
} from '@/features/drawing'
import { Clef, SongMeasure, SongNote } from '@/types'
import { pickHex } from '@/utils'
import {
  drawLedgerLines,
  drawMusicNote,
  drawSymbol,
  getNoteY,
  PLAY_NOTES_WIDTH,
} from '../drawing/sheet'
import midiState from '../midi'
import { isHitNote, isMissedNote } from '../player'
import {
  getFixedDoNoteFromKey,
  getKey,
  getKeyDetails,
  getNote,
  glyphs,
  transposeMidi,
} from '../theory'
import { GivenState } from './canvas-renderer'
import { CanvasItem, getItemsInView, Viewport } from './utils'

const TEXT_FONT = 'Arial'
const STAFF_START_X = 100
const STAFF_FIVE_LINES_HEIGHT = 80
const PLAY_NOTES_LINE_OFFSET = STAFF_SPACE // offset above and below the staff lines

function getViewport(state: Readonly<GivenState>): Viewport {
  return {
    start: state.time * state.pps,
    end: state.time * state.pps + (state.windowWidth - STAFF_START_X),
  }
}

type State = GivenState & {
  viewport: Viewport
}

function deriveState(state: GivenState) {
  return { ...state, viewport: getViewport(state) }
}

// Optimization ideas:
// - can use offdom canvas (not OffscreenCanvas API) for background since its repainting over and over.
// - can also treat it all as one giant image that gets partially drawn each frame.
export function renderSheetVis(givenState: GivenState): void {
  const state = deriveState(givenState)
  state.ctx.clearRect(0, 0, state.windowWidth, state.height)
  drawStaticsUnderlay(state)
  const items = getSheetItemsInView(state)
  for (const item of items) {
    if (item.type === 'measure') {
      continue
    }
    renderLedgerLines(state, item)
  }
  for (const item of items) {
    if (item.type === 'measure') {
      continue
    }
    renderSheetNote(state, item)
  }
  drawStaticsOverlay(state)
  renderMidiPressedKeys(state, items)
}

function getSheetItemsInView(state: State): CanvasItem[] {
  const startPred = (item: CanvasItem) => getItemStartEnd(state, item).end >= 0
  const endPred = (item: CanvasItem) => getItemStartEnd(state, item).start > state.windowWidth
  return getItemsInView(state, startPred, endPred)
}

function isTrebleVisible(state: State) {
  return state.sheetStaffs !== 'bass'
}
function isBassVisible(state: State) {
  return state.sheetStaffs !== 'treble'
}

function drawStaticsOverlay(state: State) {
  const { ctx, displayKeySignature } = state
  const overlayEnd = getPlayNotesLineX(state) - STAFF_SPACE * 2
  ctx.clearRect(0, 0, overlayEnd, state.height)
  ctx.fillStyle = 'black'
  ctx.strokeStyle = 'black'

  if (isTrebleVisible(state) && isBassVisible(state)) {
    const curlyBraceSize = STAFF_FIVE_LINES_HEIGHT * 2 + 100
    const curlyBraceY = state.height / 2 + curlyBraceSize / 2
    drawCurlyBrace(state.ctx, STAFF_START_X - 25, curlyBraceY, curlyBraceSize)
  }

  const staffHeight = STAFF_FIVE_LINES_HEIGHT
  const trebleTopY = getTrebleStaffTopY(state)
  const bassTopY = getBassStaffTopY(state)
  if (isTrebleVisible(state)) {
    drawStaffLines(state.ctx, STAFF_START_X, trebleTopY, overlayEnd, state.sheetVisibleLines?.treble)
  }
  if (isBassVisible(state)) {
    drawStaffLines(state.ctx, STAFF_START_X, bassTopY, overlayEnd, state.sheetVisibleLines?.bass)
  }
  if (isTrebleVisible(state) && isBassVisible(state)) {
    drawStaffConnectingLine(state.ctx, STAFF_START_X, trebleTopY - 1, bassTopY + staffHeight + 1)
  }

  const playLineTop = (isTrebleVisible(state) ? trebleTopY : bassTopY) - PLAY_NOTES_LINE_OFFSET
  const playLineBottom =
    (isBassVisible(state) ? bassTopY + staffHeight : trebleTopY + staffHeight) +
    PLAY_NOTES_LINE_OFFSET
  drawPlayNotesLine(ctx, getPlayNotesLineX(state) - 2, playLineTop, playLineBottom)

  if (isTrebleVisible(state)) {
    drawGClef(ctx, getClefX(), trebleTopY)
  }
  if (isBassVisible(state)) {
    drawFClef(ctx, getClefX(), bassTopY)
  }
  if (displayKeySignature) {
    if (isTrebleVisible(state)) {
      drawKeySignature(ctx, getKeySignatureX(), trebleTopY, displayKeySignature, 'treble')
    }
    if (isBassVisible(state)) {
      drawKeySignature(ctx, getKeySignatureX(), bassTopY, displayKeySignature, 'bass')
    }
  }

  if (state.timeSignature) {
    const x = getTimeSignatureX(state)
    if (isTrebleVisible(state)) {
      drawTimeSignature(ctx, x, trebleTopY, state.timeSignature)
    }
    if (isBassVisible(state)) {
      drawTimeSignature(ctx, x, bassTopY, state.timeSignature)
    }
  }
}

function drawStaticsUnderlay(state: State) {
  const { ctx } = state
  ctx.fillStyle = 'black'
  ctx.strokeStyle = 'black'

  const trebleTopY = getTrebleStaffTopY(state)
  const bassTopY = getBassStaffTopY(state)
  if (isTrebleVisible(state)) {
    drawStaffLines(state.ctx, STAFF_START_X, trebleTopY, state.windowWidth, state.sheetVisibleLines?.treble)
  }
  if (isBassVisible(state)) {
    drawStaffLines(state.ctx, STAFF_START_X, bassTopY, state.windowWidth, state.sheetVisibleLines?.bass)
  }
}

function getTrebleStaffTopY(state: State) {
  const staffHeight = STAFF_FIVE_LINES_HEIGHT
  if (state.sheetStaffs === 'treble') {
    return state.height / 2 - staffHeight / 2
  }
  return state.height / 2 - 50 - staffHeight
}

function getBassStaffTopY(state: State) {
  const staffHeight = STAFF_FIVE_LINES_HEIGHT
  if (state.sheetStaffs === 'bass') {
    return state.height / 2 - staffHeight / 2
  }
  return state.height / 2 + 50
}

function getClefX() {
  return STAFF_START_X + STAFF_SPACE
}

function getKeySignatureX() {
  return getClefX() + 3 * STAFF_SPACE
}

function getTimeSignatureX(state: State) {
  const fifths = state.displayKeySignature
    ? getKeyDetails(state.displayKeySignature).notes.length
    : 0
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

const coloredNotesMap: { [step: string]: string } = {
  A: '99,102,241',
  B: '168,85,247',
  C: '251,113,133',
  D: '251,146,60',
  E: '250,204,21',
  F: '74,222,128',
  G: '56,189,248',
}

function getGameColorPrefix(
  state: State,
  note: SongNote,
  canvasX: number,
  coloredNotes: boolean,
  step: string,
) {
  const playNotesLineX = getPlayNotesLineX(state)
  const isPlayingNote = canvasX <= playNotesLineX

  if (
    isHitNote(state.player, note) &&
    midiState.getPressedNotes().has(getTransposedMidi(state, note))
  ) {
    return coloredNotes ? getNoteColor(true, step) : colorMap.hover
  } else if (isMissedNote(state.player, note)) {
    return colorMap.disabled
  } else if (isPlayingNote) {
    return coloredNotes ? getNoteColor(true, step) : colorMap.primary
  }
  return coloredNotes ? getNoteColor(true, step) : colorMap.black
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
    return coloredNotes ? getNoteColor(true, step) : colorMap.primary
  }

  return getNoteColor(coloredNotes, step)
}

function renderLedgerLines(state: State, note: SongNote): void {
  const { ctx, pps, keySignature } = state
  const posX = getItemStartEnd(state, note).start
  let staff: Clef = state.hands?.[note.track].hand === 'right' ? 'treble' : 'bass'
  if (state.sheetStaffs === 'treble') staff = 'treble'
  if (state.sheetStaffs === 'bass') staff = 'bass'
  const staffTopY = staff === 'treble' ? getTrebleStaffTopY(state) : getBassStaffTopY(state)
  const playNotesLineX = getPlayNotesLineX(state)
  let canvasX = posX + playNotesLineX + PLAY_NOTES_WIDTH / 2
  const transposed = getTransposedMidi(state, note)

  // Skip ledger lines when custom row override is active for this note
  const custom = state.effectiveNoteCustomizations?.[transposed]
  if (state.noteCustomizationUseRowOffset && custom?.order != null) {
    return
  }

  const ledgerGradient = ctx.createLinearGradient(
    playNotesLineX - STAFF_SPACE * 2,
    0,
    playNotesLineX,
    0,
  )
  fadeColorToWhite('0,0,0', ledgerGradient)

  ctx.fillStyle = ledgerGradient
  ctx.strokeStyle = ledgerGradient

  drawLedgerLines(
    ctx,
    canvasX - STAFF_SPACE,
    STAFF_SPACE * 2,
    staffTopY,
    transposed,
    staff,
    state.keySignature,
  )
}

function renderSheetNote(state: State, note: SongNote): void {
  const { ctx, pps, keySignature } = state
  ctx.save()
  const length = Math.round(pps * note.duration)
  const posX = getItemStartEnd(state, note).start
  const color = sheetNoteColor(posX, length)
  let staff: Clef = state.hands?.[note.track].hand === 'right' ? 'treble' : 'bass'
  if (state.sheetStaffs === 'treble') staff = 'treble'
  if (state.sheetStaffs === 'bass') staff = 'bass'
  const staffTopY = staff === 'treble' ? getTrebleStaffTopY(state) : getBassStaffTopY(state)
  const playNotesLineX = getPlayNotesLineX(state)
  let canvasX = posX + playNotesLineX + PLAY_NOTES_WIDTH / 2
  const transposed = getTransposedMidi(state, note)
  let canvasY = getNoteY(transposed, staff, staffTopY, keySignature)

  // Apply per-note customization
  const custom = state.effectiveNoteCustomizations?.[transposed]
  if (custom?.enabled === false) {
    ctx.restore()
    return
  }
  if (state.noteCustomizationUseRowOffset && custom?.order != null) {
    canvasY = staffTopY + custom.order * (STAFF_SPACE / 2) // PIXELS_PER_ROW
  }

  const key = getKey(transposed, state.keySignature)
  const prefix = state.game
    ? getGameColorPrefix(state, note, canvasX, state.coloredNotes, key[0])
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
  const headColor: string | CanvasGradient = custom?.color ?? noteGradient

  ctx.fillStyle = headColor as any
  ctx.strokeStyle = headColor as any
  let trailStartX = canvasX + STAFF_SPACE / 2
  if (custom?.shape === 'cross') {
    trailStartX -= STAFF_SPACE * 0.45
  } else if (custom?.shape === 'triangle') {
    trailStartX -= STAFF_SPACE * 0.5
  }
  ctx.fillRect(trailStartX, canvasY - trailHeight / 2, trailLength, trailHeight)
  ctx.globalCompositeOperation = 'source-over'

  // Return after drawing the tail for the notes that have already crossed.
  if (canvasX < playNotesLineX - STAFF_SPACE * 2) {
    ctx.restore()
    return
  }

  drawMusicNote(ctx, canvasX, canvasY, headColor, custom?.shape ?? 'notehead')
  const accidental = key.length == 2 && key[1]
  if (!custom?.order && accidental && state.sheetShowNoteAccidentals !== false) {
    const symbol = accidental === '#' ? glyphs.accidentalSharp : glyphs.accidentalFlat
    const symbolX = canvasX - (STAFF_SPACE + 8)
    drawSymbol(ctx, symbol, symbolX, canvasY, STAFF_FIVE_LINES_HEIGHT * 0.8, headColor)
  }
  const customLabel = custom?.label
  if (customLabel) {
    // Center 1–3 character labels over the note head
    ctx.font = `10px ${TEXT_FONT}`
    ctx.fillStyle = 'white'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    const shape = custom?.shape ?? 'notehead'
    // Fine-tuned offsets by shape so text sits visually centered inside
    // the rendered head while avoiding overlap with strokes.
    let labelOffsetX = 0
    let labelOffsetY = 0
    switch (shape) {
      case 'notehead':
        labelOffsetX = 3
        labelOffsetY = 1
        break
      case 'cross':
        labelOffsetX = 1
        labelOffsetY = 1
        break
      case 'diamond':
        labelOffsetX = -1
        labelOffsetY = 1
        break
      case 'triangle':
        labelOffsetX = 5
        labelOffsetY = 0
        break
    }
    ctx.fillText(customLabel, canvasX + labelOffsetX, canvasY + labelOffsetY)
  } else if (state.noteLabels !== 'none') {
    ctx.font = `9px ${TEXT_FONT}`
    ctx.fillStyle = 'white'
    const step = key[0]
    const noteText = state.noteLabels === 'alphabetical' ? step : getFixedDoNoteFromKey(step)
    const xOffset = state.noteLabels === 'alphabetical' ? 0 : 3
    ctx.fillText(noteText, canvasX - xOffset, canvasY + 3)
  }
  ctx.restore()
}

function getItemStartEnd(state: State, item: CanvasItem): { start: number; end: number } {
  const start = item.time * state.pps - state.viewport.start
  const duration = item.type === 'note' ? item.duration : 100
  const end = start + duration * state.pps
  return { start, end }
}

function sheetNoteColor(x: number, length: number): string {
  const black = '#000000'
  if (x + length < 0 || x >= 0) {
    return black
  }
  const ratio = Math.max((x + length) / length, 0.15) // idk why but lower causes orange
  return pickHex('#8147EB', black, ratio)
}

function renderMidiPressedKeys(state: State, inRange: (SongNote | SongMeasure)[]): void {
  const { ctx } = state
  const pressed = midiState.getPressedNotes()
  for (let note of pressed.keys()) {
    let staff: Clef = note < getNote('C4') ? 'bass' : 'treble'
    if (state.sheetStaffs === 'treble') staff = 'treble'
    if (state.sheetStaffs === 'bass') staff = 'bass'
    const inRangeNote = inRange.find(
      (n) => n.type === 'note' && getTransposedMidi(state, n) === +note,
    ) as SongNote | undefined
    if (inRangeNote) {
      staff = state.hands?.[inRangeNote.track].hand === 'right' ? 'treble' : 'bass'
      if (state.sheetStaffs === 'treble') staff = 'treble'
      if (state.sheetStaffs === 'bass') staff = 'bass'
    }

    if (state.game && isHitNote(state.player, inRangeNote)) {
      return
    }

    const staffTopY = staff === 'bass' ? getBassStaffTopY(state) : getTrebleStaffTopY(state)
    const transposed = transposeMidi(note, state.transpose)
    let canvasY = getNoteY(transposed, staff, staffTopY, state.keySignature)
    let canvasX = getPlayNotesLineX(state) - 2
    const custom = state.effectiveNoteCustomizations?.[transposed]
    if (state.noteCustomizationUseRowOffset && custom?.order != null) {
      canvasY = staffTopY + custom.order * (STAFF_SPACE / 2)
    }
    const key = getKey(transposed, state.keySignature)
    const headColor =
      custom?.color ?? (state.coloredNotes ? `rgba(${getNoteColor(true, key[0])},1)` : 'red')
    drawMusicNote(ctx, canvasX, canvasY, headColor, custom?.shape ?? 'notehead')

    // Draw accidental (sharp or flat)
    if (key.length === 2 && state.sheetShowNoteAccidentals !== false) {
      const symbolColor =
        state.coloredNotes && !custom?.color
          ? `rgba(${getNoteColor(true, key[0])},1)`
          : (custom?.color as string) ?? 'black'
      const accidental = key[1] === '#' ? glyphs.accidentalSharp : glyphs.accidentalFlat
      drawSymbol(ctx, accidental, canvasX - 24, canvasY, STAFF_FIVE_LINES_HEIGHT * 0.6, symbolColor)
    }
    if (state.noteLabels !== 'none') {
      ctx.font = `9px ${TEXT_FONT}`
      ctx.fillStyle = 'white'
      const step = key[0]
      const noteText = state.noteLabels === 'alphabetical' ? step : getFixedDoNoteFromKey(step)
      ctx.fillText(noteText, canvasX, canvasY + 3)
    }
  }
}

function getTransposedMidi(state: State, note: SongNote) {
  return transposeMidi(note.midiNote, state.transpose)
}

function fadeColorToWhite(color: string, gradient: any) {
  gradient.addColorStop(0, `rgba(${color},0)`)
  gradient.addColorStop(0.5, `rgba(${color},0.1)`)
  gradient.addColorStop(0.8, `rgba(${color},0.3`)
  gradient.addColorStop(1, `rgba(${color},1)`)
}

function getNoteColor(coloredNotes: boolean, step: string): string {
  return coloredNotes ? coloredNotesMap[step] : colorMap.black
}
