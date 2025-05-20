"use client"

type RoadCornerProps = {
  position: [number, number, number]
  rotation: [number, number, number]
}

export function RoadCorner({ position, rotation }: RoadCornerProps) {
  return (
    <group position={position} rotation={rotation}>
      {/* Road base */}
      <mesh receiveShadow position={[0, 0.01, 0]}>
        <boxGeometry args={[2, 0.02, 2]} />
        <meshStandardMaterial color="#424242" />
      </mesh>

      {/* Road markings - curved line */}
      <mesh position={[0, 0.02, 0]}>
        <torusGeometry args={[0.8, 0.05, 16, 16, Math.PI / 2]} />
        <meshStandardMaterial color="white" />
      </mesh>
    </group>
  )
}
