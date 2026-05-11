'use client'

import { cn } from '@/lib/core/utils'
import { Bot, User } from 'lucide-react'

interface ChatBubbleProps {
  message: string
  isAI: boolean
  timestamp?: string
  children?: React.ReactNode
}

export function ChatBubble({ message, isAI, timestamp, children }: ChatBubbleProps) {
  return (
    <div
      className={cn(
        'flex gap-3 max-w-[85%] sm:max-w-[75%]',
        isAI ? 'self-start' : 'self-end flex-row-reverse'
      )}
    >
      {/* Avatar */}
      <div
        className={cn(
          'flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center',
          isAI
            ? 'bg-indigo-500/20 border border-indigo-400/30'
            : 'bg-cyan-500/20 border border-cyan-400/30'
        )}
        aria-hidden="true"
      >
        {isAI ? (
          <Bot className="w-4 h-4 text-indigo-300" />
        ) : (
          <User className="w-4 h-4 text-cyan-300" />
        )}
      </div>

      {/* Message Content */}
      <div className="flex flex-col gap-2">
        <div
          className={cn(
            'px-4 py-3 rounded-2xl',
            isAI
              ? 'ai-bubble rounded-tl-sm'
              : 'user-bubble rounded-tr-sm'
          )}
        >
          <p className="text-[#F8FAFC] text-sm sm:text-base leading-relaxed">
            {message}
          </p>
        </div>
        
        {/* Embedded Content (Resource Cards, etc.) */}
        {children && <div className="mt-1">{children}</div>}
        
        {/* Timestamp */}
        {timestamp && (
          <span className="text-xs text-[#CBD5E1]/60 px-1">
            {timestamp}
          </span>
        )}
      </div>
    </div>
  )
}
