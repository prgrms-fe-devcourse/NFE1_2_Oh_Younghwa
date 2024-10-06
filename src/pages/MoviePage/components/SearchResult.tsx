import { useEffect, useState } from 'react';

import useDebounce from '../../../shared/hooks/useDebounce';
import { useSearchedMovies } from '../hooks/useSearchMovies';

import MovieListContainer from './MovieListContainer';
import NoResult from './NoResult';
import SearchLoadPage from './SearchLoadPage';

type MovieSearchResultProps = {
  searchKeyword: string;
};

export default function MovieSearchResult({ searchKeyword }: MovieSearchResultProps) {
  const debouncedSearchKeyword = useDebounce(searchKeyword, 500);
  const { data = [], isError, isLoading } = useSearchedMovies(debouncedSearchKeyword);
  console.log(data);
  const isNull = data?.length === 0;
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
  // return <>{showNoDataMessage ? <NoResult /> : <> </>}</>;
}
