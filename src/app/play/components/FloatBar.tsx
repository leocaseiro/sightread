import ScoreDisplay from './ScoreDisplay'

export default function FloatBar() {
  return (
    // <div className="fixed bottom-0 left-0 w-full gap-8 bg-[#292929] bg-opacity-80 z-50 py-2 flex justify-center">
    <div className="fixed right-0 bg-[#292929] bg-opacity-80 z-50 py-2 flex justify-center top-[100px]">
      <ScoreDisplay />
    </div>
  )
}