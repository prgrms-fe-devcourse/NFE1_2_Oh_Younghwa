import { useMovieAws } from '../hooks/useMovieAws';
import { MovieListResponse } from '../model/movie';

import MovieCard from './MovieCard';
import SearchLoadPage from './SearchLoadPage';
type MovieListContainerProps = {
  data: MovieListResponse[];
};
export default function MovieListContainer({ data }: MovieListContainerProps) {
  return (
    <div className="movie-list-container">
      <h2 className="movie-list-title">박스오피스 순위</h2>
      <div className="movie-list">
        {data.map((movie: MovieListResponse) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </div>
    </div>
  );
}
