'use client'

import { useState } from 'react'
import { Lightbulb, Wind, CheckCircle2 } from 'lucide-react'

interface CopingStrategyCardProps {
  title: string
  steps: string[]
  actionLabel?: string
  onActionClick?: () => void
}

export function CopingStrategyCard({
  title,
  steps,
  actionLabel = 'Try a Guided Breathing Exercise',
  onActionClick,
}: CopingStrategyCardProps) {
  const [isBreathingActive, setIsBreathingActive] = useState(false)
  const [breathPhase, setBreathPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale')

  const handleActionClick = () => {
    if (onActionClick) {
      onActionClick()
    } else {
      // Start guided breathing exercise
      setIsBreathingActive(true)
      runBreathingCycle()
    }
  }

  const runBreathingCycle = () => {
    // Inhale for 4 seconds
    setBreathPhase('inhale')
    setTimeout(() => {
      // Hold for 4 seconds
      setBreathPhase('hold')
      setTimeout(() => {
        // Exhale for 4 seconds
        setBreathPhase('exhale')
        setTimeout(() => {
          setIsBreathingActive(false)
        }, 4000)
      }, 4000)
    }, 4000)
  }

  return (
    <div className="glass-card rounded-xl p-4 mt-2 border border-white/10 bg-gradient-to-br from-violet-500/10 to-indigo-500/10">
      {/* Header */}
      <div className="flex items-start gap-3 mb-3">
        <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-violet-500/20 border border-violet-400/30 flex items-center justify-center">
          <Lightbulb className="w-4.5 h-4.5 text-violet-400" aria-hidden="true" />
        </div>
        <div className="flex-1">
          <h4 className="text-[#F8FAFC] font-semibold text-sm leading-tight">{title}</h4>
          <span className="text-xs text-violet-300/70">Coping Strategy</span>
        </div>
      </div>

      {/* Steps */}
      <ul className="space-y-2 mb-4 pl-1">
        {steps.map((step, index) => (
          <li key={index} className="flex items-start gap-2 text-[#CBD5E1] text-sm">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
            <span>{step}</span>
          </li>
        ))}
      </ul>

      {/* Breathing Exercise Visual (when active) */}
      {isBreathingActive && (
        <div className="mb-4 p-4 rounded-lg bg-white/5 border border-white/10 text-center">
          <div 
            className={`mx-auto w-16 h-16 rounded-full border-2 transition-all duration-[4000ms] ease-in-out flex items-center justify-center ${
              breathPhase === 'inhale' 
                ? 'scale-125 border-cyan-400 bg-cyan-500/20' 
                : breathPhase === 'hold'
                ? 'scale-125 border-amber-400 bg-amber-500/20'
                : 'scale-100 border-violet-400 bg-violet-500/20'
            }`}
          >
            <Wind className={`w-6 h-6 transition-colors duration-500 ${
              breathPhase === 'inhale' 
                ? 'text-cyan-400' 
                : breathPhase === 'hold'
                ? 'text-amber-400'
                : 'text-violet-400'
            }`} />
          </div>
          <p className="text-[#F8FAFC] font-medium mt-3 capitalize">{breathPhase}...</p>
          <p className="text-xs text-[#CBD5E1]/70 mt-1">
            {breathPhase === 'inhale' && 'Breathe in slowly through your nose'}
            {breathPhase === 'hold' && 'Hold your breath gently'}
            {breathPhase === 'exhale' && 'Release slowly through your mouth'}
          </p>
        </div>
      )}

      {/* Action Button */}
      <button
        onClick={handleActionClick}
        disabled={isBreathingActive}
        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-violet-500 to-indigo-500 text-white font-medium text-sm transition-all duration-300 hover:from-violet-400 hover:to-indigo-400 hover:shadow-lg hover:shadow-violet-500/25 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-violet-400/50 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label={actionLabel}
      >
        <Wind className="w-4 h-4" aria-hidden="true" />
        <span>{isBreathingActive ? 'Breathing...' : actionLabel}</span>
      </button>
    </div>
  )
}
