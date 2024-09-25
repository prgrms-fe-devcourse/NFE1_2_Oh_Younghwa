import { POSTER_IMAGE_BASE_URL } from '../../../shared/utils/baseUrl';
import { usePopularMovies } from '../hooks/usePopularMovies';
import { Movie } from '../model/movie';

import '../scss/moviePage.scss';
const PopularMovies: React.FC = () => {
  const { data, isError, isLoading } = usePopularMovies();

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>에러 발생</div>;

  return (
    <>
      <div className="movie-grid">
        {data?.results.map((movie: Movie) => (
          <div key={movie.id} className="movie-card">
            <img
              style={{ objectFit: 'contain', width: '150px' }}
              src={POSTER_IMAGE_BASE_URL + movie.poster_path}
              alt={movie.title}
            />{' '}
            <div className="movie-info">
              <h3>{movie.title}</h3>
              <p>개봉 {movie.release_date}일째</p>
              {/* <p>누적 관객 {movie.viewers}명</p> */}
            </div>
            {/* {movie.rank && <span className="rank">{movie.rank}</span>} */}
          </div>
        ))}
      </div>
    </>
  );
};

export default PopularMovies;
