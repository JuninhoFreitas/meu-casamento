import { Canvas, useFrame } from '@react-three/fiber'
import { Float, useGLTF } from '@react-three/drei'
import { Suspense, useEffect, useRef } from 'react'
import { Color, MeshPhysicalMaterial } from 'three'
import s from './rotating-rings.module.scss'

// Pré-carrega o modelo
if (typeof window !== 'undefined') {
  useGLTF.preload('/models/rings.glb')
}

function RingsModel() {
  const { scene } = useGLTF('/models/rings.glb')
  const groupRef = useRef()
  const ringsRef = useRef([])

  // Aplica material dourado a todos os meshes do modelo
  useEffect(() => {
    const rings = []
    scene.traverse((child) => {
      if (child.isMesh) {
        // Material dourado com propriedades realistas
        const goldMaterial = new MeshPhysicalMaterial({
          color: new Color('#FFD700'), // Dourado
          metalness: 0.95,
          roughness: 0.15,
          envMapIntensity: 2.0,
          clearcoat: 1.0,
          clearcoatRoughness: 0.05,
          emissive: new Color('#FFD700'),
          emissiveIntensity: 0.1,
        })
        child.material = goldMaterial
        child.castShadow = true
        child.receiveShadow = true
        rings.push(child)
      }
    })
    ringsRef.current = rings
  }, [scene])

  // Animação de rotação
  useFrame((state, delta) => {
    if (groupRef.current) {
      // Rotação geral suave do grupo
      groupRef.current.rotation.y += delta * 0.3
    }

    // Rotação individual dos anéis em direções opostas
    ringsRef.current.forEach((ring, index) => {
      if (ring) {
        const direction = index % 2 === 0 ? -1 : 1
        ring.rotation.z += delta * direction * 1.0
        ring.rotation.x += delta * direction * 0.3
      }
    })
  })

  return (
    <group ref={groupRef} scale={[0.2, 0.2, 0.2]} position={[0, 0, 0]}>
      <primitive object={scene.clone()} />
    </group>
  )
}

function RingsScene() {
  return (
    <>
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} color="#FFD700" />
      <directionalLight position={[-5, -5, -5]} intensity={0.6} />
      <pointLight position={[0, 5, 5]} intensity={0.8} color="#FFD700" />
      <pointLight position={[0, -5, -5]} intensity={0.4} color="#FFA500" />
      <Float floatIntensity={0.4} rotationIntensity={0.7} speed={2.5}>
        <Suspense fallback={null}>
          <RingsModel />
        </Suspense>
      </Float>
    </>
  )
}

export function RotatingRings() {
  return (
    <div className={s.container}>
      <Canvas
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        camera={{ position: [0, 0, 8], fov: 75 }}
        dpr={[1, 2]}
        frameloop="always"
      >
        <RingsScene />
      </Canvas>
    </div>
  )
}
