'use client'

import { Bot } from 'lucide-react'

export function LoadingIndicator() {
  return (
    <div className="flex gap-3 self-start max-w-[85%] sm:max-w-[75%]">
      {/* Avatar */}
      <div
        className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-indigo-500/20 border border-indigo-400/30"
        aria-hidden="true"
      >
        <Bot className="w-4 h-4 text-indigo-300" />
      </div>

      {/* Loading Dots */}
      <div className="flex items-center gap-1.5 px-4 py-3 rounded-2xl rounded-tl-sm ai-bubble">
        <div 
          className="w-2 h-2 rounded-full bg-indigo-300 loading-dot" 
          aria-hidden="true"
        />
        <div 
          className="w-2 h-2 rounded-full bg-indigo-300 loading-dot" 
          aria-hidden="true"
        />
        <div 
          className="w-2 h-2 rounded-full bg-indigo-300 loading-dot" 
          aria-hidden="true"
        />
        <span className="sr-only">Beacon is thinking...</span>
      </div>
    </div>
  )
}
