export type Proficiency = 'Advanced' | 'Proficient' | 'Developing' | 'Not Yet';

export interface Outcome {
  id: string;
  name: string;
  proficiency: Proficiency;
}

export interface Subject {
  id: string;
  name: string;
  outcomes: Outcome[];
}

export interface AppData {
  subjects: { [id: string]: Subject };
  currentSubjectId: string | null;
}

export interface ProficiencyCounts {
  adv: number;
  prof: number;
  dev: number;
  ny: number;
  total: number;
}

export interface ProficiencyPercentages {
  adv: number;
  prof: number;
  dev: number;
  ny: number;
}
