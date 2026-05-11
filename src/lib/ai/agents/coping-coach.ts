import { google } from '@ai-sdk/google';
import { generateObject, Message } from 'ai';
import { z } from 'zod';

import { NextResponse } from 'next/server';

const copingSchema = z.object({
  message: z.string().describe('The empathetic response message to the user'),
  ui_component: z.enum(['CopingCard', 'BreathingExercise', 'DelayDistractCard']).describe('The type of interactive UI card to show'),
  card_data: z.object({
    title: z.string(),
    steps: z.array(z.object({
      step: z.number(),
      instruction: z.string(),
      duration: z.string().optional()
    })),
    encouragement: z.string()
  }).describe('Data to populate the selected UI component')
});

export async function runCopingCoachAgent(messages: Message[]) {
  const result = await generateObject({
    model: google('gemini-2.5-flash'),
    schema: copingSchema,
    system: `You are the Coping Coach Agent for Beacon.
Your role is to help users deal with peer pressure, cravings, and difficult situations by providing actionable, CBT-informed behavioral strategies.

You must respond with structured JSON that includes an empathetic message AND data for an interactive UI card.
Choose the best UI component based on the user's need:
- 'DelayDistractCard': Best for peer pressure or immediate cravings.
- 'BreathingExercise': Best for anxiety or panic.
- 'CopingCard': General coping strategies.`,
    messages: messages.slice(-5),
  });

  return NextResponse.json({
    type: 'ui_component',
    data: result.object
  });
}
