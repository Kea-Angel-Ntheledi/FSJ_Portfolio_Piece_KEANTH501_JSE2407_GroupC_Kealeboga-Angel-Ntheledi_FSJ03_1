import React from 'react';
import { useRouter } from 'next/router';

export default function SearchFilterSort({ categories, onReset }) {
  const router = useRouter();
  const { query } = router;

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newQuery = { ...query, [name]: value, page: 1 };
    if (!value) delete newQuery[name];
    router.push({ pathname: router.pathname, query: newQuery });
  };

  const handleReset = () => {
    router.push(router.pathname);
    if (onReset) onReset();
  };

  return (
    <div className="mb-6 p-4 bg-gray-100 rounded-lg">
      <input
        type="text"
        name="search"
        placeholder="Search products..."
        value={query.search || ''}
        onChange={handleChange}
        className="w-full p-2 mb-2 border rounded"
      />
      <select
        name="category"
        value={query.category || ''}
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
        value={query.sort || ''}
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