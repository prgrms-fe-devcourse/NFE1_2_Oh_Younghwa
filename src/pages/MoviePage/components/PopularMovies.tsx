import { useMovieAws } from '../hooks/useMovieAws';

import MovieListContainer from './MovieListContainer';
import SearchLoadPage from './SearchLoadPage';

import '../scss/PopularMovies.scss';

export default function PopularMovies() {
  const { data: awsData, isError: awsIsError, isLoading: awsIsLoading } = useMovieAws();
  if (awsIsLoading) return <SearchLoadPage />;
  if (awsData === undefined) return <SearchLoadPage />;
  return <MovieListContainer data={awsData} />;
}
