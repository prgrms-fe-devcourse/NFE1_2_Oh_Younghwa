import { usePopularMovies } from '../hooks/usePopularMovies';

import MovieListContainer from './MovieListContainer';

import '../scss/PopularMovies.scss';
import SearchLoadPage from './SearchLoadPage';
import { useMovieAws } from '../hooks/useMovieAws';
export default function PopularMovies() {
  const { data = { page: 0, results: [], total_pages: 0, total_results: 0 }, isError, isLoading } = usePopularMovies();
  console.log('🚀 ~ PopularMovies ~ data:', data);
  const { data: awsData, isError: awsIsError, isLoading: awsIsLoading } = useMovieAws();
  console.log(awsData);
  if (isLoading) return <SearchLoadPage />;
  if (isError) return <div>에러 발생</div>;

  return <MovieListContainer data={data} />;
}
