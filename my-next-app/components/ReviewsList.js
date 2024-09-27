"use client";

import { useState } from 'react';

/**
 * ReviewsList component displays a list of customer reviews and allows sorting by date or rating.
 *
 * @param {Object} props - The component props.
 * @param {Array<Object>} props.reviews - An array of review objects to be displayed.
 * @param {string} props.reviews[].name - The name of the reviewer.
 * @param {string} props.reviews[].date - The date of the review in ISO format.
 * @param {number} props.reviews[].rating - The rating given by the reviewer (0 to 5).
 * @param {string} props.reviews[].comment - The review comment.
 * @returns {JSX.Element} The rendered ReviewsList component.
 */
export default function ReviewsList({ reviews: initialReviews }) {
  const [reviews, setReviews] = useState(initialReviews);
  const [sortBy, setSortBy] = useState('date');

  /**
   * Handles sorting of reviews based on the selected type (date or rating).
   *
   * @param {string} type - The type to sort by ('date' or 'rating').
   */
  const handleSort = (type) => {
    setSortBy(type);
    const sortedReviews = [...reviews].sort((a, b) => {
      if (type === 'date') {
        return new Date(b.date) - new Date(a.date);
      } else {
        return b.rating - a.rating;
      }
    });
    setReviews(sortedReviews);
  };

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Customer Reviews</h2>
        <div>
          <button
            onClick={() => handleSort('date')}
            className={`mr-2 px-3 py-1 rounded ${
              sortBy === 'date' ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
          >
            Sort by Date
          </button>
          <button
            onClick={() => handleSort('rating')}
            className={`px-3 py-1 rounded ${
              sortBy === 'rating' ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
          >
            Sort by Rating
          </button>
        </div>
      </div>
      {reviews.map((review, index) => (
        <div key={index} className="border-b pb-4 mb-4 last:border-b-0">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold">{review.name}</h3>
            <span className="text-sm text-gray-500">{new Date(review.date).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center mb-2">
            <span className="text-yellow-400 mr-1">★</span>
            <span>{review.rating.toFixed(1)}</span>
          </div>
          <p>{review.comment}</p>
        </div>
      ))}
    </div>
  );
}
