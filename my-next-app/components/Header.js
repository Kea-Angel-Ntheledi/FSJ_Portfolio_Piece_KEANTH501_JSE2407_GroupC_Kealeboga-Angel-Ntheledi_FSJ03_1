import Link from 'next/link';

export default function Header() {
  return (
    <header className="flex justify-between items-center p-4 bg-gray-200 shadow">
      <div className="text-xl font-bold">
        <Link href="/">Your Store Logo</Link>
      </div>
      <nav className="flex space-x-4">
        <Link href="/about" className="inline-flex items-center px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition">
          About
        </Link>
        <Link href="/auth" className="inline-flex items-center px-4 py-2 bg-gray-700 text-white rounded hover:bg-blue-600 transition">
          Sign In
        </Link>
      </nav>
    </header>
  );
}
