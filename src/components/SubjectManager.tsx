import React, { useState } from 'react';
import { Subject } from '../types';

interface SubjectManagerProps {
  subjects: { [id: string]: Subject };
  currentSubjectId: string | null;
  onSubjectSelect: (subjectId: string) => void;
  onSubjectCreate: (name: string) => void;
  onSubjectRename: (subjectId: string, newName: string) => void;
  onSubjectDelete: (subjectId: string) => void;
}

export const SubjectManager: React.FC<SubjectManagerProps> = ({
  subjects,
  currentSubjectId,
  onSubjectSelect,
  onSubjectCreate,
  onSubjectRename,
  onSubjectDelete
}) => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newSubjectName, setNewSubjectName] = useState('');
  const [editingSubjectId, setEditingSubjectId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState('');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSubjectName.trim()) {
      onSubjectCreate(newSubjectName.trim());
      setNewSubjectName('');
      setShowCreateForm(false);
    }
  };

  const handleRename = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingSubjectId && editingName.trim()) {
      onSubjectRename(editingSubjectId, editingName.trim());
      setEditingSubjectId(null);
      setEditingName('');
    }
  };

  const startEditing = (subject: Subject) => {
    setEditingSubjectId(subject.id);
    setEditingName(subject.name);
  };

  const cancelEditing = () => {
    setEditingSubjectId(null);
    setEditingName('');
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Subjects</h2>
        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          {showCreateForm ? 'Cancel' : '+ New Subject'}
        </button>
      </div>

      {showCreateForm && (
        <form onSubmit={handleCreate} className="mb-4 p-3 bg-gray-50 rounded-md">
          <input
            type="text"
            value={newSubjectName}
            onChange={(e) => setNewSubjectName(e.target.value)}
            placeholder="Enter subject name"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoFocus
          />
          <div className="flex gap-2 mt-2">
            <button
              type="submit"
              className="px-3 py-1 text-sm bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Create
            </button>
            <button
              type="button"
              onClick={() => setShowCreateForm(false)}
              className="px-3 py-1 text-sm bg-gray-500 text-white rounded-md hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="space-y-2">
        {Object.values(subjects).map((subject) => (
          <div
            key={subject.id}
            className={`flex items-center justify-between p-2 rounded-md ${
              currentSubjectId === subject.id ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-50'
            }`}
          >
            {editingSubjectId === subject.id ? (
              <form onSubmit={handleRename} className="flex-1 flex items-center gap-2">
                <input
                  type="text"
                  value={editingName}
                  onChange={(e) => setEditingName(e.target.value)}
                  className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                  autoFocus
                />
                <button
                  type="submit"
                  className="px-2 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={cancelEditing}
                  className="px-2 py-1 text-xs bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
              </form>
            ) : (
              <>
                <button
                  onClick={() => onSubjectSelect(subject.id)}
                  className="flex-1 text-left text-sm font-medium text-gray-900 hover:text-blue-600"
                >
                  {subject.name}
                </button>
                <div className="flex gap-1">
                  <button
                    onClick={() => startEditing(subject)}
                    className="px-2 py-1 text-xs text-gray-600 hover:text-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onSubjectDelete(subject.id)}
                    className="px-2 py-1 text-xs text-gray-600 hover:text-red-600"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {Object.keys(subjects).length === 0 && (
        <p className="text-sm text-gray-500 text-center py-4">
          No subjects yet. Create your first subject to get started.
        </p>
      )}
    </div>
  );
};
