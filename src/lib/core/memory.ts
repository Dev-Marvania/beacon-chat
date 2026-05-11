import { Message } from 'ai';

interface SessionData {
  messages: Message[];
  lastAccess: number;
}

class EphemeralMemory {
  private store: Map<string, SessionData> = new Map();
  private TTL = 30 * 60 * 1000; // 30 minutes

  constructor() {
    // Run cleanup every 5 minutes
    if (typeof setInterval !== 'undefined') {
      setInterval(() => this.cleanup(), 5 * 60 * 1000);
    }
  }

  getHistory(sessionId: string): Message[] {
    const session = this.store.get(sessionId);
    if (session) {
      session.lastAccess = Date.now();
      return session.messages;
    }
    return [];
  }

  addMessages(sessionId: string, newMessages: Message[]) {
    const session = this.store.get(sessionId);
    if (session) {
      session.messages.push(...newMessages);
      session.lastAccess = Date.now();
    } else {
      this.store.set(sessionId, {
        messages: newMessages,
        lastAccess: Date.now()
      });
    }
  }

  private cleanup() {
    const now = Date.now();
    for (const [sessionId, data] of this.store.entries()) {
      if (now - data.lastAccess > this.TTL) {
        this.store.delete(sessionId);
      }
    }
  }
}

// Singleton instance
export const memoryStore = new EphemeralMemory();
