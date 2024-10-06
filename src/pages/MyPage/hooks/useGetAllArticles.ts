import { useQuery } from '@tanstack/react-query';

import { getAllArticles } from '../api/userApi';

//다른 사람의 fullName 찾기 위해 모든 유저 불러오기
export const useGetAllArticles = () => {
  const { data } = useQuery({
    queryKey: ['allArticles'],
    queryFn: getAllArticles,
  });
  return { data };
};
