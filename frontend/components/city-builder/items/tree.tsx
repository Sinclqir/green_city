"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import type * as THREE from "three"

type TreeProps = {
  position: [number, number, number]
  rotation: [number, number, number]
  isPreview?: boolean
}

export function Tree({ position, rotation, isPreview = false }: TreeProps) {
  const treeRef = useRef<THREE.Group>(null)

  // Gentle swaying animation for the tree
  useFrame((state) => {
    if (treeRef.current && !isPreview) {
      const time = state.clock.getElapsedTime()
      treeRef.current.rotation.x = Math.sin(time * 0.5) * 0.02
      treeRef.current.rotation.z = Math.cos(time * 0.3) * 0.02
    }
  })

  return (
    <group ref={treeRef} position={position} rotation={rotation}>
      {/* Tree trunk */}
      <mesh castShadow position={[0, 0.75, 0]}>
        <cylinderGeometry args={[0.1, 0.2, 1.5, 8]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>

      {/* Tree foliage */}
      <mesh castShadow position={[0, 1.75, 0]}>
        <coneGeometry args={[0.8, 2, 8]} />
        <meshStandardMaterial color="#2e7d32" opacity={isPreview ? 0.5 : 1} transparent={isPreview} />
      </mesh>
    </group>
  )
}
