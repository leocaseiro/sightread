import { InstrumentName } from '@/features/synth'
import type { NoteCustomization } from '@/features/customization/types'
import { KEY_SIGNATURE, NOTE_LABELS } from './features/theory'

export type DifficultyLabel =
  | 'Easiest'
  | 'Easier'
  | 'Easy'
  | 'Medium'
  | 'Hard'
  | 'Hardest'
  // "-" stands for Unknown
  | '-'

export type SongSource = 'local' | 'builtin' | 'generated' | 'base64'
export type SongMetadata = {
  id: string
  file: string
  title: string
  difficulty: number
  duration: number
  source: SongSource
  url?: string
  license?: string
  handle?: FileSystemFileHandle
  lastModified?: number
  fileSize?: number
}

export interface Size {
  width: number
  height: number
}

export interface Pitch {
  step: string
  octave: number
  alter: number
}

export interface SongNote {
  type: 'note'
  midiNote: number
  track: number
  time: number
  duration: number
  velocity?: number
  measure: number
}

export interface Bpm {
  time: number
  bpm: number
}

export interface Tracks {
  [id: string]: Track
}

export interface Track {
  instrument?: string
  name?: string
  program?: number
}

export type SongMeasure = {
  type: 'measure'
  time: number
  duration: number
  number: number
}

export type Song = {
  tracks: Tracks
  duration: number
  measures: Array<SongMeasure>
  notes: Array<SongNote>
  bpms: Array<Bpm>
  timeSignature?: { numerator: number; denominator: number }
  timeSignatures?: Array<{ time: number; numerator: number; denominator: number }>
  keySignature?: KEY_SIGNATURE
  items: Array<SongNote | SongMeasure>
  ppq: number
  secondsToTicks: (seconds: number) => number
  ticksToSeconds: (seconds: number) => number
}

export type Clef = 'bass' | 'treble'
export type VisualizationMode = 'falling-notes' | 'sheet'
export type Hand = 'both' | 'left' | 'right' | 'none'
export type SongConfig = {
  left: boolean
  right: boolean
  waiting: boolean
  countdownSeconds: number
  transpose: number
  loop: {
    enabled: boolean
    range: { start: number; end: number }
  }
  metronome: {
    enabled: boolean
    volume: number
    speed: number
    emphasizeFirst: boolean
  }
  visualization: VisualizationMode
  noteLabels: NOTE_LABELS
  coloredNotes: boolean
  skipMissedNotes: boolean
  keySignature?: KEY_SIGNATURE
  /**
   * Per-MIDI note customization (overrides built-in preset if present).
   */
  noteCustomizations?: Record<number, NoteCustomization>
  /**
   * Which built-in (or user) preset to use. 'none' disables preset application.
   */
  customizationPreset?: string
  /**
   * When true, sheet hero uses NoteCustomization.order to compute Y placement relative to staff top.
   */
  noteCustomizationUseRowOffset?: boolean
  /**
   * Sheet staff visibility: 'grand' (both), 'treble' (only G-clef staff), or 'bass' (only F-clef staff).
   */
  sheetStaffs?: 'grand' | 'treble' | 'bass'
  /**
   * Optional visible line ranges (1..5 inclusive) per staff. If omitted, draws all 5 lines.
   * Example: { treble: [1,2] } // show only top two lines on treble staff
   */
  sheetVisibleLines?: {
    treble?: [number, number]
    bass?: [number, number]
  }
  /**
   * Control rendering of accidentals next to notes on the staff.
   * Default: true
   */
  sheetShowNoteAccidentals?: boolean
  /**
   * Control rendering of the key signature symbols (sharps/flats) at the start.
   * Default: true
   */
  sheetShowKeySignature?: boolean
  tracks: {
    [trackId: number]: TrackSetting
  }
}

export type TrackSetting = {
  track: Track
  hand: 'left' | 'right' | 'none'
  sound: boolean
  instrument: InstrumentName
}

export type MidiStateEvent = {
  type: 'down' | 'up'
  note: number
  time: number
  velocity?: number
}

export type HandSettings = {
  [trackId: string]: {
    hand: Hand | 'none'
  }
}
