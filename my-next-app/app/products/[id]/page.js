import Image from 'next/image';
import { notFound } from 'next/navigation';
import ProductGallery from '../../../components/ProductGallery';

async function getProduct(id) {
  const res = await fetch(`https://next-ecommerce-api.vercel.app/products/${id}`);
  
  if (!res.ok) {
    throw new Error('Failed to fetch product');
  }
 
  return res.json();
}

export default async function ProductPage({ params }) {
  try {
    const product = await getProduct(params.id);

    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ProductGallery images={product.images} />
          <div>
            <p className="text-2xl font-semibold mb-4">${product.price.toFixed(2)}</p>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <p className="text-sm text-gray-500 mb-4">Category: {product.category}</p>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    notFound();
  }
}