/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { PlusIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useEffect } from 'react';

export default function Home() {
  // Fetch the session
  const { user, error, isLoading } = useUser();
  

  useEffect(() => {
    if (user) {
      fetch('/api/auth/update-user', {
        method: 'POST',
      }).catch((err) => console.error('Failed to update user:', err));
    }
  }, [user]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  // if (!session || !session.user) {
  //   // Redirect to login if the user is not authenticated
  //   return (
  //     <div className="text-center mt-8">
  //       <p>You are not logged in. Please <Link href="/api/auth/login">log in</Link>.</p>
  //     </div>
  //   );
  // }

  // Fetch streaks for the logged-in user
  // const feed = await prisma.streak.findMany({
  //   where: {
  //     user: {
  //       email: session.user.email,
  //     },
  //   },
  //   include: {
  //     user: {
  //       select: { name: true },
  //     },
  //   },
  // });
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
          <div className='text-purple-500'>
            <h1>Welcome to the App</h1>
            {user ? (
              <>
                <p>Logged in as {user.name}</p>
                <a href="/api/auth/logout">Logout</a>
              </>
            ) : (
              <a href="/api/auth/login">Login</a>
            )}
          </div>
        );

          {/* {feed.map((streak) => (
            <Link key={streak.id} href={`/streaks/${streak.id}`} className="bg-purple-200 rounded-xl p-6 h-40 text-center shadow-md hover:bg-purple-300">
              <h2 className="text-purple-800 text-2xl font-bold">{streak.name}</h2>
              <p className="text-purple-600">Streak Type: {streak.streakType}</p>
              <p className="text-purple-600">User: {streak.user?.name || "Unknown"}</p>
              <p className="text-purple-600">Total: {streak.totalCount}</p>
            </Link>
          ))} */}
        </div>
      </div>
  );
}
