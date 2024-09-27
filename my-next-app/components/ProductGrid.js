import React from 'react';
import ProductCard from './ProductCard';

/**
 * ProductGrid component displays a grid of ProductCard components.
 *
 * @param {Object} props - The component props.
 * @param {Array<Object>} props.products - An array of product objects to be displayed.
 * @param {string} props.products[].id - The unique identifier for the product.
 * @param {string} props.products[].title - The title of the product.
 * @param {Array<string>} props.products[].images - An array of image URLs for the product.
 * @param {number} props.products[].price - The price of the product.
 * @param {string} props.products[].category - The category of the product.
 * @param {number} props.products[].rating - The average rating of the product.
 * @param {string} props.products[].description - A detailed description of the product.
 * @param {Array<string>} props.products[].tags - An array of tags associated with the product.
 * @param {number} props.products[].stock - The number of available items in stock.
 * @returns {JSX.Element} The rendered ProductGrid component.
 */
const ProductGrid = ({ products }) => {
  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product.id} className="w-full">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
