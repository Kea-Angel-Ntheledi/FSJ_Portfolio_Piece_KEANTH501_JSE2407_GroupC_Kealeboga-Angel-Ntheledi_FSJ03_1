'use client';

import React from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

export default function SearchFilterSort({ categories, onReset }) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(name, value);
    } else {
      params.delete(name);
    }
    params.delete('page'); // Reset to first page when filters change
    router.push('?' + params.toString());
  };

  const handleReset = () => {
    router.push('/');
    if (onReset) onReset();
  };

  return (
    <div className="mb-6 p-4 bg-gray-100 rounded-lg">
      <input
        type="text"
        name="search"
        placeholder="Search products..."
        value={searchParams.get('search') || ''}
        onChange={handleChange}
        className="w-full p-2 mb-2 border rounded"
      />
      <select
        name="category"
        value={searchParams.get('category') || ''}
        onChange={handleChange}
        className="w-full p-2 mb-2 border rounded"
      >
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
      <select
        name="sort"
        value={searchParams.get('sort') || ''}
        onChange={handleChange}
        className="w-full p-2 mb-2 border rounded"
      >
        <option value="">Sort by</option>
        <option value="price_asc">Price: Low to High</option>
        <option value="price_desc">Price: High to Low</option>
      </select>
      <button
        onClick={handleReset}
        className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Reset Filters
      </button>
    </div>
  );
}