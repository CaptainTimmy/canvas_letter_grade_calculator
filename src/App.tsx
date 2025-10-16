import React, { useState, useEffect } from 'react';
import { AppData, Subject, Outcome, Proficiency } from './types';
import { loadData, saveData, createSubject } from './utils/storage';
import { SubjectManager } from './components/SubjectManager';
import { OutcomeInput } from './components/OutcomeInput';
import { OutcomesList } from './components/OutcomesList';
import { GradeDisplay } from './components/GradeDisplay';
import { Tutorial } from './components/Tutorial';

function App() {
  const [data, setData] = useState<AppData>({ subjects: {}, currentSubjectId: null });
  const [showOutcomeInput, setShowOutcomeInput] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load data on component mount
  useEffect(() => {
    const loadedData = loadData();
    setData(loadedData);
    setIsInitialized(true);
  }, []);

  // Save data whenever it changes (but not on initial load)
  useEffect(() => {
    if (isInitialized) {
      saveData(data);
    }
  }, [data, isInitialized]);

  const currentSubject = data.currentSubjectId ? data.subjects[data.currentSubjectId] : null;

  const handleSubjectCreate = (name: string) => {
    const newSubject = createSubject(name);
    const newData = {
      ...data,
      subjects: {
        ...data.subjects,
        [newSubject.id]: newSubject
      },
      currentSubjectId: newSubject.id
    };
    setData(newData);
  };

  const handleSubjectSelect = (subjectId: string) => {
    setData({
      ...data,
      currentSubjectId: subjectId
    });
    // Reset input visibility when switching subjects
    setShowOutcomeInput(true);
  };

  const handleSubjectRename = (subjectId: string, newName: string) => {
    if (data.subjects[subjectId]) {
      setData({
        ...data,
        subjects: {
          ...data.subjects,
          [subjectId]: {
            ...data.subjects[subjectId],
            name: newName
          }
        }
      });
    }
  };

  const handleSubjectDelete = (subjectId: string) => {
    const newSubjects = { ...data.subjects };
    delete newSubjects[subjectId];
    
    const newCurrentSubjectId = data.currentSubjectId === subjectId ? null : data.currentSubjectId;
    
    setData({
      subjects: newSubjects,
      currentSubjectId: newCurrentSubjectId
    });
  };

  const handleOutcomesAdd = (newOutcomes: Outcome[]) => {
    if (!currentSubject) return;

    setData({
      ...data,
      subjects: {
        ...data.subjects,
        [currentSubject.id]: {
          ...currentSubject,
          outcomes: [...currentSubject.outcomes, ...newOutcomes]
        }
      }
    });
    
    // Auto-collapse input section when outcomes are added
    setShowOutcomeInput(false);
  };

  const handleOutcomeDelete = (outcomeId: string) => {
    if (!currentSubject) return;

    setData({
      ...data,
      subjects: {
        ...data.subjects,
        [currentSubject.id]: {
          ...currentSubject,
          outcomes: currentSubject.outcomes.filter(outcome => outcome.id !== outcomeId)
        }
      }
    });
  };

  const handleOutcomeUpdate = (outcomeId: string, proficiency: Proficiency) => {
    if (!currentSubject) return;

    setData({
      ...data,
      subjects: {
        ...data.subjects,
        [currentSubject.id]: {
          ...currentSubject,
          outcomes: currentSubject.outcomes.map(outcome =>
            outcome.id === outcomeId ? { ...outcome, proficiency } : outcome
          )
        }
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Grade Calculator</h1>
          <p className="text-gray-600">
            Calculate your letter grade based on AWE outcomes and proficiency levels
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Subject Management & Tutorial */}
          <div className="lg:col-span-1 space-y-6">
            <SubjectManager
              subjects={data.subjects}
              currentSubjectId={data.currentSubjectId}
              onSubjectSelect={handleSubjectSelect}
              onSubjectCreate={handleSubjectCreate}
              onSubjectRename={handleSubjectRename}
              onSubjectDelete={handleSubjectDelete}
            />
            
            {/* Tutorial Section */}
            <Tutorial />
          </div>

          {/* Right Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {currentSubject ? (
              <>
                {/* Current Subject Header */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">
                        {currentSubject.name}
                      </h2>
                      <p className="text-sm text-gray-600">
                        {currentSubject.outcomes.length} outcomes
                      </p>
                    </div>
                    {currentSubject.outcomes.length > 0 && (
                      <button
                        onClick={() => setShowOutcomeInput(!showOutcomeInput)}
                        className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                      >
                        {showOutcomeInput ? 'Hide Input' : 'Add More Outcomes'}
                      </button>
                    )}
                  </div>
                </div>

                {/* Grade Display - Always show when there are outcomes */}
                {currentSubject.outcomes.length > 0 && (
                  <GradeDisplay outcomes={currentSubject.outcomes} />
                )}

                {/* Outcome Input - Collapsible */}
                {showOutcomeInput && (
                  <OutcomeInput onOutcomesAdd={handleOutcomesAdd} />
                )}

                {/* Outcomes List - Always show when there are outcomes */}
                {currentSubject.outcomes.length > 0 && (
                  <OutcomesList
                    outcomes={currentSubject.outcomes}
                    onOutcomeDelete={handleOutcomeDelete}
                    onOutcomeUpdate={handleOutcomeUpdate}
                  />
                )}
              </>
            ) : (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
                <div className="text-gray-400 mb-4">
                  <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Subject Selected</h3>
                <p className="text-gray-600 mb-4">
                  Create a new subject or select an existing one to start calculating grades.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
