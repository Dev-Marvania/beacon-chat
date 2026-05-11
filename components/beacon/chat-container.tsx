'use client'

import { useState, useCallback } from 'react'
import { ChatHeader } from './chat-header'
import { MessageList, type Message } from './message-list'
import { ActionChips } from './action-chips'
import { InputDock } from './input-dock'

const welcomeMessage: Message = {
  id: '1',
  content: "Welcome to Beacon. I'm here to answer your questions about substances, help you navigate peer pressure, or share healthy ways to manage stress. Everything you ask is completely anonymous. What would you like to talk about?",
  isAI: true,
  timestamp: 'Just now',
}

// Pre-populated user response for demo
const userResponse: Message = {
  id: '2',
  content: "Handling peer pressure",
  isAI: false,
  timestamp: 'Just now',
}

// Pre-populated AI response with coping strategy card
const aiCopingResponse: Message = {
  id: '3',
  content: "Peer pressure can feel overwhelming, but you have more control than you might think. Here's a technique that many people find helpful when they're in the moment:",
  isAI: true,
  timestamp: 'Just now',
  copingCard: {
    title: "The 'Delay & Distract' Technique",
    steps: [
      "Pause and take a deep breath before responding",
      "Say \"I need a minute\" or \"Let me think about it\"",
      "Shift your focus — check your phone, get water, or step away",
      "Remember: a real friend will respect your boundaries"
    ],
    actionLabel: 'Try a Guided Breathing Exercise',
  },
}

// Simulated AI responses for demo
const aiResponses: Record<string, Message> = {
  'Learn about a substance': {
    id: '',
    content: "I can help you understand the facts about different substances — their effects, risks, and what the science actually says. What substance would you like to learn more about? You can ask about anything, and remember, this conversation is completely anonymous.",
    isAI: true,
  },
  'Handling peer pressure': {
    id: '',
    content: "Peer pressure can feel overwhelming, but you have more control than you might think. Here's a technique that many people find helpful when they're in the moment:",
    isAI: true,
    copingCard: {
      title: "The 'Delay & Distract' Technique",
      steps: [
        "Pause and take a deep breath before responding",
        "Say \"I need a minute\" or \"Let me think about it\"",
        "Shift your focus — check your phone, get water, or step away",
        "Remember: a real friend will respect your boundaries"
      ],
      actionLabel: 'Try a Guided Breathing Exercise',
    },
  },
  'Healthy stress relief': {
    id: '',
    content: "Finding healthy ways to manage stress is one of the best things you can do for yourself. Here are some science-backed techniques that can help you feel calmer and more in control:",
    isAI: true,
    copingCard: {
      title: "Quick Calm: 4-7-8 Breathing",
      steps: [
        "Inhale quietly through your nose for 4 seconds",
        "Hold your breath for 7 seconds",
        "Exhale completely through your mouth for 8 seconds",
        "Repeat 3-4 times whenever you feel stressed"
      ],
      actionLabel: 'Try a Guided Breathing Exercise',
    },
  },
  'default': {
    id: '',
    content: "Thanks for sharing that with me. I'm here to help you learn, cope, and make informed decisions — no judgment, just support. Would you like to explore healthy stress relief techniques, learn about a substance, or talk about handling social pressure?",
    isAI: true,
  },
}

export function ChatContainer() {
  const [messages, setMessages] = useState<Message[]>([welcomeMessage, userResponse, aiCopingResponse])
  const [isLoading, setIsLoading] = useState(false)

  const handleSendMessage = useCallback((content: string) => {
    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content,
      isAI: false,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }
    setMessages((prev) => [...prev, userMessage])

    // Simulate AI processing
    setIsLoading(true)
    setTimeout(() => {
      const responseTemplate = aiResponses[content] || aiResponses['default']
      const aiMessage: Message = {
        ...responseTemplate,
        id: `ai-${Date.now()}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }
      setMessages((prev) => [...prev, aiMessage])
      setIsLoading(false)
    }, 1500 + Math.random() * 1000)
  }, [])

  const handleChipClick = useCallback((message: string) => {
    handleSendMessage(message)
  }, [handleSendMessage])

  return (
    <div className="glass-panel rounded-2xl sm:rounded-3xl w-full max-w-3xl h-[calc(100vh-2rem)] sm:h-[calc(100vh-4rem)] max-h-[900px] flex flex-col overflow-hidden">
      <ChatHeader />
      <MessageList messages={messages} isLoading={isLoading} />
      <ActionChips onChipClick={handleChipClick} />
      <InputDock onSend={handleSendMessage} disabled={isLoading} />
    </div>
  )
}
