import { useEffect, useState } from 'react'

export default function Loader() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className={`fixed inset-0 z-[100] grid place-items-center bg-black/90 text-white transition-opacity duration-700 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
      <div className="flex flex-col items-center gap-6">
        <div className="relative">
          <div className="breath-logo text-3xl font-semibold tracking-widest">
            DELHI BREATH
          </div>
          <div className="absolute -inset-6 rounded-full animate-breathe bg-cyan-400/10 blur-2xl" />
        </div>
        <p className="text-sm text-white/70">Preparing clean air experience…</p>
      </div>
    </div>
  )
}
