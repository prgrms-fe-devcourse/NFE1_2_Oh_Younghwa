import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deletePost } from '../api/TimelineApi';

export const usePostMutation = () => {
  const queryClient = useQueryClient();

  const deletePostMutation = useMutation({
    mutationFn: deletePost,
    onMutate: (variables) => {},
    onError: (error, variables, context) => {
      console.log(error);
    },
    onSuccess: (data, variables, context) => {
      console.log(data);
    },
    onSettled: (data, error, variables, context) => {},
  });

  return { deletePostMutation };
};
