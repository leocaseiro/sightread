import { NoteCustomization, NoteCustomizationPreset } from './types'

export const drumsPreset: NoteCustomizationPreset = {
  id: 'drums',
  name: 'Drums',
  notes: {
    // Attack Cymbals
    52: { enabled: true, label: 'Chi', shape: 'cross', color: '#d97706', order: -3 }, // China (darker amber)
    49: { enabled: true, label: 'CR', shape: 'cross', color: '#f59e0b', order: -2 }, // Crash 1 (darker yellow)
    55: { enabled: true, label: 'Spl', shape: 'cross', color: 'orange', order: -2 }, // Splash
    57: { enabled: true, label: 'Cr2', shape: 'cross', color: '#f59e0b', order: -1 }, // Crash 2 (darker yellow)

    // Hi-Hats
    42: { enabled: true, label: 'HH', shape: 'cross', color: '#22d3ee', order: -1 }, // Closed Hi-Hat
    22: { enabled: true, label: 'HHe', shape: 'cross', color: '#22d3ee', order: -1 }, // Closed Hi-Hat Edge
    46: { enabled: true, label: 'OH', shape: 'notehead', color: '#06b6d4', order: -1 }, // Open Hi-Hat
    26: { enabled: true, label: 'OHe', shape: 'notehead', color: '#06b6d4', order: -1 }, // Open Hi-Hat Edge
    92: { enabled: true, label: 'h-hh', shape: 'notehead', color: '#06b6d4', order: -1 }, // Half Open Hi-Hat

    // Ride
    51: { enabled: true, label: 'RD', shape: 'cross', color: '#d97706', order: 0 }, // Ride (darker amber)
    53: { enabled: true, label: 'RdB', shape: 'diamond', color: '#d97706', order: 0 }, // Ride Bell (darker amber)
    59: { enabled: true, label: 'RdE', shape: 'cross', color: '#d97706', order: 0 }, // Ride Edge (darker amber)
    93: { enabled: true, label: 'RdE', shape: 'cross', color: '#d97706', order: 0 }, // Ride Edge (darker amber)

    // Cowbell
    102: { enabled: true, label: 'Cow', shape: 'triangle', color: 'green', order: -1 }, // Cowbell
    56: { enabled: true, label: 'Cow', shape: 'triangle', color: 'green', order: 0 }, // Cowbell
    99: { enabled: true, label: 'Cow', shape: 'triangle', color: 'green', order: 1 }, // Cowbell

    // Toms
    50: { enabled: true, label: 'T1', shape: 'notehead', color: '#f59e0b', order: 2 }, // Very High Tom
    48: { enabled: true, label: 'T1', shape: 'notehead', color: '#f59e0b', order: 1 }, // High Tom
    45: { enabled: true, label: 'T2', shape: 'notehead', color: '#fb923c', order: 4 }, // Middle Tom
    47: { enabled: true, label: 'T3', shape: 'notehead', color: '#f97316', order: 5 }, // Floor Mid Tom
    43: { enabled: true, label: 'T4', shape: 'notehead', color: '#fb923c', order: 6 }, // Floor Low Tom

    // Snare family (mid staff)
    38: { enabled: true, label: 'SD', shape: 'notehead', color: '#f87171', order: 3 }, // Snare
    37: { enabled: true, label: 'SS', shape: 'cross', color: '#ef4444', order: 3 }, // Side Stick
    91: { enabled: true, label: 'SR', shape: 'diamond', color: '#ef4444', order: 3 }, // Side Rimshot
    39: { enabled: true, label: 'Clp', shape: 'notehead', color: '#f472b6', order: 3 }, // Clapping Hand

    // Kick (bottom)
    36: { enabled: true, label: 'BD', shape: 'notehead', color: '#8b5cf6', order: 7 }, // Bass Drum
    35: { enabled: true, label: 'BD', shape: 'notehead', color: '#8b5cf6', order: 8 }, // Bass Drum

    // Pedal Hi-Hat
    44: { enabled: true, label: 'Pdl', shape: 'cross', color: '#06b6d4', order: 9 }, // Pedal Hi-Hat
  } satisfies Record<number, NoteCustomization>,
}

export const guitarPreset: NoteCustomizationPreset = {
  id: 'guitar',
  name: 'Guitar',
  notes: {
    // Open strings: E2, A2, D3, G3, B3, E4
    40: { enabled: true, label: '6', shape: 'notehead', color: '#a3e635' }, // Low E
    45: { enabled: true, label: '5', shape: 'notehead', color: '#84cc16' }, // A
    50: { enabled: true, label: '4', shape: 'notehead', color: '#22c55e' }, // D
    55: { enabled: true, label: '3', shape: 'notehead', color: '#10b981' }, // G
    59: { enabled: true, label: '2', shape: 'notehead', color: '#06b6d4' }, // B
    64: { enabled: true, label: '1', shape: 'notehead', color: '#3b82f6' }, // High E
  } satisfies Record<number, NoteCustomization>,
}

export const builtInPresets: Record<string, NoteCustomizationPreset> = {
  [drumsPreset.id]: drumsPreset,
  [guitarPreset.id]: guitarPreset,
}
