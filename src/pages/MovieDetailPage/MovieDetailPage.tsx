import { useLocation } from 'react-router-dom';

import { POSTER_IMAGE_BASE_URL } from '../../shared/utils/baseUrl';
import { Movie } from '../MoviePage/model/movie';

import ReviewForm from './components/ReviewForm';
import ReviewList from './components/ReviewList';

import './scss/MovieDetailPage.scss';
import { useMovieDetailData } from './hook/useMovieDetailData';
import SearchLoadPage from '../MoviePage/components/SearchLoadPage';

export default function MovieDetailPage() {
  const location = useLocation(); // useLocation은 제네릭 타입을 받지 않음
  const state = location.state.movie; // state의 타입을 명시적으로 지정

  const { data: movieData, isError, isLoading } = useMovieDetailData(state);
  if (isLoading) return <SearchLoadPage />;
  if (movieData === undefined) return <div>데이터가 없습니다.</div>;
  return (
    <div className="scroll-container">
      <div className="detail-section">
        <img className="detail-image" src={POSTER_IMAGE_BASE_URL + movieData.posterPath} alt={movieData.title} />
        <div className="detail-info">
          <h3 className="detail-title">{movieData.title}</h3>
          <p className="detail-description">
            {movieData.releaseDate}﹒
            {movieData.genreArray?.map((genre, i) => ` ${genre}${i < movieData.genreArray?.length - 1 ? '/' : ' '}`)}﹒
            {movieData.originCountry}
            <br />
            {movieData.runtime}
          </p>
        </div>
      </div>
      <ReviewForm title={movieData.title} />
      <ReviewList title={movieData.title} />
    </div>
  );
}
