"use client"

type RoadProps = {
  position: [number, number, number]
  rotation: [number, number, number]
}

export function Road({ position, rotation }: RoadProps) {
  return (
    <group position={position} rotation={rotation}>
      {/* Road base */}
      <mesh receiveShadow position={[0, 0.01, 0]}>
        <boxGeometry args={[2, 0.02, 1]} />
        <meshStandardMaterial color="#424242" />
      </mesh>

      {/* Road markings */}
      <mesh position={[0, 0.02, 0]}>
        <boxGeometry args={[0.8, 0.01, 0.1]} />
        <meshStandardMaterial color="white" />
      </mesh>
    </group>
  )
}
