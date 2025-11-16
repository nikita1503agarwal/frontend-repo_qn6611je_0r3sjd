import { useEffect, useState } from 'react'
import Loader from './components/Loader'
import Hero from './components/Hero'
import Features from './components/Features'
import AQI from './components/AQI'

function App() {
  const [showLoader, setShowLoader] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setShowLoader(false), 1200)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    // Inject model-viewer script for the 3D component
    const script = document.createElement('script')
    script.type = 'module'
    script.src = 'https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js'
    document.head.appendChild(script)
    return () => {
      document.head.removeChild(script)
    }
  }, [])

  return (
    <div className="bg-black text-white">
      {showLoader && <Loader />}
      <Hero />
      <Features />
      <AQI />
      <footer className="py-16 text-center text-white/50 text-sm">© {new Date().getFullYear()} Delhi Breath</footer>
    </div>
  )
}

export default App
