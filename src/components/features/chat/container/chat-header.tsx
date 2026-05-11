'use client'

import { Shield, AlertTriangle } from 'lucide-react'

interface ChatHeaderProps {
  onSOSClick?: () => void;
}

export function ChatHeader({ onSOSClick }: ChatHeaderProps) {
  return (
    <header className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-white/10">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-lg sm:text-xl font-semibold text-[#F8FAFC] tracking-tight">
          Beacon
        </span>
      </div>

      {/* Security Badge */}
      <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full glass-chip">
        <Shield className="w-4 h-4 text-emerald-400" aria-hidden="true" />
        <span className="text-xs font-medium text-[#CBD5E1]">
          Encrypted & Anonymous
        </span>
      </div>

      {/* Mobile Security Badge */}
      <div className="flex sm:hidden items-center justify-center w-8 h-8 rounded-full glass-chip">
        <Shield className="w-4 h-4 text-emerald-400" aria-hidden="true" />
        <span className="sr-only">Encrypted & Anonymous</span>
      </div>

      {/* Emergency SOS Button */}
      <button
        onClick={onSOSClick}
        className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-[#D96C5B]/90 hover:bg-[#D96C5B] text-white text-sm font-medium transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#D96C5B]/50 focus:ring-offset-2 focus:ring-offset-transparent"
        aria-label="Emergency SOS - Get immediate help"
      >
        <AlertTriangle className="w-4 h-4" aria-hidden="true" />
        <span className="hidden sm:inline">Emergency SOS</span>
        <span className="sm:hidden">SOS</span>
      </button>
    </header>
  )
}
