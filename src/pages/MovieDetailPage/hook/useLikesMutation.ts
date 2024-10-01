import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteLikes, postLikes } from '../api/likesApi';

export const useLikesMutation = () => {
  const queryClient = useQueryClient();
  const addLikesMutation = useMutation({
    mutationFn: postLikes,
    onMutate: (variables) => {
      // 이전에 캐시된 쿼리를 무효화합니다.
    },
    onError: (error, variables, context) => {
      console.log(error);
      // An error happened!
      //   console.log(`rolling back optimistic update with id ${context.id}`)
    },
    onSuccess: (data, variables, context) => {
      console.log(`invalidateQueries`);
      // Boom baby!
      queryClient.invalidateQueries({ queryKey: ['movie_reviews'] });
      queryClient.invalidateQueries({ queryKey: ['auth-user'] });
    },
    onSettled: (data, error, variables, context) => {
      // Error or success... doesn't matter!
    },
  });
  const deleteLikesMutation = useMutation({
    mutationFn: deleteLikes,
    onMutate: (variables) => {
      // A mutation is about to happen!
      // Optionally return a context containing data to use when for example rolling back
    },
    onError: (error, variables, context) => {
      console.log(error);
      // An error happened!
      //   console.log(`rolling back optimistic update with id ${context.id}`)
    },
    onSuccess: (data, variables, context) => {
      // Boom baby!
      console.log(`invalidateQueries`);

      queryClient.invalidateQueries({ queryKey: ['movie_reviews'] });
      queryClient.invalidateQueries({ queryKey: ['auth-user'] });
    },
    onSettled: (data, error, variables, context) => {
      // Error or success... doesn't matter!
    },
  });
  return { addLikesMutation, deleteLikesMutation };
};
