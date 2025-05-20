"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import type * as THREE from "three"

type SolarPanelProps = {
  position: [number, number, number]
  rotation: [number, number, number]
  isPreview?: boolean
}

export function SolarPanel({ position, rotation, isPreview = false }: SolarPanelProps) {
  const panelRef = useRef<THREE.Group>(null)

  // Subtle rotation to follow the sun
  useFrame((state) => {
    if (panelRef.current && !isPreview) {
      const time = state.clock.getElapsedTime()
      panelRef.current.rotation.x = -Math.PI / 4 + Math.sin(time * 0.1) * 0.05
    }
  })

  return (
    <group ref={panelRef} position={position} rotation={[...rotation]}>
      {/* Panel base/stand */}
      <mesh castShadow position={[0, 0.05, 0]}>
        <boxGeometry args={[1.2, 0.1, 1.2]} />
        <meshStandardMaterial color="#9E9E9E" opacity={isPreview ? 0.5 : 1} transparent={isPreview} />
      </mesh>

      {/* Solar panel */}
      <mesh castShadow position={[0, 0.15, 0]} rotation={[-Math.PI / 4, 0, 0]}>
        <boxGeometry args={[1.1, 0.05, 1.1]} />
        <meshStandardMaterial
          color="#1A237E"
          opacity={isPreview ? 0.5 : 1}
          transparent={isPreview}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Cell grid lines */}
      <mesh position={[0, 0.17, 0]} rotation={[-Math.PI / 4, 0, 0]}>
        <gridHelper args={[1.1, 4, "#FFFFFF", "#FFFFFF"]} />
        <meshBasicMaterial opacity={isPreview ? 0.3 : 0.6} transparent={true} />
      </mesh>
    </group>
  )
}
