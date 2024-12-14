'use client'

import Link from 'next/link';
import { SearchIcon, UserCircleIcon, HomeIcon } from '@heroicons/react/outline';
import { useUser } from '@auth0/nextjs-auth0/client';

const Header = () => {
    const { user, isLoading } = useUser();

    return (
        <header className="relative bg-purple-200 p-6 rounded-xl shadow-lg">
            <Link href="/">
                <div className="flex flex-col justify-center">
                    <h1 className="text-3xl sm:text-4xl font-bold text-purple-800 text-center">
                        Streak Freak
                    </h1>
                        <h2 className='text-xl sm:text-2xl font-bold text-purple-800 text-center'>Habit Tracking</h2>
                </div>
            </Link>

            <div className="absolute right-6 top-4 sm:top-10 flex flex-col-reverse sm:flex-row items-center sm:space-y-0 sm:space-x-4">
                <SearchIcon className="w-8 h-8 text-purple-800" />
                {/* Conditional rendering using ternary operator */}
                {!isLoading && user ? (
                    <Link href="/api/auth/logout">
                        <UserCircleIcon className="w-10 h-10 text-purple-800 " />
                    </Link>
                    
                ) : (
                    <Link href="/api/auth/login">
                        <UserCircleIcon className="w-10 h-10 text-purple-800 " />
                    </Link>
                )}
                <Link href="/">
                    <HomeIcon className="w-9 h-9 text-purple-800" />
                </Link>
            </div>
        </header>
    )
}

export default Header;