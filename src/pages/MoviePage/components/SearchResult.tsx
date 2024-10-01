import useDebounce from '../../../shared/hooks/useDebounce';
import { useSearchedMovies } from '../hooks/useSearchMovies';

import MovieListContainer from './MovieListContainer';
import SearchLoadPage from './SearchLoadPage';
type MovieSearchResultProps = {
  searchKeyword: string;
};
export default function MovieSearchResult({ searchKeyword }: MovieSearchResultProps) {
  const debouncedSearchKeyword = useDebounce(searchKeyword, 500);
  const {
    data = { page: 0, results: [], total_pages: 0, total_results: 0 },
    isError,
    isLoading,
  } = useSearchedMovies(debouncedSearchKeyword);

  const isNull = data?.results.length === 0;

  if (isLoading) {
    return <SearchLoadPage />;
  }

  if (isError) return <div>에러 발생</div>;

  return <>{isNull ? <></> : <MovieListContainer data={data} />}</>;
}
