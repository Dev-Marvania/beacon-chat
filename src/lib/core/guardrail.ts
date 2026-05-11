export interface GuardrailResult {
  safe: boolean;
  category?: 'CRISIS' | 'MEDICAL_EMERGENCY' | 'HIGH_RISK_WITHDRAWAL';
  ui_override?: {
    type: 'SOS_CARD';
    title: string;
    helpline: string;
    message: string;
  };
}

const CRISIS_KEYWORDS = [
  "kill myself", "suicide", "want to die", "end it all", "better off dead",
  "take my own life", "no reason to live", "overdose",
  "hurt myself", "cut myself", "self harm", "swallowed pills", "drank bleach", "jump off"
];

const MEDICAL_EMERGENCY_KEYWORDS = [
  "chest pain", "heart attack", "can't breathe", "seizure", "passing out",
  "unconscious", "blue lips", "won't wake up", "bleeding out", "severe pain"
];

const WITHDRAWAL_KEYWORDS = [
  "alcohol withdrawal", "delirium tremens", "dt's", "seizing from withdrawal",
  "benzo withdrawal", "xanax withdrawal"
];

export function checkGuardrail(input: string): GuardrailResult {
  const normalizedInput = input.toLowerCase();

  // 1. Check for Crisis/Self-Harm
  for (const keyword of CRISIS_KEYWORDS) {
    if (normalizedInput.includes(keyword)) {
      return {
        safe: false,
        category: 'CRISIS',
        ui_override: {
          type: 'SOS_CARD',
          title: 'You are not alone',
          helpline: '988',
          message: 'If you are experiencing a crisis, please reach out for immediate help. The Suicide & Crisis Lifeline is available 24/7. Call or text 988.'
        }
      };
    }
  }

  // 2. Check for Medical Emergency
  for (const keyword of MEDICAL_EMERGENCY_KEYWORDS) {
    if (normalizedInput.includes(keyword)) {
      return {
        safe: false,
        category: 'MEDICAL_EMERGENCY',
        ui_override: {
          type: 'SOS_CARD',
          title: 'Medical Emergency',
          helpline: '911',
          message: 'This sounds like a medical emergency. Please call 911 or go to the nearest emergency room immediately.'
        }
      };
    }
  }

  // 3. Check for High-Risk Withdrawal
  for (const keyword of WITHDRAWAL_KEYWORDS) {
    if (normalizedInput.includes(keyword)) {
      return {
        safe: false,
        category: 'HIGH_RISK_WITHDRAWAL',
        ui_override: {
          type: 'SOS_CARD',
          title: 'Medical Attention Required',
          helpline: '911',
          message: 'Withdrawal from certain substances like alcohol or benzodiazepines can be life-threatening. Please seek immediate medical supervision.'
        }
      };
    }
  }

  return { safe: true };
}
