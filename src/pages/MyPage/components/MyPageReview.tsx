import { Link } from 'react-router-dom';

import StarIcon from '../../../shared/components/atom/icons/StarIcon';
import { useMoveToMovie } from '../hooks/useMoveToMovie';

type ReviewProps = {
  rating: number;
  review: string;
  author: string;
  createdAt: string;
  title: string;
};
//isLiked.length,likes.length

export default function MyPageReview({ rating, review, author, createdAt, title }: ReviewProps) {
  const { data } = useMoveToMovie(title);


  const titleStyle: React.CSSProperties = {
    position: 'absolute',
    fontSize: 12,
    color: '#b4b4b4',
    marginBottom: 10,
    right: 20,
  };

  return (
    <div className="review-container">
      <Link to={`/movie/detail`} state={{ movie: data?.results[0].id }}>
        <div className="review-movie-title" style={titleStyle}>
          {title}
        </div>
      </Link>
      <div className="stars">
        {[...Array(rating)].map((_, i) => (
          <StarIcon key={i} />
        ))}
      </div>
      <p className="review-text">{review}</p>
      <div className="review-footer">
        <span className="reviewer">{author}</span>
        <span className="review-date">{createdAt}</span>
      </div>
    </div>
  );
}
