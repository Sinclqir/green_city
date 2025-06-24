"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import type * as THREE from "three"

type TramProps = {
  position: [number, number, number]
  rotation: [number, number, number]
  isPreview?: boolean
}

export function Tram({ position, rotation, isPreview = false }: TramProps) {
  const tramRef = useRef<THREE.Group>(null)

  // Gentle movement animation for the tram
  useFrame((state) => {
    if (tramRef.current && !isPreview) {
      const time = state.clock.getElapsedTime()
      tramRef.current.position.x = position[0] + Math.sin(time * 0.5) * 0.05
    }
  })

  return (
    <group ref={tramRef} position={position} rotation={rotation}>
      {/* Tram body */}
      <mesh castShadow position={[0, 0.4, 0]}>
        <boxGeometry args={[1.8, 0.6, 0.6]} />
        <meshStandardMaterial color="#4CAF50" opacity={isPreview ? 0.5 : 1} transparent={isPreview} />
      </mesh>

      {/* Tram roof */}
      <mesh castShadow position={[0, 0.75, 0]}>
        <boxGeometry args={[1.9, 0.1, 0.7]} />
        <meshStandardMaterial color="#388E3C" opacity={isPreview ? 0.5 : 1} transparent={isPreview} />
      </mesh>

      {/* Tram windows */}
      <mesh castShadow position={[0, 0.45, 0.31]}>
        <boxGeometry args={[1.6, 0.3, 0.05]} />
        <meshStandardMaterial color="#B3E5FC" opacity={isPreview ? 0.5 : 0.7} transparent={true} />
      </mesh>

      <mesh castShadow position={[0, 0.45, -0.31]}>
        <boxGeometry args={[1.6, 0.3, 0.05]} />
        <meshStandardMaterial color="#B3E5FC" opacity={isPreview ? 0.5 : 0.7} transparent={true} />
      </mesh>

      {/* Tram front */}
      <mesh castShadow position={[0.9, 0.4, 0]}>
        <boxGeometry args={[0.1, 0.5, 0.6]} />
        <meshStandardMaterial color="#388E3C" opacity={isPreview ? 0.5 : 1} transparent={isPreview} />
      </mesh>

      {/* Tram wheels */}
      <mesh castShadow position={[0.5, 0.15, 0]}>
        <cylinderGeometry args={[0.15, 0.15, 0.1, 16]} rotation={[Math.PI / 2, 0, 0]} />
        <meshStandardMaterial color="#212121" opacity={isPreview ? 0.5 : 1} transparent={isPreview} />
      </mesh>

      <mesh castShadow position={[-0.5, 0.15, 0]}>
        <cylinderGeometry args={[0.15, 0.15, 0.1, 16]} rotation={[Math.PI / 2, 0, 0]} />
        <meshStandardMaterial color="#212121" opacity={isPreview ? 0.5 : 1} transparent={isPreview} />
      </mesh>

      {/* Tram rails */}
      <mesh receiveShadow position={[0, 0.02, 0]}>
        <boxGeometry args={[2, 0.04, 0.8]} />
        <meshStandardMaterial color="#9E9E9E" opacity={isPreview ? 0.5 : 1} transparent={isPreview} />
      </mesh>

      <mesh receiveShadow position={[0, 0.04, -0.2]}>
        <boxGeometry args={[2, 0.02, 0.05]} />
        <meshStandardMaterial color="#616161" opacity={isPreview ? 0.5 : 1} transparent={isPreview} />
      </mesh>

      <mesh receiveShadow position={[0, 0.04, 0.2]}>
        <boxGeometry args={[2, 0.02, 0.05]} />
        <meshStandardMaterial color="#616161" opacity={isPreview ? 0.5 : 1} transparent={isPreview} />
      </mesh>
    </group>
  )
}
