import { useState, useEffect } from 'react';
import useDebounce from '../../../shared/hooks/useDebounce';
import { useSearchedMovies } from '../hooks/useSearchMovies';

import MovieListContainer from './MovieListContainer';
import SearchLoadPage from './SearchLoadPage';
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

  const isNull = data?.results.length === 0;
  const [showNoDataMessage, setShowNoDataMessage] = useState(false);

  useEffect(() => {
    if (isNull) {
      const timer = setTimeout(() => {
        setShowNoDataMessage(true);
      }, 1000); // 1초 후에 메시지 표시

      return () => clearTimeout(timer); // 컴포넌트가 unmount되면 타이머 정리
    } else {
      setShowNoDataMessage(false); // 데이터가 있을 경우 메시지 숨김
    }
  }, [isNull]);

  if (isLoading) {
    return <SearchLoadPage />;
  }

  if (isError) return <div>에러 발생</div>;

  return <>{showNoDataMessage ? <NoResult /> : <MovieListContainer data={data} />}</>;
}
