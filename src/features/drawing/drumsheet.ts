import { getKey, getNote, getOctave, glyphs, KEY_SIGNATURE, Note } from '../theory';
import { Clef, DrumNoteMapping } from '../../types';
import { drawSymbol, line } from './index'

const STAFF_LINE_WIDTH = 2
const STAFF_FIVE_LINES_HEIGHT = 80
// const STAFF_SPACE = STAFF_FIVE_LINES_HEIGHT / 4
const PIXELS_PER_ROW = STAFF_FIVE_LINES_HEIGHT / 8

export const drumMap: DrumNoteMapping[] = [
    { midi: 38, name: 'Acoustic Snare', acronym: 'SN', staffLine: 2, notehead: 'normal' },
    { midi: 40, name: 'Electric Snare', acronym: 'SN', staffLine: 2, notehead: 'normal' },
    { midi: 37, name: 'Side Stick', acronym: 'SN', staffLine: 2, notehead: 'cross' },
    { midi: 42, name: 'Closed Hi-Hat', acronym: 'HH', staffLine: 6, notehead: 'cross' },
    { midi: 22, name: 'Closed Hi-Hat Edge', acronym: 'HHE', staffLine: 6, notehead: 'cross' },
    { midi: 46, name: 'Open Hi-Hat', acronym: 'OH', staffLine: 6, notehead: 'circle-cross' },
    { midi: 26, name: 'Open Hi-Hat Edge', acronym: 'OHE', staffLine: 6, notehead: 'circle-cross' },
    { midi: 44, name: 'Pedal Hi-Hat', acronym: 'PH', staffLine: -4, notehead: 'cross' },
    { midi: 36, name: 'Bass Drum 1', acronym: 'BD', staffLine: -2, notehead: 'normal' },
    { midi: 35, name: 'Acoustic Bass Drum', acronym: 'BD', staffLine: -3, notehead: 'normal' },
    { midi: 51, name: 'Ride Cymbal 1', acronym: 'RD', staffLine: 5, notehead: 'cross' },
    { midi: 59, name: 'Ride Cymbal 2', acronym: 'RD', staffLine: 5, notehead: 'cross' },
    { midi: 53, name: 'Ride Bell', acronym: 'RDB', staffLine: 5, notehead: 'triangle' },
    { midi: 57, name: 'Crash Cymbal', acronym: 'CR', staffLine: 7, notehead: 'normal', extraLine: 'middle' },
    { midi: 49, name: 'Crash Cymbal 1', acronym: 'CR', staffLine: 7, notehead: 'normal', extraLine: 'middle' },
    { midi: 55, name: 'Splash Cymbal', acronym: 'SP', staffLine: 8, notehead: 'diamond', extraLine: 'bottom' },
    { midi: 52, name: 'Chinese Cymbal', acronym: 'CH', staffLine: 8, notehead: 'circle-cross', extraLine: 'bottom' },
    
    { midi: 50, name: 'Very High Tom', acronym: 'T1', staffLine: 5, notehead: 'normal' },
    { midi: 48, name: 'High Tom', acronym: 'T1', staffLine: 3, notehead: 'normal' },
    
    { midi: 47, name: 'Mid Tom', acronym: 'T2', staffLine: 1, notehead: 'normal' },
    { midi: 45, name: 'Low Tom', acronym: 'T2', staffLine: 0, notehead: 'normal' },

    { midi: 43, name: 'Very Low Tom', acronym: 'T3', staffLine: -1, notehead: 'normal' },
    
    { midi: 41, name: 'Low Floor Tom', acronym: 'T4', staffLine: 0, notehead: 'normal' },

    // { midi: 60, name: 'Hi Bongo', acronym: 'BO', staffLine: 4, notehead: 'normal' },
    // { midi: 61, name: 'Low Bongo', acronym: 'BO', staffLine: 4, notehead: 'normal' },
    // { midi: 62, name: 'Mute Hi Conga', acronym: 'CO', staffLine: 4, notehead: 'normal' },
    // { midi: 39, name: 'Hand Clap', acronym: 'CL', staffLine: 0, notehead: 'diamond' },
    // { midi: 63, name: 'Open Hi Conga', acronym: 'CO', staffLine: 4, notehead: 'normal' },
    // { midi: 64, name: 'Low Conga', acronym: 'CO', staffLine: 4, notehead: 'normal' },
    // { midi: 65, name: 'High Timbale', acronym: 'TB', staffLine: 4, notehead: 'normal' },
    // { midi: 66, name: 'Low Timbale', acronym: 'TB', staffLine: 4, notehead: 'normal' },
    // { midi: 67, name: 'High Agogo', acronym: 'AG', staffLine: 4, notehead: 'normal' },
    // { midi: 68, name: 'Low Agogo', acronym: 'AG', staffLine: 4, notehead: 'normal' },
    // { midi: 69, name: 'Cabasa', acronym: 'CB', staffLine: 4, notehead: 'normal' },
    // { midi: 70, name: 'Maracas', acronym: 'MR', staffLine: 4, notehead: 'normal' },
    // { midi: 71, name: 'Short Whistle', acronym: 'WH', staffLine: 4, notehead: 'normal' },
    // { midi: 72, name: 'Long Whistle', acronym: 'WH', staffLine: 4, notehead: 'normal' },
    // { midi: 73, name: 'Short Guiro', acronym: 'GUI', staffLine: 4, notehead: 'normal' },
    // { midi: 74, name: 'Long Guiro', acronym: 'GUI', staffLine: 4, notehead: 'normal' },
    // { midi: 75, name: 'Claves', acronym: 'CL', staffLine: 4, notehead: 'normal' },
    // { midi: 76, name: 'Hi Wood Block', acronym: 'WB', staffLine: 4, notehead: 'normal' },
    // { midi: 77, name: 'Low Wood Block', acronym: 'WB', staffLine: 4, notehead: 'normal' },
    // { midi: 54, name: 'Tambourine', acronym: 'T', staffLine: 2, notehead: 'normal' },
    // { midi: 78, name: 'Mute Cuica', acronym: 'CU', staffLine: 4, notehead: 'normal' },
    // { midi: 79, name: 'Open Cuica', acronym: 'CU', staffLine: 4, notehead: 'normal' },
    // { midi: 56, name: 'Cowbell', acronym: 'CB', staffLine: 2, notehead: 'normal' },
    // { midi: 80, name: 'Mute Triangle', acronym: 'MT', staffLine: 4, notehead: 'normal' },
    // { midi: 81, name: 'Open Triangle', acronym: 'OT', staffLine: 4, notehead: 'normal' },
];

