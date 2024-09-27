import { ChangeEvent, useState } from 'react';

import MovieSearchInput from './components/MovieSearchInput';
import PopularMovies from './components/PopularMovies';
import SearchResult from './components/SearchResult';

import './scss/moviePage.scss';

export default function MoviePage() {
  /**
   * 검색어 상태를 여기서 관리하고, 검색어 변경 함수를 MovieSearchInput 컴포넌트로 전달
   * 검색어가 변경되면 검색어를 사용하여 영화 검색 API 호출
   * 검색어가 있다면 <SearchResult /> 컴포넌트를 렌더링
   * 검색어가 없다면 <PopularMovies /> 컴포넌트를 렌더링
   */
  const [searchKeyword, setSearchKeyword] = useState('');
  const handleSearchKeyword = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
  };
  const isNull = searchKeyword === '';

  return (
    <>
      <MovieSearchInput handleSearchKeyword={handleSearchKeyword} />
      {isNull ? <PopularMovies /> : <SearchResult searchKeyword={searchKeyword} />}
    </>
  );
}
