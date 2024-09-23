"use client";

import React, { useState } from 'react';
import Image from 'next/image';

export default function ProductGallery({ images }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div>
      <div className="aspect-w-1 aspect-h-1 w-full mb-4">
        <Image
          src={images[currentImageIndex]}
          alt={`Product image ${currentImageIndex + 1}`}
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>
      {images.length > 1 && (
        <div className="flex space-x-2 overflow-x-auto">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`flex-shrink-0 w-20 h-20 relative ${
                index === currentImageIndex ? 'ring-2 ring-blue-500' : ''
              }`}
            >
              <Image
                src={image}
                alt={`Product thumbnail ${index + 1}`}
                layout="fill"
                objectFit="cover"
                className="rounded-md"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}