export const getDrumProp = <T>(midiNote: number, prop: 'midi' | 'name' | 'acronym' | 'staffLine' | 'notehead' | 'extraLine'): T => {
  const mapping = drumMap.find(d => d.midi === midiNote)
  if (!mapping) return '' as T;
  return mapping[prop] as T;
}

const STEP_NUM: any = {
  A: 5, // A and B start at 0, so C1 < A1
  B: 6,
  C: 0,
  D: 1,
  E: 2,
  F: 3,
  G: 4,
}

const CLEFS = {
  treble: {
    bottomRow: getRow(getNote('E4')),
    topRow: getRow(getNote('F5')),
  },
  bass: {
    bottomRow: getRow(getNote('G2')),
    topRow: getRow(getNote('A3')),
  },
}

// There are 52 white keys. 7 (sortof) notes per octave (technically octaves go from C-C...so its 8).
function getRow(midiNote: number, keySignature?: KEY_SIGNATURE): number {
  let key = getKey(midiNote, keySignature)
  let octave = getOctave(midiNote)
  let step = key[0]
  return octave * 7 + STEP_NUM[step]
}

function getOffset(midiNote: number, clef: Clef, keySignature?: KEY_SIGNATURE) {
  return getRowOffset(midiNote, clef, keySignature) * PIXELS_PER_ROW
}
function getRowOffset(midiNote: number, clef: Clef, keySignature?: KEY_SIGNATURE) {
  return CLEFS['bass'].topRow - getRow(midiNote, keySignature)
}

