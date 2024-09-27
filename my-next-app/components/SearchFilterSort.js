'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

export default function SearchFilterSort({ categories, onReset }) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSort, setSelectedSort] = useState('');

  useEffect(() => {
    const search = searchParams.get('search') || '';
    const category = searchParams.get('category') || '';
    const sort = searchParams.get('sort') || '';

    setSearchTerm(search);
    setSelectedCategory(category);
    setSelectedSort(sort);
  }, [searchParams]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      applyFilters();
    }
  };

  const applyFilters = () => {
    const params = new URLSearchParams();
    if (searchTerm) {
      params.set('search', searchTerm);
    }
    if (selectedCategory) {
      params.set('category', selectedCategory);
    }
    if (selectedSort) {
      params.set('sort', selectedSort);
    }
    params.delete('page'); // Reset to first page when filters change
    router.push('?' + params.toString());
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    applyFilters();
  };

  const handleSortChange = (e) => {
    setSelectedSort(e.target.value);
    applyFilters();
  };

  const handleReset = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSelectedSort('');
    clearFilterState();
    router.push('/'); // or the desired route to clear all filters
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
        value={selectedCategory}
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
        value={selectedSort}
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
