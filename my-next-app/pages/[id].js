import ProductDetailPage from '@/components/ProductDetailPage';

export default function ProductPage({ product }) {
  return <ProductDetailPage product={product} />;
}

export async function getServerSideProps(context) {
  const { id } = context.params;
  
  try {
    // Fetch product data
    const res = await fetch(`https://next-ecommerce-api.vercel.app/products/${id}`);
    if (!res.ok) {
      throw new Error('Failed to fetch product');
    }
    const product = await res.json();

    return {
      props: { product },
    };
  } catch (error) {
    console.error('Error fetching product:', error);
    return {
      notFound: true,
    };
  }
}