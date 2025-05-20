"use client"

type BuildingProps = {
  position: [number, number, number]
  scale?: [number, number, number]
  id: string
  isHighlighted?: boolean
  hasLights?: boolean
}

export function Building({ position, scale = [1, 1, 1], id, isHighlighted = false, hasLights = false }: BuildingProps) {
  return (
    <group position={position} scale={scale}>
      {/* Building base */}
      <mesh castShadow position={[0, 1, 0]}>
        <boxGeometry args={[1.8, 2, 1.8]} />
        <meshStandardMaterial color={isHighlighted ? "#4CAF50" : "#9E9E9E"} />
      </mesh>

      {/* Building roof */}
      <mesh castShadow position={[0, 2.05, 0]}>
        <boxGeometry args={[1.9, 0.1, 1.9]} />
        <meshStandardMaterial color={isHighlighted ? "#81C784" : "#616161"} />
      </mesh>

      {/* Building windows */}
      <mesh castShadow position={[0, 1, 0.91]}>
        <boxGeometry args={[1.4, 1.4, 0.05]} />
        <meshStandardMaterial
          color={hasLights ? "#FFF59D" : "#B3E5FC"}
          opacity={0.7}
          transparent={true}
          emissive={hasLights ? "#FFF59D" : "#000000"}
          emissiveIntensity={hasLights ? 0.5 : 0}
        />
      </mesh>

      <mesh castShadow position={[0, 1, -0.91]}>
        <boxGeometry args={[1.4, 1.4, 0.05]} />
        <meshStandardMaterial
          color={hasLights ? "#FFF59D" : "#B3E5FC"}
          opacity={0.7}
          transparent={true}
          emissive={hasLights ? "#FFF59D" : "#000000"}
          emissiveIntensity={hasLights ? 0.5 : 0}
        />
      </mesh>

      <mesh castShadow position={[0.91, 1, 0]}>
        <boxGeometry args={[0.05, 1.4, 1.4]} />
        <meshStandardMaterial
          color={hasLights ? "#FFF59D" : "#B3E5FC"}
          opacity={0.7}
          transparent={true}
          emissive={hasLights ? "#FFF59D" : "#000000"}
          emissiveIntensity={hasLights ? 0.5 : 0}
        />
      </mesh>

      <mesh castShadow position={[-0.91, 1, 0]}>
        <boxGeometry args={[0.05, 1.4, 1.4]} />
        <meshStandardMaterial
          color={hasLights ? "#FFF59D" : "#B3E5FC"}
          opacity={0.7}
          transparent={true}
          emissive={hasLights ? "#FFF59D" : "#000000"}
          emissiveIntensity={hasLights ? 0.5 : 0}
        />
      </mesh>

      {/* Building lights for night time */}
      {hasLights && (
        <>
          <pointLight position={[0, 1, 1]} intensity={0.5} color="#FFF59D" distance={3} />
          <pointLight position={[0, 1, -1]} intensity={0.5} color="#FFF59D" distance={3} />
          <pointLight position={[1, 1, 0]} intensity={0.5} color="#FFF59D" distance={3} />
          <pointLight position={[-1, 1, 0]} intensity={0.5} color="#FFF59D" distance={3} />
        </>
      )}
    </group>
  )
}
