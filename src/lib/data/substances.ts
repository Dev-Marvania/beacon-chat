export interface SubstanceEntry {
  substance_name: string;
  street_names: string[];
  category: string;
  chemical_effects: string;
  short_term_risks: string;
  long_term_risks: string;
  addiction_potential: string;
  withdrawal_symptoms: string;
  prevention_tips: string;
  sources: string[];
}

export const substancesData: SubstanceEntry[] = [
  {
    substance_name: "Alcohol",
    street_names: ["Booze", "Liquor", "Juice", "Sauce"],
    category: "Depressant",
    chemical_effects: "Slows down brain function and neural activity. Affects GABA and glutamate neurotransmitters.",
    short_term_risks: "Impaired judgment, loss of coordination, slurred speech, alcohol poisoning, memory lapses.",
    long_term_risks: "Liver disease (cirrhosis), heart problems, increased cancer risk, neurological damage, dependency.",
    addiction_potential: "High",
    withdrawal_symptoms: "Tremors, anxiety, nausea, sweating, seizures (in severe cases like delirium tremens).",
    prevention_tips: "Engage in alcohol-free social activities, learn to say no confidently, understand the legal and health consequences.",
    sources: ["National Institute on Drug Abuse (NIDA)", "Centers for Disease Control and Prevention (CDC)"]
  },
  {
    substance_name: "Cannabis",
    street_names: ["Weed", "Pot", "Marijuana", "Grass", "Herb", "Mary Jane"],
    category: "Depressant/Hallucinogen",
    chemical_effects: "THC binds to cannabinoid receptors in the brain, altering mood, memory, and perception.",
    short_term_risks: "Altered senses, changes in mood, impaired body movement, difficulty with thinking and problem-solving, impaired memory.",
    long_term_risks: "Potential cognitive impairment, breathing problems if smoked, potential development of cannabinoid hyperemesis syndrome.",
    addiction_potential: "Moderate",
    withdrawal_symptoms: "Irritability, sleep difficulties, decreased appetite, cravings, restlessness.",
    prevention_tips: "Find healthy ways to manage stress, educate yourself on the developing brain, choose friends who respect your decision not to use.",
    sources: ["National Institute on Drug Abuse (NIDA)"]
  },
  {
    substance_name: "Cocaine",
    street_names: ["Coke", "Blow", "Snow", "Powder", "Crack"],
    category: "Stimulant",
    chemical_effects: "Increases dopamine levels in brain circuits related to pleasure and movement, preventing dopamine recycling.",
    short_term_risks: "Extreme energy, mental alertness, hypersensitivity to sight/sound/touch, irritability, paranoia, rapid heart rate.",
    long_term_risks: "Loss of sense of smell, nosebleeds, frequent runny nose, problems with swallowing, increased risk of stroke and heart attack.",
    addiction_potential: "Very High",
    withdrawal_symptoms: "Depression, fatigue, increased appetite, unpleasant dreams, insomnia, slowed thinking.",
    prevention_tips: "Avoid environments where drug use is normalized, build strong supportive relationships, seek professional help for underlying mental health issues.",
    sources: ["National Institute on Drug Abuse (NIDA)"]
  },
  {
    substance_name: "Fentanyl",
    street_names: ["Apache", "Dance Fever", "Friend", "Goodfellas", "Jackpot", "Murder 8", "Tango & Cash"],
    category: "Synthetic Opioid",
    chemical_effects: "Binds to the body's opioid receptors, which control pain and emotions, driving up dopamine levels.",
    short_term_risks: "Extreme happiness, drowsiness, nausea, confusion, constipation, sedation, problems breathing, unconsciousness.",
    long_term_risks: "Severe addiction, chronic constipation, weakened immune system, persistent breathing problems, high risk of fatal overdose.",
    addiction_potential: "Very High",
    withdrawal_symptoms: "Muscle and bone pain, sleep problems, diarrhea and vomiting, cold flashes with goose bumps, severe cravings.",
    prevention_tips: "Never take pills not prescribed to you by a doctor. Understand that fentanyl is often secretly mixed into other drugs. Carry naloxone (Narcan).",
    sources: ["National Institute on Drug Abuse (NIDA)", "Substance Abuse and Mental Health Services Administration (SAMHSA)"]
  },
  {
    substance_name: "Methamphetamine",
    street_names: ["Meth", "Crystal", "Ice", "Glass", "Speed", "Chalk"],
    category: "Stimulant",
    chemical_effects: "Forces the release of high levels of dopamine into the reward circuits of the brain.",
    short_term_risks: "Increased wakefulness and physical activity, decreased appetite, rapid breathing, rapid/irregular heartbeat, increased blood pressure.",
    long_term_risks: "Extreme weight loss, severe dental problems ('meth mouth'), intense itching leading to skin sores, anxiety, confusion, memory loss, violent behavior, paranoia, hallucinations.",
    addiction_potential: "Very High",
    withdrawal_symptoms: "Anxiety, fatigue, severe depression, psychosis, intense drug cravings.",
    prevention_tips: "Educate yourself about the severe, rapid physical and mental decline associated with meth use. Seek immediate help if exposed.",
    sources: ["National Institute on Drug Abuse (NIDA)"]
  }
];

export function getSubstanceInfo(name: string): SubstanceEntry | undefined {
  const normalizedQuery = name.toLowerCase().trim();
  return substancesData.find(sub => 
    sub.substance_name.toLowerCase() === normalizedQuery || 
    sub.street_names.some(street => street.toLowerCase() === normalizedQuery)
  );
}

export function getAllSubstanceNames(): string[] {
  return substancesData.map(sub => sub.substance_name);
}
