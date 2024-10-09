"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";

const API_URL = "https://next-ecommerce-api.vercel.app/products";

export default function ProductDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [dateSortOption, setDateSortOption] = useState("");
  const [ratingSortOption, setRatingSortOption] = useState("");

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const res = await fetch(`${API_URL}/${id}`);
        if (!res.ok) throw new Error("Failed to fetch product");
        const data = await res.json();
        setProduct(data);
        setReviews(data.reviews || []);
        setError(null);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchProduct();
  }, [id]);

  const sortReviews = () => {
    let sortedReviews = [...reviews];

    if (dateSortOption === "newest") {
      sortedReviews.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (dateSortOption === "oldest") {
      sortedReviews.sort((a, b) => new Date(a.date) - new Date(b.date));
    }

    if (ratingSortOption === "rating-high") {
      sortedReviews.sort((a, b) => b.rating - a.rating);
    } else if (ratingSortOption === "rating-low") {
      sortedReviews.sort((a, b) => a.rating - b.rating);
    }

    setReviews(sortedReviews);
  };

  useEffect(() => {
    sortReviews();
  }, [dateSortOption, ratingSortOption]);

  if (error) return <p className="text-center text-red-500">Error: {error}</p>;
  if (!product) return <p className="text-center">No product found.</p>;

  const images = product.images || [];
  const currentImage = images[currentImageIndex];

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const updateUrl = (searchQuery, selectedCategory, sortOrder, page) => {
    router.push(`/products?search=${searchQuery || ''}&category=${selectedCategory || ''}&sortby=${sortOrder}&page=${page}`);
  };

  return (
    <div className="container mx-auto p-4">
      <button
        onClick={() => router.back()}
        className="bg-gray-300 text-black px-4 py-2 rounded mb-4"
      >
        Back
      </button>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 relative h-96">
          {currentImage && (
            <Image
              src={currentImage}
              alt={product.title}
              fill
              style={{ objectFit: "contain" }}
              className="rounded-lg border-4 border-gray-300"
            />
          )}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-4">
              <button
                onClick={prevImage}
                className="bg-gray-300 text-black px-4 py-2 rounded"
              >
                Previous
              </button>
              <button
                onClick={nextImage}
                className="bg-gray-300 text-black px-4 py-2 rounded"
              >
                Next
              </button>
            </div>
          )}
        </div>
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-4">{product.title}</h2>
            <p className="text-gray-700 mb-6">{product.description}</p>
            <p className="text-lg font-semibold mb-6">Price: ${product.price}</p>
            <p className="text-sm text-gray-600 mb-2">Category: {product.category}</p>
            <p className="text-sm text-gray-600">Tags: {product.tags.join(", ")}</p>
          </div>

          <div className="h-24 bg-gray-200 mt-4"></div>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-2xl font-semibold mb-4">Reviews</h3>

        <div className="mb-4">
          <label htmlFor="sort-date" className="mr-2">Sort by Date:</label>
          <select
            id="sort-date"
            value={dateSortOption}
            onChange={(e) => setDateSortOption(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          >
            <option value="">Default</option>
            <option value="newest">Date (Newest)</option>
            <option value="oldest">Date (Oldest)</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="sort-rating" className="mr-2">Sort by Rating:</label>
          <select
            id="sort-rating"
            value={ratingSortOption}
            onChange={(e) => setRatingSortOption(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          >
            <option value="">Default</option>
            <option value="rating-high">Rating (Highest to Lowest)</option>
            <option value="rating-low">Rating (Lowest to Highest)</option>
          </select>
        </div>

        {reviews.length > 0 ? (
          <div className="space-y-4">
            {reviews.map((review, index) => (
              <div key={index} className="border p-4 rounded-md shadow-sm">
                <p className="text-gray-800 font-semibold">{review.user}</p>
                <p className="text-sm text-gray-600">{review.comment}</p>
                <p className="text-sm text-yellow-500">Rating: {review.rating} / 5</p>
                <p className="text-sm text-gray-400">{new Date(review.date).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No reviews yet.</p>
        )}
      </div>
    </div>
  );
}
