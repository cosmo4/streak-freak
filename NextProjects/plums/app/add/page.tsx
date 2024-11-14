import React from 'react';
import { SearchIcon, UserCircleIcon } from '@heroicons/react/outline';

export default function AddPage() {
  return (
    <div className="min-h-screen bg-blue-50 p-8">
      {/* Header */}
      <header className="relative bg-purple-100 p-6 rounded-xl shadow-lg">
        <div className="flex flex-col justify-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-purple-800 text-center">
            Streak Freak
          </h1>
        </div>
        <div className="absolute right-6 top-4 sm:top-10 flex flex-col-reverse sm:flex-row items-center sm:space-y-0 sm:space-x-4">
          <SearchIcon className="w-8 h-8 text-purple-600" />
          <UserCircleIcon className="w-10 h-10 text-purple-600 mb-3" />
        </div>
      </header>

      {/* Main Content */}
      <main className="mt-8 w-3/4 mx-auto">
        <form className="bg-purple-100 p-8 rounded-xl shadow-lg">
          <h3 className="text-2xl font-bold text-purple-800 text-center mb-6">
            Add New Streak
          </h3>

          {/* Streak Title */}
          <div className="mb-4">
            <label className="block text-purple-800 font-semibold mb-2" htmlFor="streakTitle">
              Streak Title:
            </label>
            <input
              type="text"
              id="streakTitle"
              className="w-full border border-purple-300 rounded-lg p-3 bg-white focus:outline-none focus:border-purple-500"
              placeholder="Enter streak title"
            />
          </div>

          {/* Streak Type */}
          <div className="mb-4">
            <label className="block text-purple-800 font-semibold mb-2" htmlFor="streakType">
              Streak Type:
            </label>
            <input
              type="text"
              id="streakType"
              className="w-full border border-purple-300 rounded-lg p-3 bg-white focus:outline-none focus:border-purple-500"
              placeholder="Enter streak type"
            />
          </div>

          {/* Goal Description */}
          <div className="mb-4">
            <label className="block text-purple-800 font-semibold mb-2" htmlFor="goalDescription">
              Goal Description:
            </label>
            <input
              type="text"
              id="goalDescription"
              className="w-full border border-purple-300 rounded-lg p-3 bg-white focus:outline-none focus:border-purple-500"
              placeholder="Enter goal description"
            />
          </div>

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
      </main>
    </div>
  );
}
