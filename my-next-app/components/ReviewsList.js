export default function ReviewsList({ reviews }) {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
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
