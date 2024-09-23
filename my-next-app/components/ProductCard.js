import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function ProductCard({ product }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageLoading, setImageLoading] = useState(true);

  useEffect(() => {
    console.log('ProductCard rendered for product:', product.id);
    console.log('Number of images:', product.images.length);
  }, [product]);

  const nextImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setImageLoading(true);
    setCurrentImageIndex((prevIndex) => {
      const newIndex = (prevIndex + 1) % product.images.length;
      console.log('Next image clicked. New index:', newIndex);
      return newIndex;
    });
  };

  const prevImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setImageLoading(true);
    setCurrentImageIndex((prevIndex) => {
      const newIndex = (prevIndex - 1 + product.images.length) % product.images.length;
      console.log('Previous image clicked. New index:', newIndex);
      return newIndex;
    });
  };

  return (
    <Link href={`/products/${product.id}`} className="border rounded-lg overflow-hidden shadow-lg block">
      <div className="relative h-64">
        {imageLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
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
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full w-8 h-8 flex items-center justify-center transition-colors"
            >
              &#8249;
            </button>
            <button 
              onClick={nextImage} 
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full w-8 h-8 flex items-center justify-center transition-colors"
            >
              &#8250;
            </button>
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {product.images.map((_, index) => (
                <div 
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-2">{product.title}</h2>
        <p className="text-gray-600 mb-2">${product.price.toFixed(2)}</p>
        <p className="text-sm text-gray-500 mb-2">{product.category}</p>
        <div className="flex items-center">
          <span className="text-yellow-400 mr-1">★</span>
          <span>{product.rating.toFixed(1)}</span>
        </div>
        <div className="mt-2">
          <Image
            src={product.images[currentImageIndex]}
            alt={product.title}
            width={50}
            height={50}
            objectFit="cover"
            className="rounded-md"
          />
        </div>
      </div>
    </Link>
  );
}