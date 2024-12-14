/* eslint-disable @typescript-eslint/no-explicit-any */
import { PlusIcon } from '@heroicons/react/outline';
import Link from 'next/link';

// Fetch session and streaks server-side
async function fetchSessionAndStreaks() {
  const sessionRes = await fetch('http://localhost:3000/api/auth/me', {
    cache: 'no-store', // Ensure we fetch the latest session
  });
  const session = await sessionRes.json();

  if (!session.user) {
    return { session: null, feed: [] }; // User not logged in
  }

  // Fetch streaks for the logged-in user
  const streaksRes = await fetch(
    `http://localhost:3000/api/streaks?email=${session.user.email}`,
    { cache: 'no-store' }
  );
  const feed = await streaksRes.json();

  return { session, feed };
}

export default async function HomePage() {
  const { session, feed } = await fetchSessionAndStreaks();

  if (!session) {
    return (
      <div className="text-center mt-8">
        <p className='text-purple-400'>
          You are not logged in. Please{' '}
          <Link href="/api/auth/login" className="text-purple-500 underline">
            log in
          </Link>
          .
        </p>
      </div>
    );
  }

  return (
    <div className="mt-8 w-3/4 mx-auto">
      <div className="flex justify-end mb-8">
        <Link href="/add">
          <button className="bg-purple-300 p-3 rounded-full shadow-md hover:bg-purple-400">
            <PlusIcon className="w-6 h-6 text-white" />
          </button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <Link href="/add">
          <div className="flex items-center justify-center bg-blue-100 rounded-xl h-40 shadow-md hover:bg-blue-200">
            <PlusIcon className="w-12 h-12 text-blue-600" />
          </div>
        </Link>

        {/* Render feed */}
        {feed.map((streak: any) => (
          <Link
            key={streak.id}
            href={`/streaks/${streak.id}`}
            className="bg-purple-200 rounded-xl p-6 h-40 text-center shadow-md hover:bg-purple-300"
          >
            <h2 className="text-purple-800 text-2xl font-bold">{streak.name}</h2>
            <p className="text-purple-600">User: {streak.user?.name || 'Unknown'}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

