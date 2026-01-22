export type NoteShape = 'notehead' | 'cross' | 'diamond' | 'circle' | 'triangle'

export type NoteCustomization = {
  enabled?: boolean
  /**
   * Row offset from staff top in units of PIXELS_PER_ROW when row override mode is enabled.
   * If omitted, default pitch-based placement is used.
   */
  order?: number
  shape?: NoteShape
  /**
   * Override label to render near the note (e.g., "BD" for Bass Drum).
   */
  label?: string
  /**
   * CSS color (e.g., "#f08a5b" or "rgb(255,0,0)") for head/tail.
   */
  color?: string
}

export type NoteCustomizationPreset = {
  id: string
  name: string
  notes: Record<number, NoteCustomization>
}
