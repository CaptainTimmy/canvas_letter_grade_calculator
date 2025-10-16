import { Outcome, Proficiency } from '../types';
import { generateOutcomeId } from './storage';

// Regex to match Canvas format: "16 Reading (12.6)" followed by "Advanced" (Final Proficiency)
const CANVAS_OUTCOME_REGEX = /^(\d+\s+.+?)\s*$/;
const FINAL_PROFICIENCY_REGEX = /^(Advanced|Proficient|Developing|Not Yet)$/i;

// Legacy format: "Reading 2.1 - Advanced"
const LEGACY_OUTCOME_REGEX = /^(.+?)\s*-\s*(Advanced|Proficient|Developing|Not Yet)$/i;

export const parseOutcomeText = (text: string): Outcome[] => {
  const lines = text.split('\n').map(line => line.trim()).filter(line => line.length > 0);
  const outcomes: Outcome[] = [];
  
  let currentOutcomeName = '';
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Check if this line matches Canvas outcome format (e.g., "16 Reading (12.6)")
    const canvasMatch = line.match(CANVAS_OUTCOME_REGEX);
    if (canvasMatch) {
      currentOutcomeName = canvasMatch[1].trim();
      continue;
    }
    
    // Check if this line is a Final Proficiency word
    const proficiencyMatch = line.match(FINAL_PROFICIENCY_REGEX);
    if (proficiencyMatch && currentOutcomeName) {
      outcomes.push({
        id: generateOutcomeId(),
        name: currentOutcomeName,
        proficiency: proficiencyMatch[1] as Proficiency
      });
      currentOutcomeName = ''; // Reset for next outcome
      continue;
    }
    
    // Check for legacy format (e.g., "Reading 2.1 - Advanced")
    const legacyMatch = line.match(LEGACY_OUTCOME_REGEX);
    if (legacyMatch) {
      const [, name, proficiency] = legacyMatch;
      outcomes.push({
        id: generateOutcomeId(),
        name: name.trim(),
        proficiency: proficiency as Proficiency
      });
      continue;
    }
    
    // Skip individual assignment grades (P, A, NY, D) and other non-outcome lines
    // These are ignored as they don't contribute to the final grade
  }

  return outcomes;
};

export const isValidOutcomeFormat = (text: string): boolean => {
  const lines = text.split('\n').map(line => line.trim()).filter(line => line.length > 0);
  
  // Check if it's Canvas format (has outcome names followed by Final Proficiency words)
  let hasCanvasFormat = false;
  let hasFinalProficiency = false;
  
  for (const line of lines) {
    if (CANVAS_OUTCOME_REGEX.test(line)) {
      hasCanvasFormat = true;
    }
    if (FINAL_PROFICIENCY_REGEX.test(line)) {
      hasFinalProficiency = true;
    }
  }
  
  // Check if it's legacy format
  const hasLegacyFormat = lines.some(line => LEGACY_OUTCOME_REGEX.test(line));
  
  return hasLegacyFormat || (hasCanvasFormat && hasFinalProficiency);
};
