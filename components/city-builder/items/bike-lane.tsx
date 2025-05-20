"use client"

type BikeLaneProps = {
  position: [number, number, number]
  rotation: [number, number, number]
  isPreview?: boolean
}

export function BikeLane({ position, rotation, isPreview = false }: BikeLaneProps) {
  return (
    <group position={position} rotation={rotation}>
      {/* Bike lane base */}
      <mesh receiveShadow position={[0, 0.02, 0]}>
        <boxGeometry args={[1.8, 0.05, 0.8]} />
        <meshStandardMaterial color="#4CAF50" opacity={isPreview ? 0.5 : 1} transparent={isPreview} />
      </mesh>

      {/* Bike lane markings */}
      <mesh position={[0, 0.05, 0]}>
        <boxGeometry args={[1.5, 0.02, 0.1]} />
        <meshStandardMaterial color="white" opacity={isPreview ? 0.5 : 1} transparent={isPreview} />
      </mesh>

      {/* Bike symbol */}
      <mesh position={[0, 0.06, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.4, 0.4]} />
        <meshStandardMaterial color="white" opacity={isPreview ? 0.5 : 1} transparent={isPreview}>
          {/* We could add a bike texture here if available */}
        </meshStandardMaterial>
      </mesh>
    </group>
  )
}
