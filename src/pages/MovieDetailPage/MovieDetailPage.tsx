import { useLocation } from 'react-router-dom';
import { POSTER_IMAGE_BASE_URL } from '../../shared/utils/baseUrl';
import './scss/MovieDetailPage.scss';
import { Movie } from '../MoviePage/model/movie';
import ReviewForm from './components/ReviewForm';
import ReviewList from './components/ReviewList';

export default function MovieDetailPage() {
  const location = useLocation(); // useLocation은 제네릭 타입을 받지 않음
  const state = location.state.movie as Movie; // state의 타입을 명시적으로 지정

  return (
    <div className="scroll-container">
      <div className="detail-section">
        <img className="detail-image" src={POSTER_IMAGE_BASE_URL + state.poster_path} alt={state.title} />
        <div className="detail-info">
          <h3 className="detail-title">{state.title}</h3>
          <p className="detail-description">
            {state.release_date} · 범죄/액션/드라마 · 한국 <br></br> 1시간 58분 · 15세 <br></br>
            황정민﹒정해인﹒안보현﹒장윤주
          </p>
        </div>
      </div>
      <ReviewForm title={state.title} />
      <ReviewList title={state.title} />
    </div>
  );
}
