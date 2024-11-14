import { PlusIcon, SearchIcon, UserCircleIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import prisma from '../lib/prisma';



export default async function Home() {

  const feed = await prisma.streak.findMany({
    include: {
      user: {
        select: { name: true },
      },
    },
  });
  return (
    <div className="min-h-screen bg-blue-50 p-8">
      {/* Header */}
      <header className="relative bg-purple-100 p-6 rounded-xl shadow-lg">
        <div className="flex flex-col justify-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-purple-800 text-center">
            Streak Freak
          </h1>
            <h2 className='text-xl sm:text-2xl font-bold text-purple-800 text-center'>Habit Tracking</h2>
        </div>

        <div className="absolute right-6 top-4 sm:top-10 flex flex-col-reverse sm:flex-row items-center sm:space-y-0 sm:space-x-4">
          <SearchIcon className="w-8 h-8 text-purple-600" />
          <UserCircleIcon className="w-10 h-10 text-purple-600 mb-3" />
        </div>
      </header>

      {/* Main Content */}
      <main className="mt-8 w-3/4 mx-auto">
        <div className="flex justify-end mb-8">
          <Link href="/add">
            <button className="bg-purple-200 p-3 rounded-full shadow-md hover:bg-purple-300">
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
            <div key={streak.id} className="bg-purple-100 rounded-xl p-6 h-40 text-center shadow-md hover:bg-purple-200">
              <h2 className="text-purple-800 text-2xl font-bold">{streak.name}</h2>
              <p className="text-purple-600">Streak Type: {streak.streakType}</p>
              <p className="text-purple-600">User: {streak.user?.name || "Unknown"}</p>
              <p className="text-purple-600">Total: {streak.totalCount}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
