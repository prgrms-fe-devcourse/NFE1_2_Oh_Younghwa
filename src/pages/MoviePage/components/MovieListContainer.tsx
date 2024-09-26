import { Movie, MovieListResponse } from '../model/movie';

import MovieCard from './MovieCard';
type MovieList = {
  data: MovieListResponse;
};
export default function MovieListContainer({ data }: MovieList) {
  if (data === undefined) return <div>로딩 중...</div>;
  return (
    <div className="movie-list-container">
      <h2 className="movie-list-title">박스오피스 순위</h2>
      <div className="movie-list">
        {data.results.map((movie: Movie) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </div>
    </div>
  );
}
