"use client"

type CarProps = {
  position: [number, number, number]
  rotation: [number, number, number]
  isNight?: boolean
  id?: string
  isHighlighted?: boolean
}

export function Car({ position, rotation, isNight = false, id, isHighlighted = false }: CarProps) {
  return (
    <group position={position} rotation={rotation} className="car">
      {/* Car body */}
      <mesh castShadow position={[0, 0.2, 0]}>
        <boxGeometry args={[0.8, 0.2, 0.4]} />
        <meshStandardMaterial color={isHighlighted ? "#4CAF50" : "#E53935"} />
      </mesh>

      {/* Car top */}
      <mesh castShadow position={[0, 0.35, 0]}>
        <boxGeometry args={[0.5, 0.15, 0.38]} />
        <meshStandardMaterial color={isHighlighted ? "#81C784" : "#C62828"} />
      </mesh>

      {/* Car windows */}
      <mesh castShadow position={[0, 0.35, 0.19]}>
        <boxGeometry args={[0.48, 0.12, 0.01]} />
        <meshStandardMaterial color="#B3E5FC" opacity={0.7} transparent={true} />
      </mesh>

      <mesh castShadow position={[0, 0.35, -0.19]}>
        <boxGeometry args={[0.48, 0.12, 0.01]} />
        <meshStandardMaterial color="#B3E5FC" opacity={0.7} transparent={true} />
      </mesh>

      {/* Car wheels */}
      <mesh castShadow position={[0.25, 0.1, 0.2]}>
        <cylinderGeometry args={[0.1, 0.1, 0.05, 16]} rotation={[Math.PI / 2, 0, 0]} />
        <meshStandardMaterial color="#212121" />
      </mesh>

      <mesh castShadow position={[-0.25, 0.1, 0.2]}>
        <cylinderGeometry args={[0.1, 0.1, 0.05, 16]} rotation={[Math.PI / 2, 0, 0]} />
        <meshStandardMaterial color="#212121" />
      </mesh>

      <mesh castShadow position={[0.25, 0.1, -0.2]}>
        <cylinderGeometry args={[0.1, 0.1, 0.05, 16]} rotation={[Math.PI / 2, 0, 0]} />
        <meshStandardMaterial color="#212121" />
      </mesh>

      <mesh castShadow position={[-0.25, 0.1, -0.2]}>
        <cylinderGeometry args={[0.1, 0.1, 0.05, 16]} rotation={[Math.PI / 2, 0, 0]} />
        <meshStandardMaterial color="#212121" />
      </mesh>

      {/* Car headlights */}
      {isNight && (
        <>
          <mesh position={[0.4, 0.2, 0.15]} rotation={[0, 0, 0]}>
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshStandardMaterial color="#FFEB3B" emissive="#FFEB3B" emissiveIntensity={1} />
          </mesh>
          <mesh position={[0.4, 0.2, -0.15]} rotation={[0, 0, 0]}>
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshStandardMaterial color="#FFEB3B" emissive="#FFEB3B" emissiveIntensity={1} />
          </mesh>
          <pointLight position={[0.5, 0.2, 0]} intensity={0.5} color="#FFEB3B" distance={2} />
        </>
      )}

      {/* Car taillights */}
      {isNight && (
        <>
          <mesh position={[-0.4, 0.2, 0.15]} rotation={[0, 0, 0]}>
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshStandardMaterial color="#F44336" emissive="#F44336" emissiveIntensity={1} />
          </mesh>
          <mesh position={[-0.4, 0.2, -0.15]} rotation={[0, 0, 0]}>
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshStandardMaterial color="#F44336" emissive="#F44336" emissiveIntensity={1} />
          </mesh>
          <pointLight position={[-0.5, 0.2, 0]} intensity={0.3} color="#F44336" distance={1} />
        </>
      )}

      {/* Highlight effect for conversion */}
      {isHighlighted && (
        <mesh position={[0, 0.7, 0]}>
          <sphereGeometry args={[0.2, 8, 8]} />
          <meshStandardMaterial color="#4CAF50" opacity={0.3} transparent={true} />
        </mesh>
      )}
    </group>
  )
}
