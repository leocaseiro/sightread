import React, { PropsWithChildren, useCallback, useRef, useState } from 'react'
import { Toggle } from '@/components'
import { Instrument, Song, SongConfig, VisualizationMode } from '@/types'
import { AdjustInstruments } from '@/features/controls'
import { getKeySignatures, KEY_SIGNATURE } from '@/features/theory'
import { useEventListener, useWhenClickedOutside } from '@/hooks'
import clsx from 'clsx'
import BpmDisplay from './BpmDisplay'

type SidebarProps = {
  onChange: (settings: SongConfig) => void
  config: SongConfig
  song?: Song
  onClose?: () => void
  isLooping: boolean
  onLoopToggled: (b: boolean) => void
}

export default function SettingsPanel(props: SidebarProps) {
  // debugger;
  const { left, right, visualization, waiting, noteLetter, coloredNotes, keySignature, instrument } = props.config
  const { onClose, onLoopToggled, isLooping } = props
  const [showTrackConfig, setShowTrackConfig] = useState(false)

  const sidebarRef = useRef<HTMLDivElement>(null)

  const clickedOutsideHandler = useCallback(() => onClose?.(), [onClose])
  useWhenClickedOutside(clickedOutsideHandler, sidebarRef)
  useEventListener<KeyboardEvent>('keydown', (e) => {
    if (e.key === 'Escape') {
      onClose?.()
    }
  })

  const handleHand = (selected: 'left' | 'right') => {
    if (selected === 'left') {
      props.onChange({ ...props.config, left: !props.config.left })
    }
    if (selected === 'right') {
      props.onChange({ ...props.config, right: !props.config.right })
    }
  }

  const handleVisualization = (visualization: VisualizationMode) => {
    const configInstrument: Instrument = visualization === "falling-notes" ? 'piano' : props.config.instrument;
    props.onChange({ ...props.config, visualization, instrument: configInstrument });
  }
  const handleInstrument = (instrument: Instrument) => {
    const configVisualization: VisualizationMode = instrument === 'drums' ? "sheet" :  props.config.visualization;
    props.onChange({ ...props.config, visualization: configVisualization, instrument });
  }
  function handleWaiting(waiting: boolean) {
    props.onChange({ ...props.config, waiting })
  }
  function handleNotes() {
    props.onChange({ ...props.config, noteLetter: !noteLetter })
  }
  function handleColoredNotes() {
    props.onChange({ ...props.config, coloredNotes: !coloredNotes })
  }
  function handleKeySignature(keySignature: KEY_SIGNATURE) {
    props.onChange({ ...props.config, keySignature })
  }

  return (
    <div
      className="flex flex-col sm:flex-row relative w-full bg-gray-100 p-4 gap-4 overflow-auto max-h-[calc(100vh-300px)]"
      ref={sidebarRef}
    >
      <h3 className="text-2xl text-purple-primary text-center">Settings</h3>
      <div className="flex flex-col items-center sm:items-stretch sm:flex-row gap-4 whitespace-nowrap flex-wrap flex-grow">
        <Section title="Speed" className="flex flex-grow">
          <BpmDisplay />
        </Section>
        <Section title="Hands" className="flex flex-col flex-grow">
          <div className="flex gap-2 justify-center">
            <span className="w-10">Left</span>
            <Toggle className="self-center" checked={left} onChange={() => handleHand('left')} />
          </div>
          <div className="flex gap-2 justify-center">
            <span className="w-10">Right</span>
            <Toggle checked={right} onChange={() => handleHand('right')} />
          </div>
        </Section>
        <div className="flex flex-col gap-4 justify-between flex-grow">
          <Section title="Visualization" className="flex-grow">
            <label
              className="flex gap-1 items-center justify-center"
            >
              <input
                type="radio"
                className="w-5"
                checked={visualization === 'falling-notes'}
                onClick={() => handleVisualization('falling-notes')}
              />
              <span className="block w-[120px] text-left">Falling notes</span>
            </label>
            <label
              className="flex gap-1 items-center justify-center"
            >
              <input onClick={() => handleVisualization('sheet')} className="w-5" type="radio" checked={visualization === 'sheet'} />
              <span className="block w-[120px] text-left"> Sheet hero (beta)</span>
            </label>
          </Section>
          <Section title="Instrument" className="flex-grow">
              <label
                className="flex gap-1 items-center justify-center"
              >
                <input
                  type="radio"
                  className="w-5"
                  checked={instrument === 'drums'}
                  onClick={() => handleInstrument('drums')}
                />
                <span className="block w-[120px] text-left">drums</span>
              </label>
              <label
                className="flex gap-1 items-center justify-center"
              >
                <input
                  type="radio"
                  className="w-5"
                  checked={instrument === 'piano'}
                  onClick={() => handleInstrument('piano')}
                />
                <span className="block w-[120px] text-left">piano</span>
              </label>
          </Section>
        </div>
        <div className="flex gap-4 flex-grow flex-col sm:flex-row">
          <Section title="Additional settings" className="flex-grow justify-center">
            <div className="flex justify-center">
              <span className="min-w-[15ch]">Wait mode</span>
              <Toggle className="" checked={waiting} onChange={handleWaiting} />
            </div>
            <div className="flex justify-center">
              <span className="min-w-[15ch]">Display note letter</span>
              <Toggle checked={noteLetter} onChange={handleNotes} />
            </div>
            <div className="flex justify-center">
              <span className="min-w-[15ch]">Colored notes</span>
              <Toggle checked={coloredNotes} onChange={handleColoredNotes} />
            </div>
            <div className="flex justify-center">
              <span className="min-w-[15ch]">Key signature</span>
              <select
                name="keySignature"
                className="border w-[50px]"
                value={keySignature ?? props.song?.keySignature}
                onChange={(e) => handleKeySignature(e.target.value as KEY_SIGNATURE)}
              >
                {getKeySignatures().map((keySig) => {
                  return <option key={`id-${keySig}`}>{keySig}</option>
                })}
              </select>
            </div>
          </Section>
          <div className="flex flex-col gap-4 justify-between flex-grow">
            <Section title="Practice loop">
              <div className="flex justify-center">
                <Toggle checked={isLooping} onChange={onLoopToggled} />
              </div>
            </Section>
            <Section
              title="Track configuration"
              onClick={() => setShowTrackConfig((b) => !b)}
              className="cursor-pointer hover:bg-purple-light"
            ></Section>
          </div>
        </div>
        {showTrackConfig && (
          <div className="flex basis-full flex-wrap justify-center max-w-[70vw]">
            <AdjustInstruments
              config={props.config}
              setTracks={(tracks) => {
                props.onChange({ ...props.config, tracks })
              }}
              song={props.song}
            />
          </div>
        )}
      </div>
    </div>
  )
}

type SectionProps = PropsWithChildren<{ title: string; className?: string; onClick?: any }>
function Section({ children, title, className, onClick }: SectionProps) {
  return (
    <article
      className={clsx(
        className,
        'bg-gray-200 p-4 rounded-md flex flex-col gap-4 max-w-[70vw] min-w-[70vw] sm:min-w-0',
      )}
      onClick={onClick}
    >
      <h3 className="font-semibold text-base text-center">{title}</h3>
      {children}
    </article>
  )
}
