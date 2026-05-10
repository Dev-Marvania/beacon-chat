'use client'

import { MapPin, Phone, BadgeCheck, Clock } from 'lucide-react'

interface ResourceCardProps {
  facilityName: string
  distance: string
  address?: string
  phone?: string
  isVerified?: boolean
  availability?: string
}

export function ResourceCard({
  facilityName,
  distance,
  address,
  phone,
  isVerified = true,
  availability,
}: ResourceCardProps) {
  return (
    <div className="resource-card rounded-xl p-4 max-w-sm">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="text-[#F8FAFC] font-semibold text-sm sm:text-base truncate">
            {facilityName}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <MapPin className="w-3 h-3 text-[#CBD5E1]" aria-hidden="true" />
            <span className="text-xs text-[#CBD5E1]">{distance}</span>
          </div>
        </div>
        
        {/* Verified Data Badge */}
        {isVerified && (
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 shadow-sm shadow-emerald-500/10">
            <BadgeCheck className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
            <span className="text-[10px] font-semibold text-emerald-400 tracking-wide uppercase">Verified Data</span>
          </div>
        )}
      </div>

      {/* Address */}
      {address && (
        <p className="text-xs text-[#CBD5E1]/80 mb-2 line-clamp-2">
          {address}
        </p>
      )}

      {/* Availability */}
      {availability && (
        <div className="flex items-center gap-1.5 mb-3">
          <Clock className="w-3 h-3 text-amber-400" aria-hidden="true" />
          <span className="text-xs text-amber-400">{availability}</span>
        </div>
      )}

      {/* Call Now Button */}
      <button
        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/30 hover:border-emerald-400/50 text-emerald-400 text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
        aria-label={`Call ${facilityName}${phone ? ` at ${phone}` : ''}`}
      >
        <Phone className="w-4 h-4" aria-hidden="true" />
        <span>Call Now</span>
        {phone && <span className="text-emerald-400/70">• {phone}</span>}
      </button>
    </div>
  )
}
