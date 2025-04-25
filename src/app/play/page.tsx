'use client'

import { SongScrubBar } from '@/features/controls'
import { useSong } from '@/features/data'
import { useSongMetadata } from '@/features/data/library'
import midiState from '@/features/midi'
import { usePlayer } from '@/features/player'
import { getHandSettings, getSongSettings, SongVisualizer } from '@/features/SongVisualization'
import { getSynthStub } from '@/features/synth'
import {
  useEventListener,
  useOnUnmount,
  usePlayerState,
  useSingleton,
  useSongSettings,
  useWakeLock,
} from '@/hooks'
import { MidiStateEvent, SongSource } from '@/types'
import clsx from 'clsx'
import { useAtomValue } from 'jotai'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { Suspense, useEffect, useMemo, useState } from 'react'
import { SettingsPanel, TopBar } from './components'
import { MidiModal } from './components/MidiModal'
import FloatBar from './components/FloatBar'
import CountdownOverlay from './components/CountdownOverlay'
import { useRef } from 'react'

// This function exists as hack to stop the CSR deopt warning.
// To do this the "next app router" way would require boxing up the bits
// that depend on search params in a Suspense boundary.
// See https://nextjs.org/docs/messages/missing-suspense-with-csr-bailout
function PlaySongLegacy() {
  const router = useRouter()
  const player = usePlayer()
  const bpm = useAtomValue(player.getBpm())
  const searchParams = useSearchParams()
  const { source, id, recording }: { source: SongSource; id: string; recording?: string } =
    Object.fromEntries(searchParams) as any

  const [settingsOpen, setSettingsPanel] = useState(false)
  const [isMidiModalOpen, setMidiModal] = useState(false)
  const playerState = usePlayerState()
  const synth = useSingleton(() => getSynthStub('acoustic_grand_piano'))
  let { data: song } = useSong(id, source)
  let songMeta = useSongMetadata(id, source)
  const range = useAtomValue(player.getRange())
  const selectedRange = useMemo(
    () => (range ? { start: range[0], end: range[1] } : undefined),
    [range],
  )
  const isLooping = !!range

  const [countdown, setCountdown] = useState(0)
const countdownTimeout = useRef<NodeJS.Timeout | null>(null)

  const [songConfig, setSongConfig] = useSongSettings(id)
  const isRecording = !!recording
  useWakeLock()

  const hand =
    songConfig.left && songConfig.right
      ? 'both'
      : songConfig.left
        ? 'left'
        : songConfig.right
          ? 'right'
          : 'none'

  // Hack for updating player when config changes.
  // Maybe move to the onChange? Or is this chill.
  const { waiting, left, right } = songConfig
  useEffect(() => {
    player.setWait(waiting)
    if (left && right) {
      player.setHand('both')
    } else {
      player.setHand(left ? 'left' : 'right')
    }
  }, [waiting, left, right, player])

  useOnUnmount(() => player.stop())

  useEffect(() => {
    if (!song) return
    // TODO: handle invalid song. Pipe up not-found midi for 400s etc.
    const config = getSongSettings(id, song)
    setSongConfig(config)
    player.setSong(song, config)
  }, [song, setSongConfig, id, player])

  useEventListener<KeyboardEvent>('keydown', (evt: KeyboardEvent) => {
    if (evt.code === 'Space') {
      evt.preventDefault()
      player.toggle()
    } else if (evt.code === 'Comma') {
      player.seek(player.currentSongTime - 16 / 1000)
    } else if (evt.code === 'Period') {
      player.seek(player.currentSongTime + 16 / 1000)
    }
  })

  useEffect(() => {
    const handleMidiEvent = ({ type, note, velocity }: MidiStateEvent) => {
      if (type === 'down') {
        synth.playNote(note, velocity)
      } else {
        synth.stopNote(note, velocity)
      }
    }

    midiState.subscribe(handleMidiEvent)
    return function cleanup() {
      midiState.unsubscribe(handleMidiEvent)
    }
  }, [synth, song, songConfig])

  useEffect(() => {
    return () => {
      if (countdownTimeout.current) clearTimeout(countdownTimeout.current)
    }
  }, [])

  // If source or id is messed up, redirect to the homepage
  if (!source || !id) {
    router.replace('/')
  }

  const handleLoopingToggle = (enable: boolean) => {
    if (!enable) {
      player.setRange(undefined)
      return
    } else {
      const duration = player.getDuration()
      const tenth = duration / 10
      player.setRange({
        start: duration / 2 - tenth,
        end: duration / 2 + tenth,
      })
    }
  }

  function playBeep() {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();
  
    oscillator.type = 'sine';
    oscillator.frequency.value = 880; // You can adjust frequency for different beep sounds
    gain.gain.value = 0.2; // Volume
  
    oscillator.connect(gain);
    gain.connect(ctx.destination);
  
    oscillator.start();
    oscillator.stop(ctx.currentTime + 0.1); // 100ms beep
  
    oscillator.onended = () => ctx.close();
  }

  function handlePlayWithCountdown() {
    const interval = 60000 / bpm;
    const countdownBeats = 4;
    let current = countdownBeats;
  
    if (!playerState.playing) {
      setCountdown(current);
      playBeep();
  
      const tick = () => {
        current -= 1;
        if (current > 0) {
          setCountdown(current);
          playBeep();
          countdownTimeout.current = setTimeout(tick, interval);
        } else {
          setCountdown(0);
          // Wait one more beat before starting the song
          countdownTimeout.current = setTimeout(() => {
            player.toggle();
          }, interval);
        }
      };
  
      countdownTimeout.current = setTimeout(tick, interval);
    } else {
      player.toggle();
    }
  }

  const handlePlayWithCountdownOld = () => {
    if (!playerState.playing) {
      setCountdown(3)
      let current = 3
      playBeep()
      const tick = () => {
        playBeep()
        current -= 1
        if (current > 0) {
          setCountdown(current)
          countdownTimeout.current = setTimeout(tick, 1000)
        } else {
          setCountdown(0)
          player.toggle() // Start the song after countdown
        }
      }
      countdownTimeout.current = setTimeout(tick, 1000)
    } else {
      player.toggle()
    }
  }

  return (
    <>
      <div
        className={clsx(
          // Enable fixed to remove all scrolling.
          'fixed',
          'flex h-screen max-h-screen max-w-screen flex-col',
        )}
      >
        {!isRecording && (
          <>
            <CountdownOverlay count={countdown} />
            <TopBar
              title={songMeta?.title}
              isLoading={!playerState.canPlay}
              isPlaying={playerState.playing}
              onTogglePlaying={handlePlayWithCountdown}
              onClickRestart={() => player.stop()}
              onClickBack={() => {
                player.stop()
                router.push('/')
              }}
              onClickMidi={(e) => {
                e.stopPropagation()
                setMidiModal(!isMidiModalOpen)
              }}
              onClickSettings={(e) => {
                e.stopPropagation()
                setSettingsPanel(!settingsOpen)
              }}
              settingsOpen={settingsOpen}
            />
            <MidiModal isOpen={isMidiModalOpen} onClose={() => setMidiModal(false)} />
            {settingsOpen && (
              <SettingsPanel
                onClose={() => setSettingsPanel(false)}
                onChange={setSongConfig}
                config={songConfig}
                song={song}
                onLoopToggled={handleLoopingToggle}
                isLooping={isLooping}
              />
            )}
            <div className="relative min-w-full">
              <SongScrubBar
                rangeSelection={selectedRange}
                setRange={(range: any) => player.setRange(range)}
                height={40}
              />
            </div>
          </>
        )}
        <div
          className={clsx(
            'fixed -z-10 h-[100vh] w-screen',
            'h-[100dvh]!',
            songConfig.visualization === 'falling-notes' ? 'bg-[#2e2e2e]' : 'bg-white',
          )}
        >
          <SongVisualizer
            song={song}
            config={songConfig}
            hand={hand}
            handSettings={getHandSettings(songConfig)}
            selectedRange={selectedRange}
            getTime={() => player.getTime()}
            enableTouchscroll={songConfig.visualization !== 'falling-notes'}
          />
        </div>
        {!isRecording && <FloatBar />}
      </div>
    </>
  )
}

export default function PlayPage() {
  return (
    <Suspense>
      <PlaySongLegacy />
    </Suspense>
  )
}
