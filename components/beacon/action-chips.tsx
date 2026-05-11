'use client'

import { FlaskConical, Shield, Leaf, ChevronRight } from 'lucide-react'

interface ActionChipsProps {
  onChipClick: (message: string) => void
}

const chips = [
  {
    label: 'Learn about a substance',
    icon: FlaskConical,
    message: 'Learn about a substance',
    color: 'cyan',
  },
  {
    label: 'Handling peer pressure',
    icon: Shield,
    message: 'Handling peer pressure',
    color: 'amber',
  },
  {
    label: 'Healthy stress relief',
    icon: Leaf,
    message: 'Healthy stress relief',
    color: 'rose',
  },
]

const colorClasses = {
  rose: {
    icon: 'text-rose-400 group-hover:text-rose-300',
    bg: 'group-hover:bg-rose-500/10',
    border: 'group-hover:border-rose-400/40',
    glow: 'group-hover:shadow-rose-500/20',
  },
  cyan: {
    icon: 'text-cyan-400 group-hover:text-cyan-300',
    bg: 'group-hover:bg-cyan-500/10',
    border: 'group-hover:border-cyan-400/40',
    glow: 'group-hover:shadow-cyan-500/20',
  },
  amber: {
    icon: 'text-amber-400 group-hover:text-amber-300',
    bg: 'group-hover:bg-amber-500/10',
    border: 'group-hover:border-amber-400/40',
    glow: 'group-hover:shadow-amber-500/20',
  },
}

export function ActionChips({ onChipClick }: ActionChipsProps) {
  return (
    <div className="flex gap-1.5 px-4 py-2 border-t border-white/5 overflow-x-auto">
      {chips.map((chip) => {
        const colors = colorClasses[chip.color as keyof typeof colorClasses]
        return (
          <button
            key={chip.label}
            onClick={() => onChipClick(chip.message)}
            className={`group flex items-center gap-1.5 px-2.5 py-1.5 rounded-full glass-chip text-[#CBD5E1] text-xs font-medium transition-all duration-300 hover:text-[#F8FAFC] hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-white/20 border border-white/10 ${colors.bg} ${colors.border} hover:shadow-lg ${colors.glow} flex-shrink-0`}
            aria-label={chip.label}
          >
            <chip.icon 
              className={`w-3.5 h-3.5 transition-colors ${colors.icon}`} 
              aria-hidden="true" 
            />
            <span className="whitespace-nowrap">{chip.label}</span>
            <ChevronRight 
              className="w-3 h-3 text-white/30 group-hover:text-white/60 group-hover:translate-x-0.5 transition-all" 
              aria-hidden="true" 
            />
          </button>
        )
      })}
    </div>
  )
}
