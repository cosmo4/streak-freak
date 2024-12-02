'use client';

import { Streak } from '@prisma/client';
import { useState, useEffect } from 'react';

export default function ManageStreak({ params }: { params: { id: string } }) {
  const [streak, setStreak] = useState<Streak | null>(null);

  useEffect(() => {
    const fetchStreak = async () => {
      const res = await fetch(`/api/streaks/${params.id}`);
      const data = await res.json();
      setStreak(data);
    };

    fetchStreak();
  }, [params.id]);

  if (!streak) {
    return <div>Loading...</div>;
  }

  return (
    <StreakEditor streak={streak} />
  );
}

function StreakEditor({ streak }: { streak: Streak }) {
  const [name, setName] = useState(streak.name);
  const [description, setDescription] = useState(streak.description || '');
  const [type, setType] = useState(streak.streakType);
  const [totalCount, setTotalCount] = useState(streak.totalCount || 0);

  const handleSave = async () => {
    try {
      const response = await fetch(`/api/streaks/${streak.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, description, streakType: type, totalCount }),
      });

      if (response.ok) {
        alert('Streak updated successfully!');
      } else {
        alert('Failed to update streak.');
      }
    } catch (error) {
      console.error('Error saving streak:', error);
      alert('An error occurred while saving.');
    }
  };

  return (
    <div className="bg-purple-300 text-purple-800 p-8 rounded-lg w-1/3 mx-auto my-4">
      <h3 className="text-2xl mb-4">Manage Streak</h3>

      <label className="block mb-2">
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="block w-full p-2 border border-purple-500 rounded"
        />
      </label>

      <label className="block mb-2">
        Description:
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="block w-full p-2 border border-purple-500 rounded"
        />
      </label>

      <label className="block mb-2">
        Type:
        <select
          value={type}
          onChange={(e) => setType(e.target.value as "COUNT" | "DURATION" | "CLICK" | "QUANTITY")}
          className="block w-full p-2 border border-purple-500 rounded"
        >
          <option value="COUNT">Count</option>
          <option value="DURATION">Duration</option>
          <option value="CLICK">Click</option>
          <option value="QUANTITY">Quantity</option>
        </select>
      </label>

      <label className="block mb-2">
        Total Count:
        <input
          type="number"
          value={totalCount}
          onChange={(e) => setTotalCount(Number(e.target.value))}
          className="block w-full p-2 border border-purple-500 rounded"
        />
      </label>

      <button
        onClick={handleSave}
        className="bg-purple-500 text-white px-4 py-2 rounded mt-4 hover:bg-purple-600"
      >
        Save Changes
      </button>
    </div>
  );
}
