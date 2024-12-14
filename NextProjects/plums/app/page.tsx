/* eslint-disable @typescript-eslint/no-explicit-any */

import { PlusIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import prisma from '../lib/prisma';
import { getSession } from '@auth0/nextjs-auth0';

export default async function Home() {
  // Fetch the session
  const session = await getSession();

  if (!session || !session.user) {
    // Redirect to login if the user is not authenticated
    return (
      <div className="text-center mt-8">
        <p>You are not logged in. Please <Link href="/api/auth/login">log in</Link>.</p>
      </div>
    );
  }

  // Fetch streaks for the logged-in user
  const feed = await prisma.streak.findMany({
    where: {
      user: {
        email: session.user.email,
      },
    },
    include: {
      user: {
        select: { name: true },
      },
    },
  });
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
          {/* Add New Streak Card */}
          <Link href="/add">
            <div className="flex items-center justify-center bg-blue-100 rounded-xl h-40 shadow-md hover:bg-blue-200">
              <PlusIcon className="w-12 h-12 text-blue-600" />
            </div>
          </Link>
          

          {/* Existing Streak Cards */}
          

          {feed.map((streak) => (
            <Link key={streak.id} href={`/streaks/${streak.id}`} className="bg-purple-200 rounded-xl p-6 h-40 text-center shadow-md hover:bg-purple-300">
              <h2 className="text-purple-800 text-2xl font-bold">{streak.name}</h2>
              <p className="text-purple-600">Streak Type: {streak.streakType}</p>
              <p className="text-purple-600">User: {streak.user?.name || "Unknown"}</p>
              <p className="text-purple-600">Total: {streak.totalCount}</p>
            </Link>
          ))}
        </div>
      </div>
  );
}
