import { useQuery } from '@tanstack/react-query';
import { getMovieDetailData } from '../api/movieDetailApi';
import { calculateRuntime, getCountryNameByIso, returnYearByReleaseDate } from '../utils/movieDataTransform';

export const useMovieDetailData = (movieId: string) => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ['movie_detail', movieId], // 쿼리 키
    queryFn: () => getMovieDetailData(movieId), // 데이터를 가져오는 함수
  });
  const genreArray = data?.genres.map((genre) => genre.name) || [];
  const originCountry = getCountryNameByIso(data?.origin_country[0]);
  const runtime = calculateRuntime(data?.runtime);
  const movieRating = data?.vote_average;
  const releaseDate = returnYearByReleaseDate(data?.release_date);
  const posterPath = data?.poster_path;
  const overview = data?.overview;
  const tagline = data?.tagline;
  const title = data?.title || '';
  const voteAverage = data?.vote_average;
  const movieData = {
    genreArray,
    originCountry,
    runtime,
    movieRating,
    releaseDate,
    posterPath,
    overview,
    tagline,
    title,
    voteAverage,
  };
  return { data: movieData, isError, isLoading };
};
