import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

/**
 * ProductCard component displays product information and allows
 * users to navigate through product images.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.product - The product object containing product details.
 * @param {string} props.product.id - The unique identifier for the product.
 * @param {string} props.product.title - The title of the product.
 * @param {Array<string>} props.product.images - An array of image URLs for the product.
 * @param {number} props.product.price - The price of the product.
 * @param {string} props.product.category - The category of the product.
 * @param {number} props.product.rating - The average rating of the product.
 * @returns {JSX.Element} The rendered ProductCard component.
 */
export default function ProductCard({ product }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageLoading, setImageLoading] = useState(true);

  useEffect(() => {
    console.log('ProductCard rendered for product:', product.id);
    console.log('Number of images:', product.images.length);
  }, [product]);

  /**
   * Advances to the next image in the product gallery.
   *
   * @param {MouseEvent} e - The event triggered by clicking the next button.
   */
  const nextImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setImageLoading(true);
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % product.images.length);
  };

  /**
   * Goes back to the previous image in the product gallery.
   *
   * @param {MouseEvent} e - The event triggered by clicking the previous button.
   */
  const prevImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setImageLoading(true);
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + product.images.length) % product.images.length);
  };

  return (
    <div className="border rounded-lg overflow-hidden shadow-md block w-full transition-transform hover:scale-105">
      <div className="relative h-48">
        {imageLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
            <div className="w-6 h-6 border-3 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        <Image
          src={product.images[currentImageIndex]}
          alt={product.title}
          layout="fill"
          objectFit="cover"
          onLoadingComplete={() => setImageLoading(false)}
        />
        {product.images.length > 1 && (
          <>
            <button 
              onClick={prevImage} 
              className="absolute left-1 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full w-6 h-6 flex items-center justify-center transition-colors text-xs"
            >
              &#8249;
            </button>
            <button 
              onClick={nextImage} 
              className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full w-6 h-6 flex items-center justify-center transition-colors text-xs"
            >
              &#8250;
            </button>
            <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex space-x-1">
              {product.images.map((_, index) => (
                <div 
                  key={index}
                  className={`w-1.5 h-1.5 rounded-full ${
                    index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>
      <div className="p-3">
        <h2 className="text-sm font-semibold mb-1 truncate">{product.title}</h2>
        <p className="text-gray-600 text-sm mb-1">${product.price.toFixed(2)}</p>
        <p className="text-xs text-gray-500 mb-1 truncate">{product.category}</p>
        <div className="flex items-center text-xs mb-2">
          <span className="text-yellow-400 mr-1">★</span>
          <span>{product.rating.toFixed(1)}</span>
        </div>
        <Link 
          href={`/products/${product.id}`}
          className="block w-full text-center bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold py-2 px-4 rounded transition-colors"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
