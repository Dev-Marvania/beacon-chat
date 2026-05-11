import { google } from '@ai-sdk/google';
import { generateObject, Message } from 'ai';
import { z } from 'zod';

const routingSchema = z.object({
  intent: z.enum(['EDUCATOR', 'COPING_COACH', 'GENERAL_SUPPORT', 'GREETING']),
  confidence: z.number().describe('Confidence level between 0 and 1'),
  detected_substance: z.string().optional().describe('Any specific drug/substance mentioned'),
  detected_concern: z.string().optional().describe('Main concern like peer pressure, anxiety, etc.'),
  reasoning: z.string().describe('Explanation for the routing decision')
});

export async function routeIntent(messages: Message[]) {
  const recentMessages = messages.slice(-3);
  
  const result = await generateObject({
    model: google('gemini-2.5-flash'),
    schema: routingSchema,
    system: `You are the Supervisor Router Node for Beacon, a substance abuse prevention chatbot.
Your job is to analyze the user's latest input and route them to the appropriate specialized agent.

Agents:
- EDUCATOR: Use when the user asks factual questions about drugs, effects, risks, or addiction.
- COPING_COACH: Use when the user asks for strategies to handle peer pressure, cravings, or needs a coping mechanism.
- GENERAL_SUPPORT: Use for emotional support, expressions of anxiety, or general check-ins.
- GREETING: Use for "hi", "hello", "what can you do?", etc.

Extract any mentioned substances or concerns if present.`,
    messages: recentMessages,
  });

  return result.object;
}
