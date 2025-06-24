"use client"

import { useState, useRef, useEffect } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Sky, Environment, Text } from "@react-three/drei"
import { Suspense } from "react"
import { CityGrid } from "./city-grid"
import { BuildControls } from "./build-controls"
import { ProgressBar } from "./progress-bar"
import { Timer } from "./timer"
import { DayNightSwitch } from "./day-night-switch"

export type BuildItem = {
  type: "tree" | "solar-panel" | "remove-chimney" | "turn-off-lights"
  position: [number, number, number]
  rotation: [number, number, number]
  id: string
  targetId?: string // For items that target specific objects like solar panels on roofs or removing chimneys
}

export type ItemType = "tree" | "solar-panel" | "remove-chimney" | "turn-off-lights"

const ITEM_SCORES = {
  tree: 5, // +5% oxygen
  "solar-panel": 7, // +7% clean energy
  "remove-chimney": 12, // -12% CO2
  "turn-off-lights": 4, // +4% energy saving
}

// Temps de jeu à 2 minutes (120 secondes)
const GAME_DURATION = 120 // 2 minutes in seconds
const TARGET_SCORE = 100

export function CityBuilder() {
  const [selectedItem, setSelectedItem] = useState<ItemType | null>(null)
  const [placedItems, setPlacedItems] = useState<BuildItem[]>([])
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION)
  const [gameStarted, setGameStarted] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [gameWon, setGameWon] = useState(false)
  const [isNightMode, setIsNightMode] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const handleItemSelect = (itemType: ItemType) => {
    setSelectedItem(itemType)
  }

  const handlePlaceItem = (
    position: [number, number, number],
    rotation: [number, number, number],
    targetId?: string,
  ) => {
    if (!selectedItem || !gameStarted || gameOver) return

    const newItem: BuildItem = {
      type: selectedItem,
      position,
      rotation,
      id: `${selectedItem}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      targetId,
    }

    setPlacedItems((prev) => [...prev, newItem])
    setScore((prev) => Math.min(prev + ITEM_SCORES[selectedItem], TARGET_SCORE))
    setSelectedItem(null)
  }

  const toggleDayNight = () => {
    setIsNightMode((prev) => !prev)
  }

  const startGame = () => {
    setGameStarted(true)
    setGameOver(false)
    setGameWon(false)
    setScore(0)
    setTimeLeft(GAME_DURATION)
    setPlacedItems([])
  }

  const resetGame = () => {
    setGameStarted(false)
    setGameOver(false)
    setGameWon(false)
    setScore(0)
    setTimeLeft(GAME_DURATION)
    setPlacedItems([])
    setSelectedItem(null)
    setIsNightMode(false)
  }

  useEffect(() => {
    if (gameStarted && !gameOver) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current as NodeJS.Timeout)
            setGameOver(true)
            setGameWon(score >= TARGET_SCORE)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [gameStarted, gameOver, score])

  useEffect(() => {
    if (score >= TARGET_SCORE && gameStarted && !gameOver) {
      setGameOver(true)
      setGameWon(true)
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [score, gameStarted, gameOver])

  return (
    <div className="w-full h-[700px] relative bg-gray-100 rounded-lg overflow-hidden shadow-lg">
      <Canvas shadows camera={{ position: [20, 20, 20], fov: 50 }}>
        <Suspense fallback={null}>
          <Sky sunPosition={isNightMode ? [0, -10, 0] : [10, 10, 0]} />
          <ambientLight intensity={isNightMode ? 0.1 : 0.5} />
          <directionalLight
            castShadow
            position={isNightMode ? [0, -10, 0] : [10, 10, 0]}
            intensity={isNightMode ? 0.2 : 1.5}
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
            shadow-camera-far={50}
            shadow-camera-left={-20}
            shadow-camera-right={20}
            shadow-camera-top={20}
            shadow-camera-bottom={-20}
          />
          <Environment preset={isNightMode ? "night" : "city"} />

          <CityGrid
            placedItems={placedItems}
            selectedItem={selectedItem}
            onPlaceItem={handlePlaceItem}
            gameStarted={gameStarted}
            isNight={isNightMode}
          />

          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minPolarAngle={Math.PI / 6}
            maxPolarAngle={Math.PI / 2.5}
            minDistance={10}
            maxDistance={40}
          />

          {gameOver && (
            <Text
              position={[0, 10, 0]}
              fontSize={2}
              color={gameWon ? "#22c55e" : "#ef4444"}
              anchorX="center"
              anchorY="middle"
            >
              {gameWon ? "Ville verte construite !" : "Temps écoulé !"}
            </Text>
          )}
        </Suspense>
      </Canvas>

      <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
        <div className="flex flex-col space-y-2">
          <ProgressBar score={score} targetScore={TARGET_SCORE} />
          <DayNightSwitch isNight={isNightMode} onToggle={toggleDayNight} disabled={!gameStarted || gameOver} />
        </div>
        <Timer timeLeft={timeLeft} />
      </div>

      <BuildControls
        selectedItem={selectedItem}
        onItemSelect={handleItemSelect}
        gameStarted={gameStarted}
        gameOver={gameOver}
        onStartGame={startGame}
        onResetGame={resetGame}
        isNightMode={isNightMode}
      />
    </div>
  )
}
