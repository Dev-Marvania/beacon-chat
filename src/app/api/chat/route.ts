import { NextRequest, NextResponse } from 'next/server';
import { Message } from 'ai';
import { checkGuardrail } from '@/lib/core/guardrail';
import { memoryStore } from '@/lib/core/memory';
import { routeIntent } from '@/lib/ai/agents/supervisor';
import { runEducatorAgent } from '@/lib/ai/agents/educator';
import { runCopingCoachAgent } from '@/lib/ai/agents/coping-coach';
import { runSupportAgent } from '@/lib/ai/agents/support';

export const maxDuration = 60;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const messages: Message[] = body.messages;
    const sessionId: string = body.sessionId;
    const latestMessage = messages[messages.length - 1];

    if (!sessionId) {
      return NextResponse.json({ error: 'Session ID is required' }, { status: 400 });
    }

    if (!latestMessage) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // 1. Semantic Guardrail Check
    const guardrailResult = checkGuardrail(latestMessage.content);
    if (!guardrailResult.safe && guardrailResult.ui_override) {
      const aiMessage: Message = {
        id: `sos-${Date.now()}`,
        role: 'assistant',
        content: guardrailResult.ui_override.message,
      };
      memoryStore.addMessages(sessionId, [latestMessage, aiMessage]);

      return NextResponse.json({
        type: 'guardrail_trigger',
        data: guardrailResult.ui_override
      });
    }

    // 2. Memory Retrieval
    const history = memoryStore.getHistory(sessionId);
    const currentMessages = [...history, latestMessage];

    // 3. Supervisor Routing
    const routing = await routeIntent(currentMessages);
    console.log('[Supervisor Routing]:', routing);

    memoryStore.addMessages(sessionId, [latestMessage]);

    // 4. Delegate to agent
    switch (routing.intent) {
      case 'EDUCATOR':
        return await runEducatorAgent(currentMessages, routing.detected_substance);
        
      case 'COPING_COACH':
        return await runCopingCoachAgent(currentMessages);
        
      case 'GREETING':
        return await runSupportAgent(currentMessages, true);
        
      case 'GENERAL_SUPPORT':
      default:
        return await runSupportAgent(currentMessages, false);
    }

  } catch (error: any) {
    console.error('[Chat API Error]:', error);
    return NextResponse.json({ 
      error: 'Failed to process chat request', 
      details: error?.message || String(error) 
    }, { status: 500 });
  }
}
