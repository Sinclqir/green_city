"use client"

import { Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"

type DayNightSwitchProps = {
  isNight: boolean
  onToggle: () => void
  disabled?: boolean
}

export function DayNightSwitch({ isNight, onToggle, disabled = false }: DayNightSwitchProps) {
  return (
    <Button
      onClick={onToggle}
      disabled={disabled}
      className={`flex items-center space-x-2 w-64 ${
        isNight ? "bg-indigo-900 hover:bg-indigo-800 text-white" : "bg-blue-400 hover:bg-blue-500 text-white"
      }`}
    >
      {!isNight ? (
        <>
          <Moon className="h-5 w-5" />
          <span>Mode nuit</span>
        </>
      ) : (
        <>
          <Sun className="h-5 w-5" />
          <span>Mode jour</span>
        </>
      )}
    </Button>
  )
}
