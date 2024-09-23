import React from 'react';
import { useRouter } from 'next/router';
import ProductGallery from './ProductGallery';

export default function ProductDetailPage({ product }) {
  const router = useRouter();

  // If the product is not loaded yet, show a loading state
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => router.back()}
        className="mb-4 px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
      >
        ← Back to Products
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <ProductGallery images={product.images} />
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          <p className="text-xl font-semibold mb-2">${product.price.toFixed(2)}</p>
          <p className="text-gray-600 mb-4">{product.category}</p>
          <div className="flex items-center mb-4">
            <span className="text-yellow-400 mr-1">★</span>
            <span>{product.rating.toFixed(1)}</span>
          </div>
          <p className="text-gray-700">{product.description}</p>
        </div>
      </div>
    </div>
  );
}