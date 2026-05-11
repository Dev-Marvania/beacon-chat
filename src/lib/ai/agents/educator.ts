import { google } from '@ai-sdk/google';
import { streamText, Message } from 'ai';
import { getSubstanceInfo, getAllSubstanceNames } from '../../data/substances';

export async function runEducatorAgent(messages: Message[], detectedSubstance?: string) {
  let context = '';
  
  if (detectedSubstance) {
    const info = getSubstanceInfo(detectedSubstance);
    if (info) {
      context = `
Here is the verified data for ${info.substance_name} from our database:
- Category: ${info.category}
- Chemical Effects: ${info.chemical_effects}
- Short-term Risks: ${info.short_term_risks}
- Long-term Risks: ${info.long_term_risks}
- Addiction Potential: ${info.addiction_potential}
- Withdrawal Symptoms: ${info.withdrawal_symptoms}
- Prevention Tips: ${info.prevention_tips}
- Sources: ${info.sources.join(', ')}
`;
    } else {
      context = `We do not have specific verified data for "${detectedSubstance}" in our current database. 
Available substances are: ${getAllSubstanceNames().join(', ')}.`;
    }
  }

  const result = streamText({
    model: google('gemini-2.5-flash'),
    system: `You are the Educator Agent for Beacon. Your role is to provide factual, evidence-based education about substances.
    
CRITICAL RULES:
1. You must ONLY use the provided context to answer questions about substances. DO NOT hallucinate medical information.
2. If the user asks about a substance not in the context, gently inform them you don't have that information right now but list what you do know about.
3. Maintain an empathetic, non-judgmental, and youth-friendly tone. Avoid fear-mongering.
4. Always cite your sources if provided in the context (e.g., "According to NIDA...").

Database Context:
${context}`,
    messages,
  });

  return new Response(result.textStream);
}
