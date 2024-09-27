'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

/**
 * SearchFilterSort component allows users to search, filter, and sort products.
 *
 * @param {Object} props - The component props.
 * @param {Array<string>} props.categories - An array of category names for filtering products.
 * @param {function} props.onReset - A callback function that gets called when filters are reset.
 * @returns {JSX.Element} The rendered SearchFilterSort component.
 */
export default function SearchFilterSort({ categories, onReset }) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSort, setSelectedSort] = useState('');

  // Restore filters from searchParams on component load
  useEffect(() => {
    const search = searchParams.get('search') || '';
    const category = searchParams.get('category') || '';
    const sort = searchParams.get('sort') || '';

    setSearchTerm(search);
    setSelectedCategory(category);
    setSelectedSort(sort);
  }, [searchParams]);

  // Apply the filters and update the URL with the query parameters
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
    router.push('?' + params.toString()); // Keep filters in URL
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      applyFilters();
    }
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
    router.push('/'); // Reset filters by navigating to the base route
    if (onReset) onReset();
  };

  // Generate link to the product detail page while preserving current filters
  const getProductDetailLink = (productId) => {
    const params = new URLSearchParams(searchParams);
    return `/product/${productId}?${params.toString()}`;
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
