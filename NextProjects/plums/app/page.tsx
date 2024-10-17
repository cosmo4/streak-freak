import { PlusIcon, SearchIcon, UserCircleIcon } from '@heroicons/react/outline';

export default function Home() {
  return (
    <div className="min-h-screen bg-blue-50 p-8">
      {/* Header */}
      <header className="flex items-center justify-between text-center bg-teal-100 p-6 rounded-xl shadow-lg">
        <h1 className="text-4xl font-bold text-teal-800">Streak Freak</h1>
        <h2 className="text-4xl font-bold text-teal-800">Habit Tracking</h2>
        <div className="flex items-center space-x-4">
          <SearchIcon className="w-6 h-6 text-teal-600" />
          <UserCircleIcon className="w-8 h-8 text-teal-600" />
        </div>
      </header>

      {/* Main Content */}
      <main className="mt-8 w-3/4 mx-auto">
        <div className="flex justify-end mb-8">
          <button className="bg-teal-200 p-3 rounded-full shadow-md hover:bg-teal-300">
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
            <div key={index} className="bg-teal-100 rounded-xl p-6 h-40 text-center shadow-md hover:bg-teal-200">
              <h2 className="text-teal-800 text-2xl font-bold">Streak Title</h2>
              <p className="text-teal-600">Streak Type: Count</p>
              <p className="text-teal-600">Total: 10</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
