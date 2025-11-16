import { motion, useScroll, useTransform } from 'framer-motion'
import { Wind, Cpu, Shield } from 'lucide-react'

export default function Features() {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], [0, -200])

  const items = [
    {
      icon: Cpu,
      title: 'AI-Powered Sensor',
      desc: 'Continuously learns your environment to optimize purification.',
    },
    {
      icon: Wind,
      title: 'Tri-Stage Filtration',
      desc: 'Pre-filter, HEPA H13, and Activated Carbon for Delhi-grade defense.',
    },
    {
      icon: Shield,
      title: 'Safe & Silent',
      desc: 'Medical-grade hygiene with whisper-quiet operation.',
    },
  ]

  return (
    <section className="relative py-28 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12">
          {items.map((it, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="p-6 rounded-2xl bg-gradient-to-br from-slate-50 to-white shadow-sm border border-slate-100"
            >
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 text-cyan-600 grid place-items-center mb-4">
                <it.icon />
              </div>
              <h3 className="text-xl font-semibold mb-2">{it.title}</h3>
              <p className="text-slate-600">{it.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Subtle flowing air ribbon following scroll */}
        <motion.div
          style={{ y }}
          className="pointer-events-none mt-20 h-24 rounded-full bg-gradient-to-r from-cyan-400/40 via-sky-300/30 to-blue-400/40 blur-2xl"
        />

        {/* Filtration explode diagram placeholder */}
        <div className="mt-24 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h4 className="text-2xl font-semibold mb-3">Filtration, explained.</h4>
            <p className="text-slate-600">
              As you scroll, components separate to reveal the airflow path — pre-filter catches the big stuff, HEPA H13 captures microscopic particulates, and activated carbon neutralizes odors and VOCs.
            </p>
          </div>
          <div className="relative h-64">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="absolute inset-y-10 left-0 right-[60%] rounded-xl bg-slate-200"
            />
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="absolute inset-y-6 left-[20%] right-[40%] rounded-xl bg-white shadow"
            />
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="absolute inset-y-3 left-[40%] right-[10%] rounded-xl bg-slate-50 shadow"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
