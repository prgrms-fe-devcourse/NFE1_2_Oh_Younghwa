import useDebounce from '../../../shared/hooks/useDebounce';
import { useSearchedMovies } from '../hooks/useSearchMovies';

import MovieListContainer from './MovieListContainer';
import NoResult from './NoResult';

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
  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>에러 발생</div>;

  const isNull = data?.results.length === 0;
  return <>{isNull ? <NoResult /> : <MovieListContainer data={data} />}</>;
}
