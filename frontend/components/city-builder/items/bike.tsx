"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import type * as THREE from "three"

type BikeProps = {
  position: [number, number, number]
  rotation: [number, number, number]
  isNight?: boolean
  isPreview?: boolean
}

export function Bike({ position, rotation, isNight = false, isPreview = false }: BikeProps) {
  const bikeRef = useRef<THREE.Group>(null)

  // Animation pour les roues du vélo
  useFrame((state) => {
    if (bikeRef.current && !isPreview) {
      const time = state.clock.getElapsedTime()

      // Faire tourner les roues
      bikeRef.current.children.forEach((child, index) => {
        if (index === 1 || index === 2) {
          // Les roues
          child.rotation.x = time * 3
        }
      })
    }
  })

  return (
    <group ref={bikeRef} position={position} rotation={rotation} className="bike">
      {/* Cadre du vélo */}
      <mesh castShadow position={[0, 0.3, 0]}>
        <boxGeometry args={[0.6, 0.05, 0.05]} />
        <meshStandardMaterial color="#4CAF50" />
      </mesh>

      {/* Roue avant */}
      <mesh castShadow position={[0.25, 0.15, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.15, 0.02, 8, 16]} />
        <meshStandardMaterial color="#212121" />
      </mesh>

      {/* Roue arrière */}
      <mesh castShadow position={[-0.25, 0.15, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.15, 0.02, 8, 16]} />
        <meshStandardMaterial color="#212121" />
      </mesh>

      {/* Guidon */}
      <mesh castShadow position={[0.3, 0.4, 0]}>
        <boxGeometry args={[0.05, 0.2, 0.3]} />
        <meshStandardMaterial color="#4CAF50" />
      </mesh>

      {/* Selle */}
      <mesh castShadow position={[-0.2, 0.4, 0]}>
        <boxGeometry args={[0.15, 0.05, 0.1]} />
        <meshStandardMaterial color="#795548" />
      </mesh>

      {/* Pédales */}
      <mesh castShadow position={[0, 0.15, 0.1]}>
        <boxGeometry args={[0.1, 0.02, 0.05]} />
        <meshStandardMaterial color="#9E9E9E" />
      </mesh>

      <mesh castShadow position={[0, 0.15, -0.1]}>
        <boxGeometry args={[0.1, 0.02, 0.05]} />
        <meshStandardMaterial color="#9E9E9E" />
      </mesh>

      {/* Cycliste (simplifié) */}
      <mesh castShadow position={[0, 0.5, 0]}>
        <sphereGeometry args={[0.1, 8, 8]} />
        <meshStandardMaterial color="#2196F3" />
      </mesh>

      {/* Lumière avant pour la nuit */}
      {isNight && (
        <>
          <mesh position={[0.35, 0.4, 0]} rotation={[0, 0, 0]}>
            <sphereGeometry args={[0.03, 8, 8]} />
            <meshStandardMaterial color="#FFEB3B" emissive="#FFEB3B" emissiveIntensity={1} />
          </mesh>
          <pointLight position={[0.4, 0.4, 0]} intensity={0.3} color="#FFEB3B" distance={2} />
        </>
      )}

      {/* Lumière arrière pour la nuit */}
      {isNight && (
        <>
          <mesh position={[-0.35, 0.3, 0]} rotation={[0, 0, 0]}>
            <sphereGeometry args={[0.02, 8, 8]} />
            <meshStandardMaterial color="#F44336" emissive="#F44336" emissiveIntensity={1} />
          </mesh>
          <pointLight position={[-0.4, 0.3, 0]} intensity={0.2} color="#F44336" distance={1} />
        </>
      )}
    </group>
  )
}
