import React, { useState } from 'react';

export const Tutorial: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full text-left"
      >
        <h3 className="text-lg font-semibold text-gray-900">
          📚 How to Use the Grade Calculator
        </h3>
        <svg
          className={`w-5 h-5 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="mt-4 space-y-4 text-sm text-gray-700">
          {/* Step 1 */}
          <div className="border-l-4 border-blue-500 pl-4">
            <h4 className="font-semibold text-gray-900 mb-2">1. Create a Subject</h4>
            <p>Click "New Subject" and enter a subject name (e.g., "Math", "English", "Science"). This helps you organize your grades by subject.</p>
          </div>

          {/* Step 2 */}
          <div className="border-l-4 border-green-500 pl-4">
            <h4 className="font-semibold text-gray-900 mb-2">2. Add Your AWE Outcomes</h4>
            <p>Paste your Canvas grades directly! The app will automatically extract the Final Proficiency levels.</p>
            
            <div className="bg-gray-100 p-3 rounded-md mt-2 font-mono text-xs">
              <div className="text-gray-600 mb-2">Canvas Format (copy directly):</div>
              16 Reading (12.6)<br/>
              P<br/>
              16 Reading (8.3)<br/>
              D<br/>
              18 Public Speaking (12.1)<br/>
              P<br/>
              18 Public Speaking (12.2)<br/>
              NY<br/>
              D<br/>
              <strong>Proficient</strong><br/>
              19 Discussion (12.2)<br/>
              P<br/>
              P<br/>
              <strong>Proficient</strong><br/>
              41 Civilizations (12.1)<br/>
              A<br/>
              <strong>Advanced</strong>
            </div>
            
            <div className="bg-blue-50 p-3 rounded-md mt-2 font-mono text-xs">
              <div className="text-blue-800 mb-2">Legacy Format (also supported):</div>
              Reading 2.1 - Advanced<br/>
              Writing 2.2 - Proficient<br/>
              Math 3.1 - Developing<br/>
              Science 1.3 - Not Yet
            </div>
            
            <p className="mt-2 text-sm text-gray-600">
              <strong>Note:</strong> Only the Final Proficiency words (Advanced, Proficient, Developing, Not Yet) are used for grade calculation. Individual assignment grades (P, A, NY, D) are ignored.
            </p>
          </div>

          {/* Step 3 */}
          <div className="border-l-4 border-yellow-500 pl-4">
            <h4 className="font-semibold text-gray-900 mb-2">3. View Your Grade</h4>
            <p>Your letter grade will appear automatically! The calculator uses this algorithm:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li><strong>Only Advanced & Proficient:</strong> A (≥50% Advanced), A- (≥20% Advanced), B+ (&lt;20% Advanced)</li>
              <li><strong>No "Not Yet" grades:</strong> B (≥60% Advanced+Proficient), B- (≥50%), C+ (≥20%), C (&lt;20%)</li>
              <li><strong>Any "Not Yet" grades:</strong> C- (&lt;20% Not Yet), Warning (≥20% Not Yet)</li>
            </ul>
          </div>

          {/* Step 4 */}
          <div className="border-l-4 border-purple-500 pl-4">
            <h4 className="font-semibold text-gray-900 mb-2">4. Manage Your Data</h4>
            <ul className="list-disc list-inside space-y-1">
              <li><strong>Edit outcomes:</strong> Click the dropdown next to any outcome to change its proficiency level</li>
              <li><strong>Delete outcomes:</strong> Click the trash icon to remove an outcome</li>
              <li><strong>Switch subjects:</strong> Click on any subject name in the left panel</li>
              <li><strong>Rename subjects:</strong> Click "Edit" next to a subject name</li>
              <li><strong>Delete subjects:</strong> Click "Delete" next to a subject name</li>
            </ul>
          </div>

          {/* Tips */}
          <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
            <h4 className="font-semibold text-blue-900 mb-2">💡 Pro Tips</h4>
            <ul className="list-disc list-inside space-y-1 text-blue-800">
              <li>All your data is saved automatically in your browser</li>
              <li>You can create multiple subjects to track different classes</li>
              <li>The app works offline after the first load</li>
              <li>Data stays private - it never leaves your device</li>
              <li>You can copy and paste large lists of outcomes at once</li>
            </ul>
          </div>

          {/* Troubleshooting */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
            <h4 className="font-semibold text-yellow-900 mb-2">🔧 Troubleshooting</h4>
            <ul className="list-disc list-inside space-y-1 text-yellow-800">
              <li><strong>Outcomes not parsing?</strong> Make sure each line follows the format: "Name - Proficiency"</li>
              <li><strong>Wrong grade?</strong> Check that all proficiency levels are spelled correctly (Advanced, Proficient, Developing, Not Yet)</li>
              <li><strong>Data disappeared?</strong> Check if you're on the right subject, or if browser data was cleared</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
