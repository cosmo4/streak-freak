import { PlusIcon, SearchIcon, UserCircleIcon } from '@heroicons/react/outline';

export default function Home() {
  return (
    <div className="min-h-screen bg-blue-50 p-8">
      {/* Header */}
      <header className="relative bg-red-100 p-6 rounded-xl shadow-lg">
        <div className="flex justify-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-red-800 text-center">
            Streak Freak
            <br />
            <h2 className='text-xl sm:text-2xl'>Habit Tracking</h2>
          </h1>
        </div>

        <div className="absolute right-6 top-4 sm:top-10 flex flex-col-reverse sm:flex-row items-center sm:space-y-0 sm:space-x-4">
          <SearchIcon className="w-8 h-8 text-red-600" />
          <UserCircleIcon className="w-10 h-10 text-red-600 mb-3" />
        </div>
      </header>

      {/* Main Content */}
      <main className="mt-8 w-3/4 mx-auto">
        <div className="flex justify-end mb-8">
          <button className="bg-red-200 p-3 rounded-full shadow-md hover:bg-red-300">
            <PlusIcon className="w-6 h-6 text-white" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Add New Streak Card */}
          <div className="flex items-center justify-center bg-blue-100 rounded-xl h-40 shadow-md hover:bg-blue-200">
            <PlusIcon className="w-12 h-12 text-blue-600" />
          </div>

          {/* Existing Streak Cards */}
          {[...Array(6)].map((_, index) => (
            <div key={index} className="bg-red-100 rounded-xl p-6 h-40 text-center shadow-md hover:bg-red-200">
              <h2 className="text-red-800 text-2xl font-bold">Streak Title</h2>
              <p className="text-red-600">Streak Type: Count</p>
              <p className="text-red-600">Total: 10</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
