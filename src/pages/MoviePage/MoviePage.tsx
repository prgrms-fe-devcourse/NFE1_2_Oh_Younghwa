import { ChangeEvent, useState } from 'react';

import MovieSearchInput from './components/MovieSearchInput';
import PopularMovies from './components/PopularMovies';
import SearchResult from './components/SearchResult';

import './scss/moviePage.scss';

export default function MoviePage() {
  const [searchKeyword, setSearchKeyword] = useState('');
  const handleSearchKeyword = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
  };
  const isNull = searchKeyword === '';

  return (
    <div className="scroll-container">
      <MovieSearchInput handleSearchKeyword={handleSearchKeyword} />
      {isNull ? <PopularMovies /> : <SearchResult searchKeyword={searchKeyword} />}
    </div>
  );
}