export function getDrumNoteY(
  midiNote: number,
  clef: Clef,
  staffTopY: number,
  keySignature?: KEY_SIGNATURE,
) {
  const staffLines = 5;
  const staffSpacing = 20;
  // Find mapping for this note's MIDI
  const mapping = drumMap.find(d => d.midi === midiNote);
  if (!mapping) return staffTopY + 0; // Skip unmapped notes

  // Calculate vertical position
  const y = staffTopY + (staffLines - mapping.staffLine) * staffSpacing / 2;

  return y;
}

export function drawPercussionClef(ctx: CanvasRenderingContext2D, x: number, staffTopY: number) {
  const y = staffTopY + getOffset(getNote('D3'), 'bass')
  drawSymbol(ctx, glyphs.unpitchedPercussionClef1, x, y, STAFF_FIVE_LINES_HEIGHT)
}

export function drawDrumStaffLines(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
): void {
  ctx.save()
  ctx.lineWidth = STAFF_LINE_WIDTH
  for (let i = 0; i < 5; i++, y += PIXELS_PER_ROW * 2) {
    line(ctx, x, y, width, y)
  }
  ctx.restore()
}

// export function drawDrumStaff(ctx: CanvasRenderingContext2D) {
//   // Draw 5 staff lines
//   const staffTop = 40;
//   const staffSpacing = 10;
//   for (let i = 0; i < 5; i++) {
//     ctx.beginPath();
//     ctx.moveTo(20, staffTop + i * staffSpacing);
//     ctx.lineTo(520, staffTop + i * staffSpacing);
//     ctx.stroke();
//   }
// }

// function drawDrumNote(ctx: CanvasRenderingContext2D, note: Note) {
//   const staffTop = 40;
//   const staffSpacing = 10;
//   const staffLines = 5;
//   const noteSpacing = 40;

//   // Find mapping for this note's MIDI
//   const mapping = drumMap.find(d => d.midi === note.midi);
//   if (!mapping) return; // Skip unmapped notes

//   // Calculate vertical position
//   const y = staffTop + (staffLines - mapping.staffLine) * staffSpacing / 2;

//   // Calculate horizontal position
//   const x = 60 * noteSpacing;

//   // Draw notehead
//   drawDrumNotehead(ctx, x, y, mapping.notehead);
// }

function drawDrumNotehead(ctx: CanvasRenderingContext2D, x: number, y: number, type: 'normal' | 'cross' | 'diamond') {
  ctx.save();
  ctx.beginPath();
  if (type === 'normal') {
    ctx.ellipse(x, y, 6, 4, 0, 0, 2 * Math.PI);
    ctx.fill();
  } else if (type === 'cross') {
    ctx.moveTo(x - 6, y - 6);
    ctx.lineTo(x + 6, y + 6);
    ctx.moveTo(x + 6, y - 6);
    ctx.lineTo(x - 6, y + 6);
    ctx.stroke();
  } else if (type === 'diamond') {
    ctx.moveTo(x, y - 6);
    ctx.lineTo(x + 6, y);
    ctx.lineTo(x, y + 6);
    ctx.lineTo(x - 6, y);
    ctx.closePath();
    ctx.stroke();
  }
  ctx.restore();
}

// drawSheet(ctx, notes, true);



// export function drawSheet(ctx: CanvasRenderingContext2D, notes: Note[], drumkitMode = false) {
//   if (drumkitMode) {
//     drawDrumStaff(ctx);
//     drawDrumNotes(ctx, notes);
//   } else {
//     drawPianoStaff(ctx);
//     drawPianoNotes(ctx, notes);
//   }
// }