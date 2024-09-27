'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import ProductCard from './ProductCard';
import SearchFilterSort from './SearchFilterSort';

const PRODUCTS_PER_PAGE = 20;

/**
 * ProductsList component fetches and displays a list of products with
 * search, filter, and pagination functionalities.
 *
 * @returns {JSX.Element} The rendered ProductsList component.
 */
export default function ProductsList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, [searchParams]);

  /**
   * Fetches product categories from the API.
   * Sets the categories state with the fetched data.
   */
  async function fetchCategories() {
    try {
      const res = await fetch('https://next-ecommerce-api.vercel.app/categories');
      if (!res.ok) throw new Error('Failed to fetch categories');
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  }

  /**
   * Fetches products based on search, category, sort, and pagination parameters.
   * Updates the products state with the fetched data.
   */
  async function fetchProducts() {
    setLoading(true);
    try {
      const search = searchParams.get('search') || '';
      const category = searchParams.get('category') || '';
      const sort = searchParams.get('sort') || '';
      const page = parseInt(searchParams.get('page') || '1', 10);

      let url = `https://next-ecommerce-api.vercel.app/products?limit=${PRODUCTS_PER_PAGE}&skip=${(page - 1) * PRODUCTS_PER_PAGE}`;
      
      if (search) url += `&search=${search}`;
      if (category) url += `&category=${category}`;
      if (sort) {
        const [field, order] = sort.split('_');
        url += `&sort=${field}&order=${order}`;
      }

      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to fetch products');
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('An error occurred while fetching products');
    } finally {
      setLoading(false);
    }
  }

  /**
   * Handles page change by updating the search parameters and triggering
   * a re-fetch of products.
   *
   * @param {number} newPage - The new page number to navigate to.
   */
  const handlePageChange = (newPage) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', newPage.toString());
    router.push('?' + params.toString());
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

  return (
    <div>
      <SearchFilterSort categories={categories} onReset={fetchProducts} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div className="col-span-full text-center py-10">No products found.</div>
        )}
      </div>
      <div className="flex justify-center items-center space-x-4 mt-8">
        <button 
          onClick={() => handlePageChange(parseInt(searchParams.get('page') || '1', 10) - 1)} 
          disabled={parseInt(searchParams.get('page') || '1', 10) === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          Previous Page
        </button>
        <span>Page {searchParams.get('page') || 1}</span>
        <button 
          onClick={() => handlePageChange(parseInt(searchParams.get('page') || '1', 10) + 1)}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Next Page
        </button>
      </div>
    </div>
  );
}
