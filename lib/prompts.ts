import { ValentineData } from "./valentine-data";

// Ship type descriptions
const SHIP_CONTEXTS = {
  crush: "someone you have a crush on but haven't confessed to yet",
  relationship: "your romantic partner in an established relationship",
  situationship: "someone you're in a complicated romantic situation with",
  brozone:
    "your bro/homie - keep it funny, casual, and full of good vibes while still showing you care",
};

// Boldness level instructions
const BOLDNESS_LEVELS = {
  safe: "Keep it sweet, wholesome, and appropriate for all audiences. Focus on genuine feelings and heartfelt emotions.",
  medium:
    "Add a little spice and playfulness. Be flirty and charming, but still tasteful.",
  unhinged:
    "Go all out! Be bold, passionate, and unapologetically intense. No holding back on the romance and desire.",
};

// Fantasy vs Raw modifiers (for unhinged messages)
const UNHINGED_STYLES = {
  fantasy: "romantic, dreamy, and poetic with vivid imagery",
  raw: "direct, intense, and passionate with bold honesty",
};

/**
 * Builds a complete prompt for the AI based on user selections
 */
export function buildPrompt(data: ValentineData): string {
  const { name, partnerName, shipType, messageType, fantasyOrRaw } = data;

  const shipContext = SHIP_CONTEXTS[shipType];
  const boldnessInstruction = BOLDNESS_LEVELS[messageType];

  let styleModifier = "";
  if (messageType === "unhinged" && fantasyOrRaw) {
    styleModifier = `Make it ${UNHINGED_STYLES[fantasyOrRaw]}.`;
  }

  // Special instructions for brozone
  const brozoneInstructions =
    shipType === "brozone"
      ? `\n\nBROZONE SPECIAL INSTRUCTIONS:
- Use casual, bro-like language and humor
- Include inside jokes, memes, or funny references if appropriate
- Keep it light and comedic while still being genuine
- Use phrases like "bro", "my guy", "homie", "insha'Allah" naturally
- Make them laugh while showing you appreciate them
- No overly sentimental stuff - keep it real and funny`
      : "";

  const prompt = `You are a creative Valentine's Day message writer. Write a heartfelt Valentine's message from ${name} to ${partnerName}.

Context: ${partnerName} is ${shipContext}.

Style: ${boldnessInstruction} ${styleModifier}${brozoneInstructions}

Requirements:
- Write in first person (from ${name}'s perspective)
- Make it personal and genuine
- Keep it to 2-4 paragraphs
- End with a sweet closing line
- Do NOT include "Dear ${partnerName}" or any greeting at the start
- Do NOT sign off with "${name}" at the end

Write the Valentine's message now:`;

  return prompt;
}

/**
 * Determines which API to use based on message type
 */
export function getApiEndpoint(
  messageType: ValentineData["messageType"],
): string {
  return messageType === "unhinged"
    ? "/api/generate-gpt4"
    : "/api/generate-gemini";
}
