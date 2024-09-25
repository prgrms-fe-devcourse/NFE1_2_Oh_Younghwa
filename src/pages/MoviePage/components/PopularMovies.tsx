import { useState } from 'react';

import { POSTER_IMAGE_BASE_URL } from '../../../shared/utils/baseUrl';
import { usePopularMovies } from '../hooks/usePopularMovies';
import { Movie } from '../model/movie';

const PopularMovies: React.FC = () => {
  const [page, setPage] = useState(1);
  const { data, isError, isLoading } = usePopularMovies(page);

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>에러 발생</div>;

  return (
    <ul>
      <button onClick={() => setPage((prev) => prev + 1)}>adsf</button>
      {data?.results.map((movie: Movie) => (
        <li key={movie.id} style={{ display: 'flex' }}>
          <img
            style={{ objectFit: 'contain', width: '150px' }}
            src={POSTER_IMAGE_BASE_URL + movie.poster_path}
            alt={movie.title}
          />
          <p>{movie.title}</p>
        </li>
      ))}
    </ul>
  );
};

export default PopularMovies;
