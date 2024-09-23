import React from 'react';
import ProductGallery from './ProductGallery';
import ReviewsList from './ReviewsList';

export default function ProductDetailPage({ product }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <ProductGallery images={product.images} />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          <p className="text-2xl font-semibold mb-4">${product.price.toFixed(2)}</p>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <div className="flex items-center mb-4">
            <span className="text-yellow-400 mr-1">★</span>
            <span>{product.rating.toFixed(1)}</span>
          </div>
          <button className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors">
            Add to Cart
          </button>
        </div>
      </div>
      <ReviewsList reviews={product.reviews} />
    </div>
  );
}