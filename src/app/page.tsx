import { ChatContainer } from '@/components/features/chat/container/chat-container'

export default function BeaconPage() {
  return (
    <main className="mesh-background min-h-screen w-full flex items-center justify-center p-4 sm:p-8">
      {/* Noise Texture Overlay */}
      <div className="noise-overlay" aria-hidden="true" />
      
      {/* Main Chat Interface */}
      <ChatContainer />
    </main>
  )
}
