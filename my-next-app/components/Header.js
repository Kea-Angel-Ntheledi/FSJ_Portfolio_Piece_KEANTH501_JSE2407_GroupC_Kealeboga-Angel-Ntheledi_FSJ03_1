import React from 'react';
import Link from 'next/link';

const Header = () => {
  return (
    <header className="flex items-center justify-between p-4 bg-gray-800 text-white">
      {/* Logo */}
      <Link href="/" className="text-lg font-bold">
        <img src="/" alt="Logo" className="h-8" />
      </Link>

      {/* Navigation Links */}
      <nav className="flex items-center space-x-4">
        <Link href="/about" className="hover:underline">About</Link>
        <Link href="/signin" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Sign In</Link>
      </nav>
    </header>
  );
};

export default Header;
