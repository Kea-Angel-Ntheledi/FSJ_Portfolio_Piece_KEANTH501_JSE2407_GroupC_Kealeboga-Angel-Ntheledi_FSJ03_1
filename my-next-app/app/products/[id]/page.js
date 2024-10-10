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

  // State for new review form
  const [newReview, setNewReview] = useState({
    user: "",
    rating: 0,
    comment: ""
  });

  // State for editing review
  const [editReviewIndex, setEditReviewIndex] = useState(null);
  const [editReview, setEditReview] = useState({
    user: "",
    rating: 0,
    comment: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReview({ ...newReview, [name]: value });
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();

    const newReviewWithDate = {
      ...newReview,
      date: new Date().toISOString(), // Add current date
      rating: parseFloat(newReview.rating)
    };

    // Update the reviews list locally (In a real app, this would also be persisted to a backend like Firebase)
    setReviews([newReviewWithDate, ...reviews]);
    setNewReview({ user: "", rating: 0, comment: "" }); // Clear the form after submission
  };

  const handleEditReviewChange = (e) => {
    const { name, value } = e.target;
    setEditReview({ ...editReview, [name]: value });
  };

  const handleEditReviewSubmit = (e) => {
    e.preventDefault();
    const updatedReview = { ...editReview, date: new Date().toISOString() };
    
    const updatedReviews = [...reviews];
    updatedReviews[editReviewIndex] = updatedReview;

    setReviews(updatedReviews);
    setEditReviewIndex(null);
    setEditReview({ user: "", rating: 0, comment: "" });
  };

  const handleDeleteReview = (index) => {
    const updatedReviews = reviews.filter((_, i) => i !== index);
    setReviews(updatedReviews);
  };

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
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-8">
        <h3 className="text-2xl font-semibold mb-4">Reviews</h3>

        {/* Sorting options */}
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

        {/* Add new review form */}
        <form onSubmit={handleReviewSubmit} className="mb-8">
          <h4 className="text-xl font-semibold mb-4">Write a Review</h4>
          <div className="mb-4">
            <label htmlFor="user" className="block mb-2">Name:</label>
            <input
              type="text"
              id="user"
              name="user"
              value={newReview.user}
              onChange={handleInputChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="rating" className="block mb-2">Rating (0 to 5):</label>
            <input
              type="number"
              id="rating"
              name="rating"
              value={newReview.rating}
              onChange={handleInputChange}
              min="0"
              max="5"
              step="0.1"
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="comment" className="block mb-2">Comment:</label>
            <textarea
              id="comment"
              name="comment"
              value={newReview.comment}
              onChange={handleInputChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Submit Review
          </button>
        </form>

        {/* Display reviews */}
        {reviews.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          reviews.map((review, index) => (
            <div key={index} className="border border-gray-300 p-4 mb-4 rounded">
              <p className="font-semibold">{review.user} - {new Date(review.date).toLocaleDateString()}</p>
              <p>Rating: {review.rating} / 5</p>
              <p>{review.comment}</p>
              <button
                onClick={() => {
                  setEditReviewIndex(index);
                  setEditReview({ user: review.user, rating: review.rating, comment: review.comment });
                }}
                className="text-blue-500 mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteReview(index)}
                className="text-red-500"
              >
                Delete
              </button>
            </div>
          ))
        )}

        {/* Edit review form */}
        {editReviewIndex !== null && (
          <form onSubmit={handleEditReviewSubmit} className="mb-8">
            <h4 className="text-xl font-semibold mb-4">Edit Review</h4>
            <div className="mb-4">
              <label htmlFor="edit-user" className="block mb-2">Name:</label>
              <input
                type="text"
                id="edit-user"
                name="user"
                value={editReview.user}
                onChange={handleEditReviewChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="edit-rating" className="block mb-2">Rating (0 to 5):</label>
              <input
                type="number"
                id="edit-rating"
                name="rating"
                value={editReview.rating}
                onChange={handleEditReviewChange}
                min="0"
                max="5"
                step="0.1"
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="edit-comment" className="block mb-2">Comment:</label>
              <textarea
                id="edit-comment"
                name="comment"
                value={editReview.comment}
                onChange={handleEditReviewChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Update Review
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
