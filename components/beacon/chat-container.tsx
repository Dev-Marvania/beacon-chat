'use client'

import { useState, useCallback } from 'react'
import { ChatHeader } from './chat-header'
import { MessageList, type Message } from './message-list'
import { ActionChips } from './action-chips'
import { InputDock } from './input-dock'

const welcomeMessage: Message = {
  id: '1',
  content: "Welcome to Beacon. This is a secure, anonymous space. To make sure I get you the right kind of support immediately, tell me what brings you here today?",
  isAI: true,
  timestamp: 'Just now',
}

// Pre-populated user response for demo
const userResponse: Message = {
  id: '2',
  content: "Find local support resources",
  isAI: false,
  timestamp: 'Just now',
}

// Pre-populated AI response with resource card
const aiResourceResponse: Message = {
  id: '3',
  content: "I found a highly-rated recovery center near you. This information comes from our verified database of licensed facilities:",
  isAI: true,
  timestamp: 'Just now',
  resourceCard: {
    facilityName: 'Hope Valley Recovery Center',
    distance: '2.4 miles away',
    address: '1847 Serenity Lane, Suite 300',
    phone: '(555) 789-0123',
    availability: 'Open 24/7 • Accepting New Patients',
  },
}

// Simulated AI responses for demo
const aiResponses: Record<string, Message> = {
  'I need help right now': {
    id: '',
    content: "I hear you, and I'm glad you reached out. You're not alone in this moment. Take a slow, deep breath with me. Can you tell me a bit more about what you're experiencing right now? I'm here to listen without judgment.",
    isAI: true,
  },
  'Find local support resources': {
    id: '',
    content: "I found a highly-rated recovery center near you. This information comes from our verified database of licensed facilities:",
    isAI: true,
    resourceCard: {
      facilityName: 'Hope Valley Recovery Center',
      distance: '2.4 miles away',
      address: '1847 Serenity Lane, Suite 300',
      phone: '(555) 789-0123',
      availability: 'Open 24/7 • Accepting New Patients',
    },
  },
  'I want to help a loved one': {
    id: '',
    content: "It takes courage to seek help for someone you care about. Supporting a loved one through addiction is challenging, but your presence matters more than you know. Let me share some approaches that have helped others in your situation...",
    isAI: true,
  },
  'default': {
    id: '',
    content: "Thank you for sharing that with me. I want you to know that whatever you're going through, reaching out is an important first step. Would you like me to help you find local support resources, or would you prefer to talk through what's on your mind?",
    isAI: true,
  },
}

export function ChatContainer() {
  const [messages, setMessages] = useState<Message[]>([welcomeMessage, userResponse, aiResourceResponse])
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
