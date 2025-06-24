"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import type * as THREE from "three"

type FactoryProps = {
  position: [number, number, number]
  scale?: [number, number, number]
  id: string
  chimneyRemoved?: boolean
  isHighlighted?: boolean
  isNight?: boolean
}

export function Factory({
  position,
  scale = [1, 1, 1],
  id,
  chimneyRemoved = false,
  isHighlighted = false,
  isNight = false,
}: FactoryProps) {
  const smokeRef = useRef<THREE.Group>(null)

  // Animate smoke particles
  useFrame((state) => {
    if (smokeRef.current && !chimneyRemoved) {
      const time = state.clock.getElapsedTime()

      // Make smoke particles rise and fade
      smokeRef.current.children.forEach((particle, index) => {
        const p = particle as THREE.Mesh
        p.position.y += 0.01
        p.position.x += Math.sin(time * 0.5 + index) * 0.005

        const material = p.material as THREE.MeshStandardMaterial
        material.opacity -= 0.005

        // Reset particles that have faded out
        if (material.opacity <= 0) {
          p.position.y = 0
          material.opacity = 0.7
        }
      })
    }
  })

  return (
    <group position={position} scale={scale}>
      {/* Factory main building */}
      <mesh castShadow position={[0, 1, 0]}>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color={isHighlighted ? "#ff9800" : "#757575"} />
      </mesh>

      {/* Factory roof */}
      <mesh castShadow position={[0, 2.05, 0]}>
        <boxGeometry args={[2.1, 0.1, 2.1]} />
        <meshStandardMaterial color="#424242" />
      </mesh>

      {/* Factory chimney - only show if not removed */}
      {!chimneyRemoved && (
        <mesh castShadow position={[0.5, 2.75, 0.5]}>
          <cylinderGeometry args={[0.2, 0.3, 1.5, 8]} />
          <meshStandardMaterial color={isHighlighted ? "#ff9800" : "#616161"} />
        </mesh>
      )}

      {/* Factory windows */}
      <mesh castShadow position={[0, 1, 1.01]}>
        <boxGeometry args={[1.6, 1, 0.05]} />
        <meshStandardMaterial
          color={isNight ? "#FFF59D" : "#B3E5FC"}
          opacity={0.7}
          transparent={true}
          emissive={isNight ? "#FFF59D" : "#000000"}
          emissiveIntensity={isNight ? 0.3 : 0}
        />
      </mesh>

      {/* Factory lights for night time */}
      {isNight && (
        <>
          <pointLight position={[0, 1, 1.2]} intensity={0.4} color="#FFF59D" distance={3} />
          <pointLight position={[0.5, 3, 0.5]} intensity={0.3} color="#FF5722" distance={2} visible={!chimneyRemoved} />
        </>
      )}

      {/* Smoke particles - only show if chimney not removed */}
      {!chimneyRemoved && (
        <group ref={smokeRef} position={[0.5, 3.5, 0.5]}>
          {Array.from({ length: 10 }).map((_, i) => (
            <mesh key={i} position={[0, i * 0.2, 0]}>
              <sphereGeometry args={[0.2, 8, 8]} />
              <meshStandardMaterial color="#9E9E9E" opacity={0.7 - i * 0.07} transparent={true} />
            </mesh>
          ))}
        </group>
      )}
    </group>
  )
}
