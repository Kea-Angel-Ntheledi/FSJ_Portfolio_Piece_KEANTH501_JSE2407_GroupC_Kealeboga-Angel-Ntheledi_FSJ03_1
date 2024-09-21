'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

export default function SearchFilterSort({ categories, onReset }) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      const params = new URLSearchParams(searchParams);
      if (searchTerm) {
        params.set('search', searchTerm);
      } else {
        params.delete('search');
      }
      params.delete('page'); // Reset to first page when filters change
      router.push('?' + params.toString());
    }
  };

  const handleCategoryChange = (e) => {
    const { value } = e.target;
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set('category', value);
    } else {
      params.delete('category');
    }
    params.delete('page'); // Reset to first page when filters change
    router.push('?' + params.toString());
  };

  const handleSortChange = (e) => {
    const { value } = e.target;
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set('sort', value);
    } else {
      params.delete('sort');
    }
    params.delete('page'); // Reset to first page when filters change
    router.push('?' + params.toString());
  };

  const handleReset = () => {
    setSearchTerm('');
    router.push('/');
    if (onReset) onReset();
  };

  return (
    <div className="mb-6 p-4 bg-gray-100 rounded-lg shadow-md">
      <label htmlFor="search" className="block mb-2 font-semibold">Search</label>
      <div className="relative mb-4">
        <input
          id="search"
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleSearchChange}
          onKeyDown={handleKeyDown}
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-500"
            aria-label="Clear search"
          >
            &times;
          </button>
        )}
      </div>
      <label htmlFor="category" className="block mb-2 font-semibold">Category</label>
      <select
        id="category"
        value={searchParams.get('category') || ''}
        onChange={handleCategoryChange}
        className="w-full p-2 mb-2 border rounded"
      >
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
      <label htmlFor="sort" className="block mb-2 font-semibold">Sort</label>
      <select
        id="sort"
        value={searchParams.get('sort') || ''}
        onChange={handleSortChange}
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
