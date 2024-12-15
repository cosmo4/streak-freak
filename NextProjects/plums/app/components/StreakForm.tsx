'use client';

import { useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';

export default function StreakForm() {
  const { user } = useUser();

  const [formData, setFormData] = useState({
    streakTitle: '',
    streakType: 'COUNT',
    goalDescription: '',
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | HTMLSelectElement) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      setError('You must be logged in to create a streak.');
      return;
    }

    try {
      const res = await fetch('/api/streaks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.streakTitle,
          streakType: formData.streakType,
          description: formData.goalDescription,
          userEmail: user.email,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to save streak.');
      }

      setSuccess(true);
      setFormData({ streakTitle: '', streakType: 'COUNT', goalDescription: '' });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <div className="text-2xl font-bold text-purple-800 text-center mb-6">
        {user ? <h1>Welcome, {user.name || user.nickname}</h1> : <h1>You are not logged in.</h1>}
      </div>
      <div className="mt-8 w-3/4 mx-auto">
        <form
          onSubmit={handleSubmit}
          className="bg-purple-100 p-8 rounded-xl shadow-lg"
        >
          <h3 className="text-2xl font-bold text-purple-800 text-center mb-6">
            Add New Streak
          </h3>

          {/* Streak Title */}
          <div className="mb-4">
            <label
              className="block text-purple-800 font-semibold mb-2"
              htmlFor="streakTitle"
            >
              Streak Title:
            </label>
            <input
              type="text"
              id="streakTitle"
              value={formData.streakTitle}
              onChange={handleChange}
              className="w-full border border-purple-300 rounded-lg p-3 bg-white focus:outline-none focus:border-purple-500"
              placeholder="Enter streak title"
            />
          </div>

          {/* Streak Type */}
          <div className="mb-4">
            <label
              className="block text-purple-800 font-semibold mb-2"
              htmlFor="streakType"
            >
              Streak Type:
            </label>
            <select
              id="streakType"
              value={formData.streakType}
              onChange={handleChange}
              className="w-full border border-purple-300 rounded-lg p-3 bg-white focus:outline-none focus:border-purple-500"
            >
              <option value="COUNT">Count</option>
              <option value="DURATION">Duration</option>
              <option value="CLICK">Click</option>
              <option value="QUANTITY">Quantity</option>
            </select>
          </div>

          {/* Goal Description */}
          <div className="mb-4">
            <label
              className="block text-purple-800 font-semibold mb-2"
              htmlFor="goalDescription"
            >
              Goal Description:
            </label>
            <input
              type="text"
              id="goalDescription"
              value={formData.goalDescription}
              onChange={handleChange}
              className="w-full border border-purple-300 rounded-lg p-3 bg-white focus:outline-none focus:border-purple-500"
              placeholder="Enter goal description"
            />
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-center">{error}</p>}
          {success && (
            <p className="text-green-500 text-center">Streak created successfully!</p>
          )}

          {/* Save Streak Button */}
          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="bg-blue-100 text-blue-600 font-bold p-3 rounded-xl shadow-md hover:bg-blue-200 hover:text-blue-700 transition-colors"
            >
              Save Streak
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
