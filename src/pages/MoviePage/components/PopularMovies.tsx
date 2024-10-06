
import MovieListContainer from './MovieListContainer';

import '../scss/PopularMovies.scss';
import { useMovieAws } from '../hooks/useMovieAws';
import SearchLoadPage from './SearchLoadPage';

export default function PopularMovies() {
  const { data: awsData, isError: awsIsError, isLoading: awsIsLoading } = useMovieAws();
  if (awsIsLoading) return <SearchLoadPage />;
  if (awsData === undefined) return <SearchLoadPage />;
  return <MovieListContainer data={awsData} />;
}
