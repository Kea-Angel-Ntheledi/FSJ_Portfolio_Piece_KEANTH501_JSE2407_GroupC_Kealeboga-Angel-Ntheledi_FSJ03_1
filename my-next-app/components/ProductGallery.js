"use client";

import React, { useState } from 'react';
import Image from 'next/image';

export default function ProductGallery({ images }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col space-y-4">
      <div className="relative aspect-square w-full overflow-hidden rounded-lg">
        <Image
          src={images[currentImageIndex]}
          alt={`Product image ${currentImageIndex + 1}`}
          layout="fill"
          objectFit="cover"
          className="transition-all duration-300 ease-in-out"
        />
      </div>
      {images.length > 1 && (
        <div className="flex space-x-2 overflow-x-auto">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`flex-shrink-0 relative w-20 h-20 rounded-md overflow-hidden ${
                index === currentImageIndex ? 'ring-2 ring-blue-500' : ''
              }`}
            >
              <Image
                src={image}
                alt={`Product thumbnail ${index + 1}`}
                layout="fill"
                objectFit="cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}