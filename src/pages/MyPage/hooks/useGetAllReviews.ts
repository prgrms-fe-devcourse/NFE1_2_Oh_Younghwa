import { useQuery } from '@tanstack/react-query';

import { getAllReviews } from '../api/userApi';

export const useGetAllReveiws = (author: string, channel: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['allReviews', author, channel],
    queryFn: () => getAllReviews(author),
  });

  return { data, isLoading, error };
};
