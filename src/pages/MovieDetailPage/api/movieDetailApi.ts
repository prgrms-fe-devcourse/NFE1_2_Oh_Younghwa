import { movieApiAxiosClient } from '../../../shared/utils/axiosClient';
import { MovieDetail } from '../../MoviePage/model/movie';

export const getMovieDetailData = async (movieId: string): Promise<MovieDetail> => {
  const response = await movieApiAxiosClient.get<MovieDetail>(
    `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`,
  );

  return response.data;
};
