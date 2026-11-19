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
    camera.position.z = 6.0

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

    // 2. Procedural Dreamscape Reflection Canvas & Texture
    const envCanvas = document.createElement('canvas')
    envCanvas.width = 512
    envCanvas.height = 256
    const ctx = envCanvas.getContext('2d')

    // Natural Frutiger Aero reflection (Daylight sky, white specular, emerald meadow)
    const grad = ctx.createLinearGradient(0, 0, 0, 256)
    grad.addColorStop(0, '#0284c7')
    grad.addColorStop(0.35, '#38bdf8')
    grad.addColorStop(0.5, '#ffffff')
    grad.addColorStop(0.68, '#10b981')
    grad.addColorStop(1, '#064e3b')
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, 512, 256)

    // Iridescent flare spot
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

    // Central organic chrome knot (Tuned dimensions so it never clips against canvas edges)
    const knotGeo = new THREE.TorusKnotGeometry(1.1, 0.35, 256, 64, 2, 3)
    const centralMesh = new THREE.Mesh(knotGeo, chromeMaterial)
    sculptureGroup.add(centralMesh)

    // Floating metallic satellites / spheres
    const sphereGeo = new THREE.SphereGeometry(0.2, 32, 32)
    const satellite1 = new THREE.Mesh(sphereGeo, chromeMaterial)
    satellite1.position.set(1.65, 0.7, 0.5)
    sculptureGroup.add(satellite1)

    const satellite2 = new THREE.Mesh(sphereGeo, chromeMaterial)
    satellite2.position.set(-1.5, -0.9, -0.4)
    satellite2.scale.set(0.75, 0.75, 0.75)
    sculptureGroup.add(satellite2)

    // 5. Studio & Atmospheric Lighting
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
      sculptureGroup.rotation.y = elapsedTime * 0.35 + mouseRef.current.x * 0.7
      sculptureGroup.rotation.x = Math.sin(elapsedTime * 0.25) * 0.18 + mouseRef.current.y * 0.5
      sculptureGroup.position.y = Math.sin(elapsedTime * 1.2) * 0.1

      // Satellites orbiting within safe frustum boundaries
      satellite1.position.x = Math.cos(elapsedTime * 0.7) * 1.6
      satellite1.position.z = Math.sin(elapsedTime * 0.7) * 0.95
      satellite1.position.y = Math.sin(elapsedTime * 0.9) * 0.4

      satellite2.position.x = -Math.cos(elapsedTime * 0.55) * 1.5
      satellite2.position.y = Math.sin(elapsedTime * 0.55) * 1.1
      satellite2.position.z = -Math.sin(elapsedTime * 0.55) * 0.75

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
    <div className={`chrome-sculpture-container ${className}`} ref={mountRef} />
  )
}
