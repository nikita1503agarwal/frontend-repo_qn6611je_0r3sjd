import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function AQI() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchAQI = async () => {
      try {
        const res = await fetch(`${baseUrl}/aqi`)
        const json = await res.json()
        setData(json)
      } catch (e) {
        setError('Failed to load AQI. Showing sample values.')
      } finally {
        setLoading(false)
      }
    }
    fetchAQI()
  }, [])

  const outside = data?.outside_aqi || 320
  const inside = data?.inside_aqi || 28
  const diff = Math.max(0, outside - inside)

  return (
    <section className="relative py-28 bg-slate-950 text-white overflow-hidden">
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(50%_50%_at_50%_50%,#67e8f9_0%,transparent_60%)]" />
      <div className="relative max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl font-semibold mb-4">Live AQI</h2>
            <p className="text-slate-300 mb-6">Outside vs Inside with Delhi Breath</p>
            {loading ? (
              <p className="text-slate-400">Loading…</p>
            ) : (
              <p className="text-slate-300 text-sm mb-2">Last updated: {data?.last_updated?.replace('T',' ').slice(0,19)} ({data?.city || 'Delhi'})</p>
            )}
            {error && <p className="text-amber-300 text-sm mb-2">{error}</p>}
          </div>

          {/* Graph */}
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-slate-300">AQI Outside</p>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(outside, 500) / 5}%` }}
                  transition={{ duration: 1 }}
                  className="h-8 rounded bg-rose-500"
                />
                <p className="mt-2 text-2xl font-semibold">{outside}</p>
              </div>
              <div>
                <p className="text-slate-300">AQI Inside</p>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(inside, 500) / 5}%` }}
                  transition={{ duration: 1 }}
                  className="h-8 rounded bg-emerald-500"
                />
                <p className="mt-2 text-2xl font-semibold">{inside}</p>
              </div>
            </div>
            <div className="mt-6 text-slate-200">
              Improvement: <span className="text-cyan-300 font-semibold">{Math.round((diff / outside) * 100)}%</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
