import React, { useState } from 'react';
import { parseOutcomeText, isValidOutcomeFormat } from '../utils/outcomeParser';
import { Outcome } from '../types';

interface OutcomeInputProps {
  onOutcomesAdd: (outcomes: Outcome[]) => void;
}

export const OutcomeInput: React.FC<OutcomeInputProps> = ({ onOutcomesAdd }) => {
  const [inputText, setInputText] = useState('');
  const [isValid, setIsValid] = useState(true);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setInputText(text);
    setIsValid(text === '' || isValidOutcomeFormat(text));
  };

  const handleParse = () => {
    if (inputText.trim() && isValid) {
      const outcomes = parseOutcomeText(inputText);
      if (outcomes.length > 0) {
        onOutcomesAdd(outcomes);
        setInputText('');
      }
    }
  };

  const handleClear = () => {
    setInputText('');
    setIsValid(true);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-3">Add AWE Outcomes</h3>
      
      <div className="mb-3">
        <label htmlFor="outcome-input" className="block text-sm font-medium text-gray-700 mb-2">
          Paste your outcomes (one per line):
        </label>
        <textarea
          id="outcome-input"
          value={inputText}
          onChange={handleTextChange}
          placeholder="Reading 2.1 - Advanced&#10;Writing 2.2 - Proficient&#10;Math 3.1 - Developing"
          className={`w-full h-32 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            isValid ? 'border-gray-300' : 'border-red-300'
          }`}
        />
        {!isValid && inputText.trim() && (
          <p className="text-sm text-red-600 mt-1">
            Please use the format: "Outcome Name - Proficiency Level"
          </p>
        )}
      </div>

      <div className="text-sm text-gray-600 mb-3">
        <p className="font-medium">Supported Formats:</p>
        <div className="mt-2">
          <p className="font-medium text-gray-700">Canvas Format (copy directly):</p>
          <div className="bg-gray-100 p-2 rounded text-xs font-mono mt-1">
            16 Reading (12.6)<br/>
            P<br/>
            18 Public Speaking (12.1)<br/>
            P<br/>
            <strong>Proficient</strong><br/>
            41 Civilizations (12.1)<br/>
            A<br/>
            <strong>Advanced</strong>
          </div>
        </div>
        <div className="mt-2">
          <p className="font-medium text-gray-700">Legacy Format:</p>
          <p>• Reading 2.1 - Advanced</p>
          <p>• Writing 2.2 - Proficient</p>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Only Final Proficiency words (Advanced, Proficient, Developing, Not Yet) are used for grading.
        </p>
      </div>

      <div className="flex gap-2">
        <button
          onClick={handleParse}
          disabled={!inputText.trim() || !isValid}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          Add Outcomes
        </button>
        <button
          onClick={handleClear}
          className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
        >
          Clear
        </button>
      </div>
    </div>
  );
};
