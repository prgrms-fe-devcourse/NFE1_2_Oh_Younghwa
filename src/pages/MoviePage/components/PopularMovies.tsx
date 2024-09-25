import { POSTER_IMAGE_BASE_URL } from '../../../shared/utils/baseUrl';
import { usePopularMovies } from '../hooks/usePopularMovies';
import { Movie } from '../model/movie';

import '../scss/PopularMovies.scss';
const PopularMovies: React.FC = () => {
  const { data, isError, isLoading } = usePopularMovies();

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>에러 발생</div>;

  return (
    <div className="movie-list-container">
      <h2 className="movie-list-title">박스오피스 순위</h2>
      <div className="movie-list">
        {data?.results.map((movie: Movie) => (
          <div key={movie.id} className="movie-card">
            <img className="movie-poster" src={POSTER_IMAGE_BASE_URL + movie.poster_path} alt={movie.title} />
            <div className="movie-info">
              <h3 className="movie-title">{movie.title}</h3>
              <p className="movie-release">{movie.release_date}</p>
              {/* <p>누적 관객 {movie.viewers}명</p> */}
            </div>
            {/* {movie.rank && <span className="rank">{movie.rank}</span>} */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularMovies;
