import { Outcome, ProficiencyCounts, ProficiencyPercentages } from '../types';

export const calculateProficiencyCounts = (outcomes: Outcome[]): ProficiencyCounts => {
  const counts: ProficiencyCounts = {
    adv: 0,
    prof: 0,
    dev: 0,
    ny: 0,
    total: outcomes.length
  };

  outcomes.forEach(outcome => {
    switch (outcome.proficiency) {
      case 'Advanced':
        counts.adv++;
        break;
      case 'Proficient':
        counts.prof++;
        break;
      case 'Developing':
        counts.dev++;
        break;
      case 'Not Yet':
        counts.ny++;
        break;
    }
  });

  return counts;
};

export const calculateProficiencyPercentages = (counts: ProficiencyCounts): ProficiencyPercentages => {
  if (counts.total === 0) {
    return { adv: 0, prof: 0, dev: 0, ny: 0 };
  }

  return {
    adv: counts.adv / counts.total,
    prof: counts.prof / counts.total,
    dev: counts.dev / counts.total,
    ny: counts.ny / counts.total
  };
};

export const calculateGrade = (outcomes: Outcome[]): string => {
  if (outcomes.length === 0) {
    return 'No Data';
  }

  const counts = calculateProficiencyCounts(outcomes);
  const percentages = calculateProficiencyPercentages(counts);
  
  const advAndProf = (counts.adv + counts.prof) / counts.total;

  // Algorithm from the provided screenshot
  if (advAndProf === 1) {
    // If only advanced and proficient grades
    if (percentages.adv >= 0.5) {
      return 'A';
    } else if (percentages.adv >= 0.2) {
      return 'A-';
    } else {
      return 'B+';
    }
  } else if (percentages.ny === 0) {
    // If only advanced, proficient and developing grade
    if (advAndProf >= 0.6) {
      return 'B';
    } else if (advAndProf >= 0.5) {
      return 'B-';
    } else if (advAndProf >= 0.2) {
      return 'C+';
    } else {
      return 'C';
    }
  } else if (percentages.ny > 0) {
    // If there is at least one Not Yet grade
    if (percentages.ny < 0.2) {
      return 'C-';
    } else {
      return 'Warning';
    }
  }

  return 'Unknown';
};

export const getGradeColor = (grade: string): string => {
  switch (grade) {
    case 'A':
    case 'A-':
      return 'text-green-600 bg-green-50 border-green-200';
    case 'B+':
    case 'B':
    case 'B-':
      return 'text-blue-600 bg-blue-50 border-blue-200';
    case 'C+':
    case 'C':
    case 'C-':
      return 'text-orange-600 bg-orange-50 border-orange-200';
    case 'Warning':
      return 'text-red-600 bg-red-50 border-red-200';
    default:
      return 'text-gray-600 bg-gray-50 border-gray-200';
  }
};
