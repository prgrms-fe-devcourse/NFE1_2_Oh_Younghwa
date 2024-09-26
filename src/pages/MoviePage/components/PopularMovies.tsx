import { usePopularMovies } from '../hooks/usePopularMovies';

import '../scss/PopularMovies.scss';
import MovieListContainer from './MovieListContainer';
export default function PopularMovies() {
  const { data = { page: 0, results: [], total_pages: 0, total_results: 0 }, isError, isLoading } = usePopularMovies();

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>에러 발생</div>;

  return <MovieListContainer data={data} />;
}
