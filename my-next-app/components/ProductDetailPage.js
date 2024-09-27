import React from 'react';
import { useRouter } from 'next/router';
import ProductGallery from './ProductGallery';
import Image from 'next/image';
import Head from 'next/head';

export default function ProductDetailPage({ product }) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Head>
        <title>{product.title} - Your Store Name</title>
        <meta name="description" content={product.description} />
        <meta property="og:title" content={product.title} />
        <meta property="og:description" content={product.description} />
        <meta property="og:image" content={product.images[0] ? product.images[0].src : '/placeholder-image.jpg'} />
        <meta property="og:url" content={`https://yourwebsite.com/products/${product.id}`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={product.title} />
        <meta name="twitter:description" content={product.description} />
        <meta name="twitter:image" content={product.images[0] ? product.images[0].src : '/placeholder-image.jpg'} />
      </Head>

      <button
        onClick={() => router.back()}
        className="mb-4 px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
      >
        ← Back to Products
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          {product.images && product.images.length > 0 ? (
            <ProductGallery images={product.images} />
          ) : (
            <div className="aspect-w-1 aspect-h-1 w-full">
              <Image
                src="/placeholder-image.jpg"
                alt={product.title}
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
          )}
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          <p className="text-xl font-semibold mb-2">${product.price.toFixed(2)}</p>
          <p className="text-gray-600 mb-4">Category: {product.category}</p>
          <div className="flex items-center mb-4">
            <span className="text-yellow-400 mr-1">★</span>
            <span>{product.rating.toFixed(1)}</span>
          </div>
          <p className="text-gray-700 mb-4">{product.description}</p>
          <p className="text-gray-600">Tags: {product.tags.join(', ')}</p>
          <p className="text-gray-600 mt-2">Stock: {product.stock} available</p>
        </div>
      </div>
    </div>
  );
}


// Dynamic Meta Tags: The title and description meta tags are dynamically set based on the product's details.
// Open Graph Tags: These help with social media sharing.
// Twitter Cards: Enhance visibility when shared on Twitter.