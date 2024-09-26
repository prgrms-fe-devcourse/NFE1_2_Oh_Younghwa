import MovieSearchIcon from '../../shared/components/atom/icons/MovieSearchIcon';

import PopularMovies from './components/PopularMovies';

import './scss/moviePage.scss';
export default function MoviePage() {
  return (
    <div className="movie-list">
      <h1>영화정보</h1>
      <div className="search-bar">
        <MovieSearchIcon />
        <input type="text" placeholder="영화제목검색" />
      </div>
      <h2>박스오피스 순위</h2>
      <PopularMovies />
    </div>
  );
}
