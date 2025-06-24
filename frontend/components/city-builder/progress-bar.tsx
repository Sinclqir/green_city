"use client"

type ProgressBarProps = {
  score: number
  targetScore: number
}

export function ProgressBar({ score, targetScore }: ProgressBarProps) {
  const percentage = (score / targetScore) * 100

  return (
    <div className="bg-white p-2 rounded-lg shadow-md w-64">
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-medium">Score vert</span>
        <span className="text-sm font-medium">
          {score}/{targetScore}
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className="bg-green-500 h-2.5 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  )
}
