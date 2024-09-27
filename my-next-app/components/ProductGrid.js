ProductGrid component to handle the responsive layout you requested. Let's start with the ProductCard:


React Component: Product Card
Click to open component
Now, let's create a new ProductGrid component to handle the responsive layout you requested:


React Component: Responsive Product Grid
Click to open component
This ProductGrid component achieves the layout you requested:

It uses a grid layout with grid-cols-2 for small screens (2 columns) and md:grid-cols-3 for medium screens and above (3 columns).
Each ProductCard is wrapped in a div with className="w-full" to ensure it fills its grid cell.
The gap-4 class adds some space between the grid items.
To use these components in your page, you would do something like this:

jsx

Copy
import ProductGrid from './components/ProductGrid';

export default function ProductPage({ products }) {
  return (
    <div>
      <h1>Our Products</h1>
      <ProductGrid products={products} />
    </div>
  );
}
This implementation will:

Display products in 2 columns on small screens (mobile devices)
Switch to 3 columns on medium screens and larger (tablets and desktops)
Maintain consistent spacing between items
Allow each ProductCard to fill the width of its grid cell
The ProductCard component remains largely the same as you provided, with one small change:

Changed w-64 to w-full in the outer div's className to allow it to fill its grid cell.
This setup should give you the responsive layout you requested while maintaining the design and functionality of the individual ProductCards. Would you like me to explain any part of the code further or make any additional adjustments?

Copy
Retry



Claude can make mistakes. Please double-check responses.



No file chosen


3.5 Sonnet
Subscribe to Pro for 5x more usage with Claude 3.5 Sonnet.

Subscribe to Pro


React Component: Responsive Product Grid
Preview
Code

import React from 'react';
import ProductCard from './ProductCard';

export default function ProductGrid({ products }) {
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
}