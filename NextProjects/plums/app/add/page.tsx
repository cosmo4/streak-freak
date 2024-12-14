'use client'
import React from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';

export default function AddPage() {
  const { user, error, isLoading } = useUser(); 
  if (isLoading) return <h1>Loading...</h1>; 
  if (error) return <h1>Error: {error.message}</h1>;
  return (
      <div>
        <div>
        <div className="text-2xl font-bold text-purple-800 text-center mb-6"> {user ? ( <h1>Welcome, {user.name || user.nickname}</h1> ) : 
        ( <h1>You are not logged in.</h1> )} </div>
        </div>
        <div className="mt-8 w-3/4 mx-auto">
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
      </div>
      </div>
      
  );
}
