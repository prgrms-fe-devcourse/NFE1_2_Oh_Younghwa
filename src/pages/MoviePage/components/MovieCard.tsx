import { Link } from 'react-router-dom';

import { POSTER_IMAGE_BASE_URL } from '../../../shared/utils/baseUrl';
import { Movie } from '../model/movie';

type MovieCardProps = {
  movie: Movie;
};
export default function MovieCard({ movie }: MovieCardProps) {
  return (
    <Link className="a-movie-card" to={`/movie/detail`} state={{ movie: movie.id }}>
      <div key={movie.id} className="movie-card">
        <img className="movie-poster" src={POSTER_IMAGE_BASE_URL + movie.poster_path} alt={movie.title} />
        <div className="movie-info">
          <h3 className="movie-title">{movie.title}</h3>
          <p className="movie-release">{movie.release_date}</p>
        </div>
      </div>
    </Link>
  );
}
