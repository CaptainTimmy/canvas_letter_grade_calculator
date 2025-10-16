import { AppData, Subject } from '../types';

const STORAGE_KEY = 'grade-calculator-data';

export const loadData = (): AppData => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    console.log('Loading data from localStorage:', stored);
    if (stored) {
      const parsed = JSON.parse(stored);
      console.log('Parsed data:', parsed);
      return parsed;
    }
  } catch (error) {
    console.error('Error loading data from localStorage:', error);
  }
  
  console.log('No stored data found, returning default');
  return {
    subjects: {},
    currentSubjectId: null
  };
};

export const saveData = (data: AppData): void => {
  try {
    const dataToSave = JSON.stringify(data);
    localStorage.setItem(STORAGE_KEY, dataToSave);
    console.log('Data saved to localStorage:', dataToSave);
  } catch (error) {
    console.error('Error saving data to localStorage:', error);
  }
};

export const createSubject = (name: string): Subject => {
  return {
    id: Date.now().toString(),
    name,
    outcomes: []
  };
};

export const generateOutcomeId = (): string => {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
};
