import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'

// Simple 3D viewer using <model-viewer> via CDN to avoid extra deps
// It supports click-drag orbit and nice lighting out of the box.
export default function Hero() {
  const containerRef = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const repelX = useTransform(x, [-300, 0, 300], [40, 0, -40])
  const repelY = useTransform(y, [-300, 0, 300], [40, 0, -40])

  useEffect(() => {
    const onMove = (e) => {
      const rect = containerRef.current?.getBoundingClientRect()
      if (!rect) return
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      x.set(e.clientX - cx)
      y.set(e.clientY - cy)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [x, y])

  return (
    <section ref={containerRef} className="relative h-[100svh] overflow-hidden">
      {/* Background haze video */}
      <div className="absolute inset-0 -z-10">
        <video className="w-full h-full object-cover opacity-60" autoPlay muted loop playsInline>
          <source src="https://cdn.coverr.co/videos/coverr-smoggy-city-8485/1080p.mp4" type="video/mp4" />
        </video>
        {/* Pollutant particles that subtly move away from cursor */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(600px 600px at 50% 50%, rgba(0,255,255,0.12), transparent 60%)',
            translateX: repelX,
            translateY: repelY,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/60" />
      </div>

      {/* Headline */}
      <div className="absolute top-24 left-1/2 -translate-x-1/2 text-center px-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-4xl sm:text-6xl font-semibold tracking-tight text-white"
        >
          This isn’t just an air purifier. It’s a statement.
        </motion.h1>
      </div>

      {/* 3D Model - <model-viewer> web component */}
      <div className="absolute inset-0 grid place-items-center">
        <model-viewer
          src="https://modelviewer.dev/shared-assets/models/Astronaut.glb"
          alt="Delhi Breath prototype"
          camera-controls
          interaction-prompt="none"
          autoplay
          exposure="1.2"
          ar-modes="webxr scene-viewer quick-look"
          environment-image="neutral"
          shadow-intensity="0.8"
          style={{ width: '70vmin', height: '70vmin' }}
        ></model-viewer>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/80 text-sm">
        Scroll
      </div>
    </section>
  )
}
