import ProductDetailPage from '../../components/ProductDetailPage';

export default function ProductPage({ product }) {
  return <ProductDetailPage product={product} />;
}

export async function getServerSideProps({ params }) {
  // Fetch the product data using the ID from params
  const res = await fetch(`https://your-api.com/products/${params.id}`);
  const product = await res.json();

  return { props: { product } };
}