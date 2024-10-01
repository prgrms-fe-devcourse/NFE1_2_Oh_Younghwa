// src/hooks/usePopularMovies.ts
import { useMutation, useQuery } from '@tanstack/react-query';

import { postReview } from '../api/reviewApi';

type Post = {
  title: string;
  image: string;
  channelId: string;
};

export const useReviewMutation = () => {
  //   const { data, isError, isLoading } = useQuery({
  //     queryKey: ['popular'], // 쿼리 키
  //     queryFn: postReview({channelId,image,title}), // 데이터를 가져오는 함수
  //   });
  //   return { data, isError, isLoading };
  const mutation = useMutation({
    mutationFn: postReview,
    onMutate: (variables) => {
      // A mutation is about to happen!

      // Optionally return a context containing data to use when for example rolling back
      return { id: 1 };
    },
    onError: (error, variables, context) => {
      console.log(error);
      // An error happened!
      //   console.log(`rolling back optimistic update with id ${context.id}`)
    },
    onSuccess: (data, variables, context) => {
      // Boom baby!
      console.log(data);
    },
    onSettled: (data, error, variables, context) => {
      // Error or success... doesn't matter!
    },
  });

  return { mutation };
};
