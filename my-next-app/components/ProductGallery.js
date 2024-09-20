'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function ProductGallery({ images }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      (prevIndex + 1) % images.length
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <div className="relative">
      <div className="aspect-w-1 aspect-h-1">
        <Image
          src={images[currentImageIndex]}
          alt={`Product image ${currentImageIndex + 1}`}
          layout="fill"
          objectFit="cover"
        />
      </div>
      {images.length > 1 && (
        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-3 h-3 rounded-full ${
                index === currentImageIndex ? 'bg-blue-500' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      )}
      {images.length > 1 && (
        <>
          <button onClick={prevImage} className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2">
            &#8249;
          </button>
          <button onClick={nextImage} className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2">
            &#8250;
          </button>
        </>
      )}
    </div>
  );
}
