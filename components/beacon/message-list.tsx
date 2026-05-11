'use client'

import { useEffect, useRef } from 'react'
import { ChatBubble } from './chat-bubble'
import { ResourceCard } from './resource-card'
import { CopingStrategyCard } from './coping-strategy-card'
import { LoadingIndicator } from './loading-indicator'

export interface Message {
  id: string
  content: string
  isAI: boolean
  timestamp?: string
  resourceCard?: {
    facilityName: string
    distance: string
    address?: string
    phone?: string
    availability?: string
  }
  copingCard?: {
    title: string
    steps: string[]
    actionLabel?: string
  }
}

interface MessageListProps {
  messages: Message[]
  isLoading: boolean
}

export function MessageList({ messages, isLoading }: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar px-4 sm:px-6 py-4">
      <div className="flex flex-col gap-4">
        {messages.map((message) => (
          <ChatBubble
            key={message.id}
            message={message.content}
            isAI={message.isAI}
            timestamp={message.timestamp}
          >
            {message.resourceCard && (
              <ResourceCard
                facilityName={message.resourceCard.facilityName}
                distance={message.resourceCard.distance}
                address={message.resourceCard.address}
                phone={message.resourceCard.phone}
                availability={message.resourceCard.availability}
              />
            )}
            {message.copingCard && (
              <CopingStrategyCard
                title={message.copingCard.title}
                steps={message.copingCard.steps}
                actionLabel={message.copingCard.actionLabel}
              />
            )}
          </ChatBubble>
        ))}
        
        {isLoading && <LoadingIndicator />}
        
        <div ref={bottomRef} />
      </div>
    </div>
  )
}
