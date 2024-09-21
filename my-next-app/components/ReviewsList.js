"use client";

import { useState } from 'react';

export default function ReviewsList({ reviews: initialReviews }) {
  const [reviews, setReviews] = useState(initialReviews);
  const [sortBy, setSortBy] = useState('date');

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
            <h3 className="font-semibold">{review.user}</h3>
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