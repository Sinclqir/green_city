"use client"

import type { ItemType } from "./city-builder"
import { Button } from "@/components/ui/button"
import { Leaf, Sun, X, LightbulbOff } from "lucide-react"

type BuildControlsProps = {
  selectedItem: ItemType | null
  onItemSelect: (itemType: ItemType) => void
  gameStarted: boolean
  gameOver: boolean
  onStartGame: () => void
  onResetGame: () => void
  isNightMode: boolean
}

export function BuildControls({
  selectedItem,
  onItemSelect,
  gameStarted,
  gameOver,
  onStartGame,
  onResetGame,
  isNightMode,
}: BuildControlsProps) {
  return (
    <div className="absolute bottom-4 left-4 right-4 bg-white p-4 rounded-lg shadow-lg">
      {!gameStarted ? (
        <div className="text-center">
          <h3 className="text-xl font-bold mb-4">Construis ta ville verte</h3>
          <p className="mb-4 text-gray-600">
            Transforme cette ville polluée en un espace écologique en ajoutant des éléments verts.
          </p>
          <Button onClick={onStartGame} className="bg-green-500 hover:bg-green-600 text-white px-8 py-2">
            Commencer
          </Button>
        </div>
      ) : gameOver ? (
        <div className="text-center">
          <Button onClick={onResetGame} className="bg-green-500 hover:bg-green-600 text-white px-8 py-2">
            Rejouer
          </Button>
        </div>
      ) : (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Éléments écologiques</h3>
            <div className="text-sm text-gray-500">
              Sélectionnez un élément puis cliquez sur la grille pour le placer
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <Button
              onClick={() => onItemSelect("tree")}
              className={`flex flex-col items-center justify-center p-2 h-auto ${selectedItem === "tree" ? "bg-green-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
            >
              <Leaf className="h-6 w-6 mb-1" />
              <span className="text-xs">Arbre</span>
              <span className="text-xs text-green-700 font-semibold">+5% O₂</span>
            </Button>
            <Button
              onClick={() => onItemSelect("solar-panel")}
              className={`flex flex-col items-center justify-center p-2 h-auto ${selectedItem === "solar-panel" ? "bg-green-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
            >
              <Sun className="h-6 w-6 mb-1" />
              <span className="text-xs">Panneau solaire</span>
              <span className="text-xs text-green-700 font-semibold">+7% énergie</span>
            </Button>
            <Button
              onClick={() => onItemSelect("remove-chimney")}
              className={`flex flex-col items-center justify-center p-2 h-auto ${selectedItem === "remove-chimney" ? "bg-green-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
            >
              <X className="h-6 w-6 mb-1" />
              <span className="text-xs">Retirer cheminée</span>
              <span className="text-xs text-green-700 font-semibold">-12% CO₂</span>
            </Button>
            <Button
              onClick={() => onItemSelect("turn-off-lights")}
              disabled={!isNightMode}
              className={`flex flex-col items-center justify-center p-2 h-auto ${
                selectedItem === "turn-off-lights"
                  ? "bg-green-500 text-white"
                  : !isNightMode
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <LightbulbOff className="h-6 w-6 mb-1" />
              <span className="text-xs">Éteindre lumières</span>
              <span className="text-xs text-green-700 font-semibold">+4% économie</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
