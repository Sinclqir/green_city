"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import type * as THREE from "three"

type ParkProps = {
  position: [number, number, number]
  rotation: [number, number, number]
  isPreview?: boolean
}

export function Park({ position, rotation, isPreview = false }: ParkProps) {
  const parkRef = useRef<THREE.Group>(null)

  // Gentle swaying animation for the trees in the park
  useFrame((state) => {
    if (parkRef.current && !isPreview) {
      const time = state.clock.getElapsedTime()

      // Animate the trees in the park
      parkRef.current.children.forEach((child, index) => {
        if (index > 0) {
          // Skip the base
          child.rotation.x = Math.sin(time * 0.5 + index) * 0.02
          child.rotation.z = Math.cos(time * 0.3 + index) * 0.02
        }
      })
    }
  })

  return (
    <group ref={parkRef} position={position} rotation={rotation}>
      {/* Park base */}
      <mesh receiveShadow position={[0, 0.05, 0]}>
        <cylinderGeometry args={[3, 3, 0.1, 32]} />
        <meshStandardMaterial color="#4CAF50" opacity={isPreview ? 0.5 : 1} transparent={isPreview} />
      </mesh>

      {/* Central fountain */}
      <mesh castShadow position={[0, 0.3, 0]}>
        <cylinderGeometry args={[0.8, 1, 0.5, 16]} />
        <meshStandardMaterial color="#90A4AE" opacity={isPreview ? 0.5 : 1} transparent={isPreview} />
      </mesh>

      {/* Water in fountain */}
      <mesh position={[0, 0.55, 0]}>
        <cylinderGeometry args={[0.7, 0.7, 0.05, 16]} />
        <meshStandardMaterial color="#29B6F6" opacity={isPreview ? 0.5 : 0.8} transparent={true} />
      </mesh>

      {/* Trees around the park */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2
        const radius = 2
        const x = Math.cos(angle) * radius
        const z = Math.sin(angle) * radius

        return (
          <group key={i} position={[x, 0, z]}>
            {/* Tree trunk */}
            <mesh castShadow position={[0, 0.5, 0]}>
              <cylinderGeometry args={[0.1, 0.15, 1, 8]} />
              <meshStandardMaterial color="#8B4513" opacity={isPreview ? 0.5 : 1} transparent={isPreview} />
            </mesh>

            {/* Tree foliage */}
            <mesh castShadow position={[0, 1.2, 0]}>
              <sphereGeometry args={[0.5, 8, 8]} />
              <meshStandardMaterial color="#2E7D32" opacity={isPreview ? 0.5 : 1} transparent={isPreview} />
            </mesh>
          </group>
        )
      })}

      {/* Benches */}
      {Array.from({ length: 4 }).map((_, i) => {
        const angle = (i / 4) * Math.PI * 2 + Math.PI / 4
        const radius = 1.5
        const x = Math.cos(angle) * radius
        const z = Math.sin(angle) * radius

        return (
          <mesh key={`bench-${i}`} castShadow position={[x, 0.2, z]} rotation={[0, angle + Math.PI / 2, 0]}>
            <boxGeometry args={[0.6, 0.1, 0.2]} />
            <meshStandardMaterial color="#795548" opacity={isPreview ? 0.5 : 1} transparent={isPreview} />
          </mesh>
        )
      })}

      {/* Paths */}
      {Array.from({ length: 4 }).map((_, i) => {
        const angle = (i / 4) * Math.PI * 2

        return (
          <mesh key={`path-${i}`} receiveShadow position={[0, 0.06, 0]} rotation={[0, angle, 0]}>
            <boxGeometry args={[3, 0.01, 0.4]} />
            <meshStandardMaterial color="#E0E0E0" opacity={isPreview ? 0.5 : 1} transparent={isPreview} />
          </mesh>
        )
      })}
    </group>
  )
}
