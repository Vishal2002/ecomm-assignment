'use client'

import Link from 'next/link';
import { useTheme } from './ThemeProvider';
import { ShoppingCart } from 'lucide-react';
export default function Navigation() {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white p-4 sticky top-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          E-commerce Store
        </Link>
        <div className="flex items-center space-x-4">
          <button onClick={toggleTheme} className="p-2 rounded-full bg-gray-200 dark:bg-gray-700">
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
          <Link href="/cart" className="hover:text-gray-600 flex gap-1 dark:hover:text-gray-300">
               <ShoppingCart/>
                Cart
            
          </Link>
        </div>
      </div>
    </nav>
  );
}