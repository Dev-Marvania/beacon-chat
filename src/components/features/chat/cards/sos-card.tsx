'use client'

import { AlertTriangle, PhoneCall } from 'lucide-react'

interface SOSCardProps {
  title: string
  helpline: string
  message: string
}

export function SOSCard({ title, helpline, message }: SOSCardProps) {
  return (
    <div className="rounded-xl p-5 max-w-sm bg-rose-500/10 border border-rose-500/30 shadow-sm shadow-rose-500/5 mt-2">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-full bg-rose-500/20 flex items-center justify-center">
          <AlertTriangle className="w-5 h-5 text-rose-400" />
        </div>
        <h3 className="text-rose-100 font-semibold text-lg">{title}</h3>
      </div>
      
      <p className="text-rose-200/80 text-sm mb-5 leading-relaxed">
        {message}
      </p>
      
      <a 
        href={`tel:${helpline}`}
        className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-rose-500/50 shadow-md shadow-rose-500/20"
      >
        <PhoneCall className="w-5 h-5" />
        <span>Call {helpline} Now</span>
      </a>
    </div>
  )
}
