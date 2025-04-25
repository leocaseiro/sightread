import { usePlayer } from '@/features/player'
import { useAtomValue } from 'jotai'

export default function ScoreDisplay() {
    const player = usePlayer()
    const perfect = useAtomValue(player.score.perfect)
    const good = useAtomValue(player.score.good)
    const miss = useAtomValue(player.score.miss)
    const pointless = useAtomValue(player.score.pointless)
    const durationHeld = useAtomValue(player.score.durationHeld)
    const streak = useAtomValue(player.score.streak)
    const combined = useAtomValue(player.score.combined)
    const accuracy = useAtomValue(player.score.accuracy)

    return (
        <div className="mx-auto flex gap-4 fill-white text-white mr-5 ml-5">
            <div className="flex flex-col items-center mr-10">
                <span className="font-bold text-xs">Accuracy</span>
                <span>{accuracy}</span>
            </div>
            <div className="flex flex-col items-center">
                <span className="font-bold text-xs">Perfect</span>
                <span>{perfect}</span>
            </div>
            <div className="flex flex-col items-center">
                <span className="font-bold text-xs">Good</span>
                <span>{good}</span>
            </div>
            <div className="flex flex-col items-center">
                <span className="font-bold text-xs">Miss</span>
                <span>{miss}</span>
            </div>
            <div className="flex flex-col items-center">
                <span className="font-bold text-xs">Pointless</span>
                <span>{pointless}</span>
            </div>
            <div className="flex flex-col items-center">
                <span className="font-bold text-xs">Held</span>
                <span>{durationHeld}</span>
            </div>
            <div className="flex flex-col items-center">
                <span className="font-bold text-xs">Streak</span>
                <span>{streak}</span>
            </div>
            <div className="flex flex-col items-center ml-10">
                <span className="font-bold text-xs">Score</span>
                <span className="text-xl">{combined}</span>
            </div>
        </div>
    )
}