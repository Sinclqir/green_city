"use client"

import { useRef, useState, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import type { BuildItem, ItemType } from "./city-builder"
import { Tree } from "./items/tree"
import { SolarPanel } from "./items/solar-panel"
import { Building } from "./items/building"
import { Road } from "./items/road"
import { Car } from "./items/car"
import { Factory } from "./items/factory"
import type * as THREE from "three"

type CityGridProps = {
  placedItems: BuildItem[]
  selectedItem: ItemType | null
  onPlaceItem: (position: [number, number, number], rotation: [number, number, number], targetId?: string) => void
  gameStarted: boolean
  isNight: boolean
}

// Define the grid size
const GRID_SIZE = 12
const CELL_SIZE = 2

export function CityGrid({ placedItems, selectedItem, onPlaceItem, gameStarted, isNight }: CityGridProps) {
  const gridRef = useRef<THREE.Group>(null)
  const [hoveredCell, setHoveredCell] = useState<[number, number] | null>(null)
  const [hoveredBuildingId, setHoveredBuildingId] = useState<string | null>(null)
  const [hoveredChimneyId, setHoveredChimneyId] = useState<string | null>(null)

  // Create a grid of cells
  const grid = []
  for (let x = -GRID_SIZE / 2; x < GRID_SIZE / 2; x++) {
    for (let z = -GRID_SIZE / 2; z < GRID_SIZE / 2; z++) {
      grid.push([x * CELL_SIZE, 0, z * CELL_SIZE])
    }
  }

  // Initial city layout (buildings, roads, factories)
  const initialCity = useMemo(
    () => [
      // Buildings
      { type: "building", position: [-10, 0, -10], scale: [1, 1.5, 1], id: "building-1" },
      { type: "building", position: [-10, 0, -6], scale: [1, 2, 1], id: "building-2" },
      { type: "building", position: [-10, 0, -2], scale: [1, 1, 1], id: "building-3" },
      { type: "building", position: [-10, 0, 2], scale: [1, 1.8, 1], id: "building-4" },
      { type: "building", position: [-6, 0, -10], scale: [1, 1.2, 1], id: "building-5" },
      { type: "building", position: [-2, 0, -10], scale: [1, 1.7, 1], id: "building-6" },
      { type: "building", position: [2, 0, -10], scale: [1, 1.3, 1], id: "building-7" },
      { type: "building", position: [6, 0, -10], scale: [1, 1.5, 1], id: "building-8" },
      { type: "building", position: [10, 0, -10], scale: [1, 2.2, 1], id: "building-9" },
      { type: "building", position: [10, 0, -6], scale: [1, 1.6, 1], id: "building-10" },
      { type: "building", position: [10, 0, -2], scale: [1, 1.4, 1], id: "building-11" },
      { type: "building", position: [10, 0, 2], scale: [1, 1.9, 1], id: "building-12" },
      { type: "building", position: [10, 0, 6], scale: [1, 1.3, 1], id: "building-13" },
      { type: "building", position: [10, 0, 10], scale: [1, 1.7, 1], id: "building-14" },
      { type: "building", position: [6, 0, 10], scale: [1, 1.3, 1], id: "building-15" },
      { type: "building", position: [2, 0, 10], scale: [1, 1.7, 1], id: "building-16" },
      { type: "building", position: [-2, 0, 10], scale: [1, 1.5, 1], id: "building-17" },
      { type: "building", position: [-6, 0, 10], scale: [1, 2.1, 1], id: "building-18" },
      { type: "building", position: [-10, 0, 6], scale: [1, 1.8, 1], id: "building-19" },
      { type: "building", position: [-10, 0, 10], scale: [1, 1.4, 1], id: "building-20" },

      // Bâtiments du centre avec lumières
      { type: "building", position: [0, 0, 4], scale: [1.2, 2.5, 1.2], id: "building-center-1", hasLights: true },
      { type: "building", position: [-4, 0, 0], scale: [1.3, 2.2, 1.3], id: "building-center-2", hasLights: true },
      { type: "building", position: [4, 0, -4], scale: [1.4, 2.8, 1.4], id: "building-center-3", hasLights: true },
      { type: "building", position: [0, 0, -4], scale: [1.2, 2.0, 1.2], id: "building-center-4", hasLights: true },
      { type: "building", position: [2, 0, -2], scale: [1.1, 1.8, 1.1], id: "building-center-5", hasLights: true },

      // Straight Roads - Horizontal
      { type: "road", position: [-8, 0, -8], rotation: [0, 0, 0], id: "road-1" },
      { type: "road", position: [-6, 0, -8], rotation: [0, 0, 0], id: "road-2" },
      { type: "road", position: [-4, 0, -8], rotation: [0, 0, 0], id: "road-3" },
      { type: "road", position: [-2, 0, -8], rotation: [0, 0, 0], id: "road-4" },
      { type: "road", position: [0, 0, -8], rotation: [0, 0, 0], id: "road-5" },
      { type: "road", position: [2, 0, -8], rotation: [0, 0, 0], id: "road-6" },
      { type: "road", position: [4, 0, -8], rotation: [0, 0, 0], id: "road-7" },
      { type: "road", position: [6, 0, -8], rotation: [0, 0, 0], id: "road-8" },
      { type: "road", position: [8, 0, -8], rotation: [0, 0, 0], id: "road-9" },

      // Straight Roads - Vertical
      { type: "road", position: [-8, 0, -6], rotation: [0, Math.PI / 2, 0], id: "road-10" },
      { type: "road", position: [-8, 0, -4], rotation: [0, Math.PI / 2, 0], id: "road-11" },
      { type: "road", position: [-8, 0, -2], rotation: [0, Math.PI / 2, 0], id: "road-12" },
      { type: "road", position: [-8, 0, 0], rotation: [0, Math.PI / 2, 0], id: "road-13" },
      { type: "road", position: [-8, 0, 2], rotation: [0, Math.PI / 2, 0], id: "road-14" },
      { type: "road", position: [-8, 0, 4], rotation: [0, Math.PI / 2, 0], id: "road-15" },
      { type: "road", position: [-8, 0, 6], rotation: [0, Math.PI / 2, 0], id: "road-16" },
      { type: "road", position: [-8, 0, 8], rotation: [0, Math.PI / 2, 0], id: "road-17" },

      // Straight Roads - Horizontal
      { type: "road", position: [-8, 0, 8], rotation: [0, 0, 0], id: "road-18" },
      { type: "road", position: [-6, 0, 8], rotation: [0, 0, 0], id: "road-19" },
      { type: "road", position: [-4, 0, 8], rotation: [0, 0, 0], id: "road-20" },
      { type: "road", position: [-2, 0, 8], rotation: [0, 0, 0], id: "road-21" },
      { type: "road", position: [0, 0, 8], rotation: [0, 0, 0], id: "road-22" },
      { type: "road", position: [2, 0, 8], rotation: [0, 0, 0], id: "road-23" },
      { type: "road", position: [4, 0, 8], rotation: [0, 0, 0], id: "road-24" },
      { type: "road", position: [6, 0, 8], rotation: [0, 0, 0], id: "road-25" },
      { type: "road", position: [8, 0, 8], rotation: [0, 0, 0], id: "road-26" },

      // Straight Roads - Vertical
      { type: "road", position: [8, 0, -6], rotation: [0, Math.PI / 2, 0], id: "road-27" },
      { type: "road", position: [8, 0, -4], rotation: [0, Math.PI / 2, 0], id: "road-28" },
      { type: "road", position: [8, 0, -2], rotation: [0, Math.PI / 2, 0], id: "road-29" },
      { type: "road", position: [8, 0, 0], rotation: [0, Math.PI / 2, 0], id: "road-30" },
      { type: "road", position: [8, 0, 2], rotation: [0, Math.PI / 2, 0], id: "road-31" },
      { type: "road", position: [8, 0, 4], rotation: [0, Math.PI / 2, 0], id: "road-32" },
      { type: "road", position: [8, 0, 6], rotation: [0, Math.PI / 2, 0], id: "road-33" },

      // Coins des routes (remplacés par des routes normales)
      { type: "road", position: [-8, 0, -8], rotation: [0, 0, 0], id: "corner-1" },
      { type: "road", position: [8, 0, -8], rotation: [0, 0, 0], id: "corner-2" },
      { type: "road", position: [8, 0, 8], rotation: [0, 0, 0], id: "corner-3" },
      { type: "road", position: [-8, 0, 8], rotation: [0, 0, 0], id: "corner-4" },

      // Factories (pollution sources)
      { type: "factory", position: [0, 0, 0], scale: [1.5, 1.5, 1.5], id: "factory-1" },
      { type: "factory", position: [4, 0, 2], scale: [1.2, 1.2, 1.2], id: "factory-2" },
      { type: "factory", position: [-4, 0, 4], scale: [1.3, 1.3, 1.3], id: "factory-3" },
      { type: "factory", position: [-2, 0, -2], scale: [1.2, 1.2, 1.2], id: "factory-5" },

      // Cars
      { type: "car", position: [-6, 0.1, -8], rotation: [0, 0, 0], id: "car-1" },
      { type: "car", position: [2, 0.1, -8], rotation: [0, 0, 0], id: "car-2" },
      { type: "car", position: [-8, 0.1, 2], rotation: [0, Math.PI / 2, 0], id: "car-3" },
      { type: "car", position: [8, 0.1, -4], rotation: [0, Math.PI / 2, 0], id: "car-4" },
      { type: "car", position: [4, 0.1, 8], rotation: [0, Math.PI, 0], id: "car-5" },
      { type: "car", position: [-4, 0.1, 8], rotation: [0, Math.PI, 0], id: "car-6" },
      { type: "car", position: [8, 0.1, 4], rotation: [0, Math.PI / 2, 0], id: "car-7" },
      { type: "car", position: [-8, 0.1, -4], rotation: [0, Math.PI / 2, 0], id: "car-8" },
    ],
    [],
  )

  // Get all building IDs for solar panel placement
  const buildingIds = useMemo(() => {
    return initialCity.filter((item) => item.type === "building").map((building) => building.id)
  }, [initialCity])

  // Get all factory IDs for chimney removal
  const factoryIds = useMemo(() => {
    return initialCity.filter((item) => item.type === "factory").map((factory) => factory.id)
  }, [initialCity])

  // Check if a chimney has been removed
  const isChimneyRemoved = (factoryId: string) => {
    return placedItems.some((item) => item.type === "remove-chimney" && item.targetId === factoryId)
  }

  // Check if a building already has a solar panel
  const hasSolarPanel = (buildingId: string) => {
    return placedItems.some((item) => item.type === "solar-panel" && item.targetId === buildingId)
  }

  // Check if building lights are turned off
  const areLightsTurnedOff = (buildingId: string) => {
    return placedItems.some((item) => item.type === "turn-off-lights" && item.targetId === buildingId)
  }

  // Check if a cell is occupied by a placed item
  const isCellOccupied = (x: number, z: number) => {
    return placedItems.some((item) => {
      if (item.type === "solar-panel" || item.type === "remove-chimney" || item.type === "turn-off-lights") return false // These don't occupy grid cells
      const [itemX, _, itemZ] = item.position
      return Math.abs(itemX - x) < 0.5 && Math.abs(itemZ - z) < 0.5
    })
  }

  // Find building at position
  const getBuildingAtPosition = (x: number, z: number) => {
    return initialCity.find(
      (item) =>
        item.type === "building" && Math.abs(item.position[0] - x) < 1.5 && Math.abs(item.position[2] - z) < 1.5,
    )
  }

  // Find factory at position
  const getFactoryAtPosition = (x: number, z: number) => {
    return initialCity.find(
      (item) => item.type === "factory" && Math.abs(item.position[0] - x) < 1.5 && Math.abs(item.position[2] - z) < 1.5,
    )
  }

  // Handle mouse hover over the grid
  const handlePointerMove = (event: any) => {
    if (!selectedItem || !gameStarted) return

    event.stopPropagation()
    const { point } = event

    // Snap to grid
    const x = Math.round(point.x / CELL_SIZE) * CELL_SIZE
    const z = Math.round(point.z / CELL_SIZE) * CELL_SIZE

    setHoveredCell([x, z])

    // For solar panels, check if we're hovering over a building
    if (selectedItem === "solar-panel") {
      const building = getBuildingAtPosition(point.x, point.z)
      setHoveredBuildingId(building?.id || null)
      setHoveredChimneyId(null)
    }
    // For chimney removal, check if we're hovering over a factory
    else if (selectedItem === "remove-chimney") {
      const factory = getFactoryAtPosition(point.x, point.z)
      setHoveredChimneyId(factory?.id || null)
      setHoveredBuildingId(null)
    }
    // For turning off lights, check if we're hovering over a building with lights
    else if (selectedItem === "turn-off-lights" && isNight) {
      const building = getBuildingAtPosition(point.x, point.z)
      if (building && building.hasLights && !areLightsTurnedOff(building.id)) {
        setHoveredBuildingId(building.id)
      } else {
        setHoveredBuildingId(null)
      }
      setHoveredChimneyId(null)
    } else {
      setHoveredBuildingId(null)
      setHoveredChimneyId(null)
    }
  }

  // Modifier la fonction handleClick
  const handleClick = (event: any) => {
    if (!selectedItem || !gameStarted) return

    event.stopPropagation()

    // Récupérer le point de clic
    const { point } = event

    // Handle solar panel placement on buildings
    if (selectedItem === "solar-panel" && hoveredBuildingId) {
      // Check if building already has a solar panel
      if (hasSolarPanel(hoveredBuildingId)) return

      // Find the building to get its position
      const building = initialCity.find((item) => item.id === hoveredBuildingId)
      if (building) {
        const buildingHeight = building.scale ? building.scale[1] * 2 : 2 // Get height based on scale
        const position: [number, number, number] = [
          building.position[0],
          building.position[1] + buildingHeight,
          building.position[2],
        ]
        onPlaceItem(position, [0, 0, 0], hoveredBuildingId)
      }
      return
    }

    // Handle chimney removal from factories
    if (selectedItem === "remove-chimney" && hoveredChimneyId) {
      // Check if chimney already removed
      if (isChimneyRemoved(hoveredChimneyId)) return

      // Find the factory to get its position
      const factory = initialCity.find((item) => item.id === hoveredChimneyId)
      if (factory) {
        onPlaceItem([factory.position[0], factory.position[1], factory.position[2]], [0, 0, 0], hoveredChimneyId)
      }
      return
    }

    // Handle turning off lights in buildings
    if (selectedItem === "turn-off-lights" && hoveredBuildingId && isNight) {
      // Check if lights already turned off
      if (areLightsTurnedOff(hoveredBuildingId)) return

      // Find the building
      const building = initialCity.find((item) => item.id === hoveredBuildingId)
      if (building && building.hasLights) {
        onPlaceItem([building.position[0], building.position[1], building.position[2]], [0, 0, 0], hoveredBuildingId)
      }
      return
    }

    // Handle regular items
    if (hoveredCell) {
      const [x, z] = hoveredCell

      // Check if the cell is already occupied
      if (isCellOccupied(x, z)) return

      // Pour les arbres, pas besoin de rotation spécifique
      onPlaceItem([x, 0, z], [0, 0, 0])
    }
  }

  // Animate cars
  useFrame((state) => {
    const time = state.clock.getElapsedTime()

    // Make cars move along the roads
    const carElements = document.querySelectorAll(".car")
    carElements.forEach((car, index) => {
      const carObject = car as unknown as THREE.Object3D
      if (carObject && carObject.position) {
        // Different patterns for different cars
        if (index % 4 === 0) {
          // Cars moving horizontally on top road
          carObject.position.x = -6 + Math.sin(time * 0.5) * 12
          carObject.position.z = -8
          carObject.rotation.y = carObject.position.x > 0 ? Math.PI : 0
        } else if (index % 4 === 1) {
          // Cars moving vertically on right road
          carObject.position.z = -4 + Math.sin(time * 0.4) * 10
          carObject.position.x = 8
          carObject.rotation.y = carObject.position.z > 0 ? Math.PI * 1.5 : Math.PI * 0.5
        } else if (index % 4 === 2) {
          // Cars moving horizontally on bottom road
          carObject.position.x = 4 - Math.sin(time * 0.3) * 10
          carObject.position.z = 8
          carObject.rotation.y = carObject.position.x < 0 ? 0 : Math.PI
        } else {
          // Cars moving vertically on left road
          carObject.position.z = 2 - Math.sin(time * 0.45) * 8
          carObject.position.x = -8
          carObject.rotation.y = carObject.position.z < 0 ? Math.PI * 0.5 : Math.PI * 1.5
        }
      }
    })
  })

  return (
    <group ref={gridRef} onPointerMove={handlePointerMove} onClick={handleClick}>
      {/* Ground plane */}
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
        <planeGeometry args={[GRID_SIZE * CELL_SIZE, GRID_SIZE * CELL_SIZE]} />
        <meshStandardMaterial color="#8d8d8d" />
      </mesh>

      {/* Grid lines */}
      {grid.map(([x, y, z], index) => (
        <mesh key={index} position={[x, y, z]} visible={false}>
          <boxGeometry args={[CELL_SIZE, 0.1, CELL_SIZE]} />
          <meshBasicMaterial color="white" transparent opacity={0.1} />
        </mesh>
      ))}

      {/* Initial city elements */}
      {initialCity.map((item) => {
        if (item.type === "building") {
          const lightsOn = item.hasLights && isNight && !areLightsTurnedOff(item.id)
          const isHighlighted =
            (hoveredBuildingId === item.id && selectedItem === "solar-panel" && !hasSolarPanel(item.id)) ||
            (hoveredBuildingId === item.id && selectedItem === "turn-off-lights" && lightsOn)

          return (
            <Building
              key={item.id}
              id={item.id}
              position={item.position as [number, number, number]}
              scale={item.scale as [number, number, number]}
              isHighlighted={isHighlighted}
              hasLights={lightsOn}
            />
          )
        } else if (item.type === "road") {
          return (
            <Road
              key={item.id}
              position={item.position as [number, number, number]}
              rotation={item.rotation as [number, number, number]}
            />
          )
        } else if (item.type === "factory") {
          const chimneyRemoved = isChimneyRemoved(item.id)
          return (
            <Factory
              key={item.id}
              id={item.id}
              position={item.position as [number, number, number]}
              scale={item.scale as [number, number, number]}
              chimneyRemoved={chimneyRemoved}
              isHighlighted={hoveredChimneyId === item.id && selectedItem === "remove-chimney" && !chimneyRemoved}
              isNight={isNight}
            />
          )
        } else if (item.type === "car") {
          return (
            <Car
              key={item.id}
              position={item.position as [number, number, number]}
              rotation={item.rotation as [number, number, number]}
              isNight={isNight}
            />
          )
        }
        return null
      })}

      {/* Placed items */}
      {placedItems.map((item) => {
        switch (item.type) {
          case "tree":
            return <Tree key={item.id} position={item.position} rotation={item.rotation} />
          case "solar-panel": {
            // Find the building to get its position for the solar panel
            const building = initialCity.find((b) => b.id === item.targetId)
            if (!building) return null
            return <SolarPanel key={item.id} position={item.position} rotation={item.rotation} />
          }
          // For turn-off-lights and remove-chimney, we don't render anything as the building/factory component handles showing/hiding
          default:
            return null
        }
      })}

      {/* Preview of the selected item */}
      {selectedItem &&
        hoveredCell &&
        selectedItem !== "solar-panel" &&
        selectedItem !== "remove-chimney" &&
        selectedItem !== "turn-off-lights" && (
          <group position={[hoveredCell[0], 0, hoveredCell[1]]} opacity={0.5}>
            {selectedItem === "tree" && <Tree position={[0, 0, 0]} rotation={[0, 0, 0]} isPreview />}
          </group>
        )}

      {/* Preview for solar panel on building */}
      {selectedItem === "solar-panel" &&
        hoveredBuildingId &&
        !hasSolarPanel(hoveredBuildingId) &&
        (() => {
          const building = initialCity.find((item) => item.id === hoveredBuildingId)
          if (!building) return null
          const buildingHeight = building.scale ? building.scale[1] * 2 : 2
          return (
            <SolarPanel
              position={[building.position[0], building.position[1] + buildingHeight, building.position[2]]}
              rotation={[0, 0, 0]}
              isPreview
            />
          )
        })()}
    </group>
  )
}
