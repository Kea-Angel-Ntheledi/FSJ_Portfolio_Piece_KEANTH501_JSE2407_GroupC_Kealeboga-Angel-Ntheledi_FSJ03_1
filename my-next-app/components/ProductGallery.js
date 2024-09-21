'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function ProductGallery({ images }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const nextImage = () => {
    setIsLoading(true);
    setCurrentImageIndex((prevIndex) => 
      (prevIndex + 1) % images.length
    );
  };

  const prevImage = () => {
    setIsLoading(true);
    setCurrentImageIndex((prevIndex) => 
      (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <div className="flex flex-col">
      <div className="relative rounded-lg overflow-hidden shadow-lg">
        <div className="aspect-w-1 aspect-h-1">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
              <div className="w-8 h-8 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
          <Image
            src={images[currentImageIndex]}
            alt={`Product image ${currentImageIndex + 1}`}
            layout="fill"
            objectFit="cover"
            onLoadingComplete={() => setIsLoading(false)}
          />
        </div>
        {images.length > 1 && (
          <>
            <button 
              onClick={prevImage} 
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-pink-500 hover:text-pink-600 rounded-full w-10 h-10 flex items-center justify-center transition-all shadow-md hover:shadow-lg"
              aria-label="Previous image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              onClick={nextImage} 
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-pink-500 hover:text-pink-600 rounded-full w-10 h-10 flex items-center justify-center transition-all shadow-md hover:shadow-lg"
              aria-label="Next image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}
      </div>
      
      {images.length > 1 && (
        <div className="mt-4 flex space-x-2 overflow-x-auto px-2 py-2 bg-gray-100 rounded-lg">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => {
                setIsLoading(true);
                setCurrentImageIndex(index);
              }}
              className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden transition-all ${
                index === currentImageIndex 
                  ? 'ring-2 ring-pink-500 shadow-md' 
                  : 'hover:ring-2 hover:ring-pink-300 hover:shadow-sm'
              }`}
              aria-label={`View image ${index + 1}`}
            >
              <div className="relative w-full h-full">
                <Image
                  src={image}
                  alt={`Product thumbnail ${index + 1}`}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}