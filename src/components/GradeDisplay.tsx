import React from 'react';
import { Outcome } from '../types';
import { calculateGrade, getGradeColor, calculateProficiencyCounts, calculateProficiencyPercentages } from '../utils/gradeCalculator';

interface GradeDisplayProps {
  outcomes: Outcome[];
}

export const GradeDisplay: React.FC<GradeDisplayProps> = ({ outcomes }) => {
  const grade = calculateGrade(outcomes);
  const counts = calculateProficiencyCounts(outcomes);
  const percentages = calculateProficiencyPercentages(counts);
  const colorClasses = getGradeColor(grade);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Grade Calculation</h3>
      
      {outcomes.length === 0 ? (
        <div className="text-center py-8">
          <div className="text-6xl font-bold text-gray-300 mb-2">?</div>
          <p className="text-gray-500">Add outcomes to calculate your grade</p>
        </div>
      ) : (
        <div className="text-center">
          <div className={`inline-block px-8 py-6 rounded-lg border-2 ${colorClasses} mb-6`}>
            <div className="text-6xl font-bold">{grade}</div>
            <div className="text-sm font-medium mt-1">Letter Grade</div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="bg-green-50 p-3 rounded-md border border-green-200">
              <div className="font-semibold text-green-800">Advanced</div>
              <div className="text-green-600">{counts.adv} ({Math.round(percentages.adv * 100)}%)</div>
            </div>
            <div className="bg-blue-50 p-3 rounded-md border border-blue-200">
              <div className="font-semibold text-blue-800">Proficient</div>
              <div className="text-blue-600">{counts.prof} ({Math.round(percentages.prof * 100)}%)</div>
            </div>
            <div className="bg-yellow-50 p-3 rounded-md border border-yellow-200">
              <div className="font-semibold text-yellow-800">Developing</div>
              <div className="text-yellow-600">{counts.dev} ({Math.round(percentages.dev * 100)}%)</div>
            </div>
            <div className="bg-red-50 p-3 rounded-md border border-red-200">
              <div className="font-semibold text-red-800">Not Yet</div>
              <div className="text-red-600">{counts.ny} ({Math.round(percentages.ny * 100)}%)</div>
            </div>
          </div>

          <div className="mt-4 text-sm text-gray-600">
            <p>Total Outcomes: {counts.total}</p>
            <p>Advanced + Proficient: {counts.adv + counts.prof} ({Math.round((counts.adv + counts.prof) / counts.total * 100)}%)</p>
          </div>
        </div>
      )}
    </div>
  );
};
