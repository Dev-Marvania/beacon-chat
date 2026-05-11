'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import { ChatHeader } from './chat-header'
import { MessageList, type Message } from '../messages/message-list'
import { ActionChips } from '../input/action-chips'
import { InputDock } from '../input/input-dock'

const welcomeMessage: Message = {
  id: '1',
  content: "Welcome to Beacon. This is a secure, anonymous space. To make sure I get you the right kind of support immediately, tell me what brings you here today?",
  isAI: true,
  // Timestamp is omitted here to prevent SSR hydration mismatch
}

export function ChatContainer() {
  const [messages, setMessages] = useState<Message[]>([welcomeMessage])
  const [isLoading, setIsLoading] = useState(false)
  const sessionIdRef = useRef<string>('')

  useEffect(() => {
    // Generate an ephemeral session ID on mount
    sessionIdRef.current = crypto.randomUUID()
    
    // Hydrate the welcome message timestamp purely on the client
    setMessages(prev => prev.map(msg => 
      msg.id === '1' 
        ? { ...msg, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) } 
        : msg
    ))
  }, [])

  const handleSendMessage = useCallback(async (content: string) => {
    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content,
      isAI: false,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }
    
    // We prepare an empty AI message ID that we will stream into
    const aiMessageId = `ai-${Date.now()}`
    
    setMessages((prev) => [
      ...prev, 
      userMessage
    ])

    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId: sessionIdRef.current,
          messages: [{ id: `user-${Date.now()}`, role: 'user', content }]
        })
      })

      if (!response.ok) {
        const errText = await response.text()
        console.error("Backend Error Response:", errText)
        throw new Error('Failed to send message: ' + errText)
      }

      setIsLoading(false)

      const contentType = response.headers.get('content-type')

      if (contentType && contentType.includes('application/json')) {
        // This is a structured UI response (Guardrail or Coping Coach)
        const jsonResponse = await response.json()
        
        if (jsonResponse.type === 'guardrail_trigger') {
          setMessages(prev => [...prev, {
            id: aiMessageId,
            content: jsonResponse.data.message,
            isAI: true,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            uiComponent: {
              type: 'SOSCard',
              data: jsonResponse.data
            }
          }])
        } else if (jsonResponse.type === 'ui_component') {
          setMessages(prev => [...prev, {
            id: aiMessageId,
            content: jsonResponse.data.message,
            isAI: true,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            uiComponent: {
              type: jsonResponse.data.ui_component,
              data: jsonResponse.data.card_data
            }
          }])
        }
      } else {
        // This is a raw text stream
        const reader = response.body?.getReader()
        const decoder = new TextDecoder()
        
        setMessages(prev => [...prev, {
          id: aiMessageId,
          content: '',
          isAI: true,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        }])

        if (reader) {
          while (true) {
            const { value, done } = await reader.read()
            if (done) break
            
            const chunk = decoder.decode(value, { stream: true })
            setMessages(prev => prev.map(msg => 
              msg.id === aiMessageId 
                ? { ...msg, content: msg.content + chunk }
                : msg
            ))
          }
        }
      }

    } catch (error) {
      console.error(error)
      setIsLoading(false)
      // Show error message
      setMessages(prev => [...prev, {
        id: `err-${Date.now()}`,
        content: "I'm having trouble connecting right now. Please try again in a moment.",
        isAI: true,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }])
    }
  }, [])

  const handleChipClick = useCallback((message: string) => {
    handleSendMessage(message)
  }, [handleSendMessage])

  const handleSOSClick = useCallback(() => {
    handleSendMessage('I am experiencing a crisis or overdose and need immediate emergency SOS support.')
  }, [handleSendMessage])

  return (
    <div className="glass-panel rounded-2xl sm:rounded-3xl w-full max-w-3xl h-[calc(100vh-2rem)] sm:h-[calc(100vh-4rem)] max-h-[900px] flex flex-col overflow-hidden">
      <ChatHeader onSOSClick={handleSOSClick} />
      <MessageList messages={messages} isLoading={isLoading} />
      <ActionChips onChipClick={handleChipClick} />
      <InputDock onSend={handleSendMessage} disabled={isLoading} />
    </div>
  )
}
