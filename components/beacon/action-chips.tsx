'use client'

import { Heart, MapPin, Users } from 'lucide-react'

interface ActionChipsProps {
  onChipClick: (message: string) => void
}

const chips = [
  {
    label: 'I need help right now',
    icon: Heart,
    message: 'I need help right now',
  },
  {
    label: 'Find local support',
    icon: MapPin,
    message: 'Find local support',
  },
  {
    label: 'Help a loved one',
    icon: Users,
    message: 'How to help a loved one',
  },
]

export function ActionChips({ onChipClick }: ActionChipsProps) {
  return (
    <div className="flex flex-wrap gap-2 px-4 py-3 border-t border-white/5">
      {chips.map((chip) => (
        <button
          key={chip.label}
          onClick={() => onChipClick(chip.message)}
          className="group flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full glass-chip text-[#CBD5E1] text-xs sm:text-sm font-medium transition-all duration-300 hover:text-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-white/20"
          aria-label={chip.label}
        >
          <chip.icon 
            className="w-3.5 h-3.5 text-[#CBD5E1] group-hover:text-[#F8FAFC] transition-colors" 
            aria-hidden="true" 
          />
          <span className="whitespace-nowrap">{chip.label}</span>
        </button>
      ))}
    </div>
  )
}
