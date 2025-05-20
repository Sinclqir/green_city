"use client"

type TimerProps = {
  timeLeft: number
}

export function Timer({ timeLeft }: TimerProps) {
  // Format seconds to MM:SS
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  // Determine color based on time left
  const getColorClass = () => {
    if (timeLeft > 60) return "text-green-500"
    if (timeLeft > 30) return "text-yellow-500"
    return "text-red-500"
  }

  return (
    <div className="bg-white p-2 rounded-lg shadow-md">
      <div className="flex items-center">
        <svg
          className="h-5 w-5 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span className={`text-lg font-bold ${getColorClass()}`}>{formatTime(timeLeft)}</span>
      </div>
    </div>
  )
}
