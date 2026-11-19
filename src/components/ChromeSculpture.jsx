import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import './ChromeSculpture.css'

export default function ChromeSculpture({ className = '' }) {
  const mountRef = useRef(null)
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 })

  useEffect(() => {
    const container = mountRef.current
    if (!container) return

    const width = container.clientWidth || 320
    const height = container.clientHeight || 320

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100)
    camera.position.z = 5.2

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.3
    container.appendChild(renderer.domElement)

    // 2. Procedural Dreamscape Reflection Texture (Sky Blue top, Sun Flare middle, Grass Green bottom)
    const envCanvas = document.createElement('canvas')
    envCanvas.width = 512
    envCanvas.height = 256
    const ctx = envCanvas.getContext('2d')

    // Sky to meadow gradient (Digital Eden 3000: Azure Sky to Emerald Meadow)
    const grad = ctx.createLinearGradient(0, 0, 0, 256)
    grad.addColorStop(0, '#0284c7')     // Deep azure sky
    grad.addColorStop(0.35, '#38bdf8')  // Luminous sky blue horizon
    grad.addColorStop(0.5, '#ffffff')   // Pure solar specular highlight
    grad.addColorStop(0.68, '#10b981')  // Emerald botanical meadow
    grad.addColorStop(1, '#064e3b')     // Deep flora shade
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, 512, 256)

    // Lime & cyan iridescent flares
    const flareGrad = ctx.createRadialGradient(380, 80, 5, 380, 80, 110)
    flareGrad.addColorStop(0, 'rgba(132, 204, 22, 0.85)')
    flareGrad.addColorStop(0.6, 'rgba(34, 211, 238, 0.45)')
    flareGrad.addColorStop(1, 'transparent')
    ctx.fillStyle = flareGrad
    ctx.fillRect(0, 0, 512, 256)

    const envTexture = new THREE.CanvasTexture(envCanvas)
    envTexture.mapping = THREE.EquirectangularReflectionMapping

    // 3. Ultra-Reflective Liquid Chrome Material
    const chromeMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0.98,
      roughness: 0.03,
      envMap: envTexture,
      envMapIntensity: 2.9,
    })

    // 4. Group containing organic metallic sculptures
    const sculptureGroup = new THREE.Group()
    scene.add(sculptureGroup)

    // Central organic chrome knot (sculpture body)
    const knotGeo = new THREE.TorusKnotGeometry(1.25, 0.4, 256, 64, 2, 3)
    const centralMesh = new THREE.Mesh(knotGeo, chromeMaterial)
    sculptureGroup.add(centralMesh)

    // Floating metallic satellites / spheres
    const sphereGeo = new THREE.SphereGeometry(0.24, 32, 32)
    const satellite1 = new THREE.Mesh(sphereGeo, chromeMaterial)
    satellite1.position.set(1.9, 0.9, 0.6)
    sculptureGroup.add(satellite1)

    const satellite2 = new THREE.Mesh(sphereGeo, chromeMaterial)
    satellite2.position.set(-1.8, -1.1, -0.4)
    satellite2.scale.set(0.7, 0.7, 0.7)
    sculptureGroup.add(satellite2)

    // 5. Studio & Surreal Lighting (Eden 3000 Atmosphere)
    const ambientLight = new THREE.AmbientLight(0x38bdf8, 1.3)
    scene.add(ambientLight)

    const sunLight = new THREE.DirectionalLight(0xfff9e6, 2.8)
    sunLight.position.set(4, 5, 3)
    scene.add(sunLight)

    const aquaFill = new THREE.DirectionalLight(0x00bbcc, 2.0)
    aquaFill.position.set(-4, -2, -2)
    scene.add(aquaFill)

    const limeAccent = new THREE.PointLight(0x84cc16, 2.8, 12)
    limeAccent.position.set(2, -2, 2)
    scene.add(limeAccent)

    // 6. Mouse Interaction
    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2
      mouseRef.current.targetX = Math.max(-1, Math.min(1, x))
      mouseRef.current.targetY = Math.max(-1, Math.min(1, y))
    }

    window.addEventListener('mousemove', handleMouseMove)

    // 7. Animation Loop with smooth lerp physics
    let animId
    let clock = new THREE.Clock()

    const animate = () => {
      animId = requestAnimationFrame(animate)
      const elapsedTime = clock.getElapsedTime()

      // Smooth mouse follow
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05

      // Base idle rotation + interactive mouse reaction
      sculptureGroup.rotation.y = elapsedTime * 0.35 + mouseRef.current.x * 0.8
      sculptureGroup.rotation.x = Math.sin(elapsedTime * 0.25) * 0.2 + mouseRef.current.y * 0.6
      sculptureGroup.position.y = Math.sin(elapsedTime * 1.2) * 0.12

      // Satellites orbiting
      satellite1.position.x = Math.cos(elapsedTime * 0.8) * 2.0
      satellite1.position.z = Math.sin(elapsedTime * 0.8) * 1.4

      satellite2.position.x = -Math.cos(elapsedTime * 0.6) * 1.8
      satellite2.position.y = Math.sin(elapsedTime * 0.6) * 1.5

      renderer.render(scene, camera)
    }

    animate()

    // 8. Resize handler
    const handleResize = () => {
      if (!container) return
      const newW = container.clientWidth
      const newH = container.clientHeight
      camera.aspect = newW / newH
      camera.updateProjectionMatrix()
      renderer.setSize(newW, newH)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animId)
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
      knotGeo.dispose()
      sphereGeo.dispose()
      chromeMaterial.dispose()
      envTexture.dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <div className={`chrome-sculpture-container ${className}`} ref={mountRef}>
      {/* Scaffolding Frame / Art Installation Mount (Inspired by Reference 01) */}
      <div className="scaffolding-mount" aria-hidden="true">
        <span className="scaffold-pole scaffold-pole--left" />
        <span className="scaffold-pole scaffold-pole--right" />
        <span className="scaffold-beam scaffold-beam--top" />
        <span className="scaffold-beam scaffold-beam--bottom" />
        <span className="scaffold-tag">INSTALLATION // 3D CHROME 2026</span>
      </div>
    </div>
  )
}

