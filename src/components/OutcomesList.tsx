import React from 'react';
import { Outcome, Proficiency } from '../types';

interface OutcomesListProps {
  outcomes: Outcome[];
  onOutcomeDelete: (outcomeId: string) => void;
  onOutcomeUpdate: (outcomeId: string, proficiency: Proficiency) => void;
}

const proficiencyColors = {
  'Advanced': 'bg-green-100 text-green-800 border-green-200',
  'Proficient': 'bg-blue-100 text-blue-800 border-blue-200',
  'Developing': 'bg-yellow-100 text-yellow-800 border-yellow-200',
  'Not Yet': 'bg-red-100 text-red-800 border-red-200'
};

export const OutcomesList: React.FC<OutcomesListProps> = ({
  outcomes,
  onOutcomeDelete,
  onOutcomeUpdate
}) => {
  if (outcomes.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Outcomes</h3>
        <p className="text-gray-500 text-center py-4">
          No outcomes added yet. Use the input form above to add your AWE outcomes.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-900">Outcomes ({outcomes.length})</h3>
      </div>

      <div className="space-y-2">
        {outcomes.map((outcome) => (
          <div
            key={outcome.id}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors"
          >
            <div className="flex-1">
              <span className="text-sm font-medium text-gray-900">{outcome.name}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <select
                value={outcome.proficiency}
                onChange={(e) => onOutcomeUpdate(outcome.id, e.target.value as Proficiency)}
                className="px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="Advanced">Advanced</option>
                <option value="Proficient">Proficient</option>
                <option value="Developing">Developing</option>
                <option value="Not Yet">Not Yet</option>
              </select>
              
              <span
                className={`px-2 py-1 text-xs font-medium rounded border ${proficiencyColors[outcome.proficiency]}`}
              >
                {outcome.proficiency}
              </span>
              
              <button
                onClick={() => onOutcomeDelete(outcome.id)}
                className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                title="Delete outcome"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
