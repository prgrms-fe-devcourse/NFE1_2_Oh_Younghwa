import { useState } from 'react';

import '../scss/StarRating.scss';
type StarIconProps = {
  filled: boolean;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
};
const StarIcon = ({ filled, onClick, onMouseEnter, onMouseLeave }: StarIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox={'0 0 24 24'}
    className={`star ${filled ? 'filled' : ''}`}
    onClick={onClick}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
  >
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

type StarRatingProps = {
  setFormData: (rating: number) => void;
  rating: number;
  hover: number;
  setHover: (rating: number) => void;
};
const StarRating = ({ setFormData, rating, hover, setHover }: StarRatingProps) => {
  const onRatingChange = (rating: number) => {
    setFormData(rating);
  };

  return (
    <div className="star-rating">
      {[...Array(5)].map((_, index) => {
        const starValue = index + 1;
        return (
          <StarIcon
            key={index}
            filled={starValue <= (hover || rating)}
            onClick={() => onRatingChange(starValue)}
            onMouseEnter={() => setHover(starValue)}
            onMouseLeave={() => setHover(rating)}
          />
        );
      })}
      {/* <span className="rating-text">{rating}/5</span> */}
    </div>
  );
};

export default StarRating;
