import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function ProductCard({ product }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = (e) => {
    e.preventDefault();
    setCurrentImageIndex((prevIndex) => 
      (prevIndex + 1) % product.images.length
    );
  };

  const prevImage = (e) => {
    e.preventDefault();
    setCurrentImageIndex((prevIndex) => 
      (prevIndex - 1 + product.images.length) % product.images.length
    );
  };

  return (
    <Link href={`/products/${product.id}`} className="border rounded-lg overflow-hidden shadow-lg block">
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
        <p className="text-sm text-gray-500 mb-2">{product.category}</p>
        <div className="flex items-center">
          <span className="text-yellow-400 mr-1">★</span>
          <span>{product.rating.toFixed(1)}</span>
        </div>
      </div>
    </Link>
  );
}