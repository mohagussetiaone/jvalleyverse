const StarRating = ({ rating }) => {
  const totalStars = 5;
  const filledStars = Math.floor(rating);
  const partialStar = rating - filledStars;

  return (
    <div className="relative w-5 h-5 flex items-center">
      {/* Base star outline */}
      <div className="relative w-full h-full">
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-gray-300" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2">
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.62L12 2 9.19 8.62 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        </div>

        {/* Filled star */}
        <div
          className="absolute top-0 left-0 w-full h-full overflow-hidden"
          style={{
            clipPath: `inset(0 ${100 - (rating / totalStars) * 100}% 0 0)`,
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-yellow-500" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2">
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.62L12 2 9.19 8.62 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        </div>

        {/* Partial fill */}
        {partialStar > 0 && (
          <div
            className="absolute top-0 left-0 w-full h-full overflow-hidden"
            style={{
              clipPath: `inset(0 ${100 - (partialStar / totalStars) * 100}% 0 0)`,
              transform: `scaleX(${partialStar})`,
              transformOrigin: "left",
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-yellow-500" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.62L12 2 9.19 8.62 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
};

export default StarRating;
