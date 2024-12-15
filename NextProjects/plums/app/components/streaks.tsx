'use client';

import { PlusIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0/client';

export default function Streaks({ feed }: { feed: Array<any> }) {
  const { user } = useUser();

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Add New Streak Card */}
        <Link href="/add">
          <div className="flex items-center justify-center bg-blue-100 rounded-xl h-40 shadow-md hover:bg-blue-200">
            <PlusIcon className="w-12 h-12 text-blue-600" />
          </div>
        </Link>

        {/* Existing Streak Cards */}
        {user ? (
          feed.map((streak) => (
            <Link
              key={streak.id}
              href={`/streaks/${streak.id}`}
              className="bg-purple-200 rounded-xl p-6 h-40 text-center shadow-md hover:bg-purple-300"
            >
              <h2 className="text-purple-800 text-2xl font-bold">{streak.name}</h2>
              <p className="text-purple-600">Streak Type: {streak.streakType}</p>
              <p className="text-purple-600">User: {streak.user?.name || 'Unknown'}</p>
              <p className="text-purple-600">Total: {streak.totalCount}</p>
            </Link>
          ))
        ) : null}
      </div>
    </div>
  );
}
