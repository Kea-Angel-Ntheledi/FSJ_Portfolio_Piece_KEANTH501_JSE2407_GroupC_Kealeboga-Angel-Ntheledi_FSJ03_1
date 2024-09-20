'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function ProductCard({ product }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      (prevIndex + 1) % product.images.length
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      (prevIndex - 1 + product.images.length) % product.images.length
    );
  };

  return (
    <div className="border rounded-lg overflow-hidden shadow-lg">
      <div className="relative h-48">
        <Image
          src={product.images[currentImageIndex]}
          alt={product.title}
          layout="fill"
          objectFit="cover"
        />
        {product.images.length > 1 && (
          <>
            <button onClick={prevImage} className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-1">
              &#8249;
            </button>
            <button onClick={nextImage} className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-1">
              &#8250;
            </button>
          </>
        )}
      </div>
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-2">{product.title}</h2>
        <p className="text-gray-600 mb-2">${product.price.toFixed(2)}</p>
        <p className="text-sm text-gray-500 mb-4">{product.category}</p>
        <Link href={`/products/${product.id}`} className="text-blue-500 hover:underline">
          View Details
        </Link>
      </div>
    </div>
  );
}
