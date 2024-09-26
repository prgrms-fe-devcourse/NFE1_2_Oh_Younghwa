import { useParams } from 'react-router-dom';

export default function MovieDetailPage() {
  const { movieId } = useParams();
  console.log('🚀 ~ MovieDetailPage ~ pathName:', movieId);

  return <></>;
}
