'use client'

import { useState, useRef, useEffect } from 'react'
import { Mic, Send } from 'lucide-react'
import { cn } from '@/lib/utils'

interface InputDockProps {
  onSend: (message: string) => void
  disabled?: boolean
}

export function InputDock({ onSend, disabled = false }: InputDockProps) {
  const [message, setMessage] = useState('')
  const [isListening, setIsListening] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = 'auto'
      textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`
    }
  }, [message])

  const handleSubmit = () => {
    if (message.trim() && !disabled) {
      onSend(message.trim())
      setMessage('')
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto'
      }
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  const toggleVoice = () => {
    setIsListening(!isListening)
    // Voice-to-text would be implemented here with Web Speech API
  }

  return (
    <div className="input-dock px-3 sm:px-4 py-3 sm:py-4">
      <div className="flex items-end gap-2 sm:gap-3">
        {/* Voice Button */}
        <button
          onClick={toggleVoice}
          disabled={disabled}
          className={cn(
            'flex-shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/20',
            isListening
              ? 'bg-red-500/30 border border-red-400/50 text-red-400'
              : 'metallic-accent text-[#CBD5E1] hover:text-[#F8FAFC]',
            disabled && 'opacity-50 cursor-not-allowed'
          )}
          aria-label={isListening ? 'Stop listening' : 'Start voice input'}
        >
          <Mic className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
          {isListening && <span className="sr-only">Listening...</span>}
        </button>

        {/* Text Input */}
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            placeholder="Share what's on your mind..."
            rows={1}
            className={cn(
              'w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-[#F8FAFC] placeholder:text-[#CBD5E1]/50 text-sm sm:text-base resize-none overflow-hidden focus:outline-none focus:border-white/25 focus:bg-white/8 transition-all duration-200',
              disabled && 'opacity-50 cursor-not-allowed'
            )}
            aria-label="Type your message"
          />
        </div>

        {/* Send Button */}
        <button
          onClick={handleSubmit}
          disabled={!message.trim() || disabled}
          className={cn(
            'flex-shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-400/50',
            message.trim() && !disabled
              ? 'bg-cyan-500/30 border border-cyan-400/50 text-cyan-400 hover:bg-cyan-500/40 hover:scale-105'
              : 'bg-white/5 border border-white/10 text-[#CBD5E1]/40 cursor-not-allowed'
          )}
          aria-label="Send message"
        >
          <Send className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}
