'use client';

import { useEffect, useState } from 'react';
import { PlusIcon } from '@heroicons/react/outline';
import { useUser } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';

interface User {
  name: string;
}

interface Streak {
  id: string;
  name: string;
  streakType: string;
  user?: User;
  totalCount: number;
}

export default function StreaksClient() {
  const { user, isLoading } = useUser();
  const [feed, setFeed] = useState<Streak[]>([]);

  useEffect(() => {
    if (!isLoading && user) {
      fetch(`/api/streaks?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => setFeed(data))
        .catch((err) => console.error('Error fetching streaks:', err));
    }
  }, [isLoading, user]);

  if (isLoading) return <div>Loading...</div>;
  if (!user) return <div className='text-3xl w-1/2 mx-auto text-center my-20'>Please log in to view your streaks.</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-14">
        <Link href="/add">
          <div className="flex items-center justify-center bg-blue-100 rounded-xl h-40 shadow-md hover:bg-blue-200">
            <PlusIcon className="w-12 h-12 text-blue-600" />
          </div>
        </Link>
      {feed.map((streak) => (
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
      ))}
    </div>
  );
}
