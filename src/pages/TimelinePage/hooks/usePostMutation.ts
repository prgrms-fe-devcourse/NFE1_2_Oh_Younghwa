import { useMutation, useQueryClient } from '@tanstack/react-query';

import { addPost } from '../../WritePostPage/api/postModal';
import { deletePost, updatePost } from '../api/TimelineApi';

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

  const addPostMutation = useMutation({
    mutationFn: addPost,

    onError: (error, variables, context) => {
      console.log(error);
    },
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ['movie_reviews'] });
      console.log(data);
    },
    onSettled: (data, error, variables, context) => {},
  });

  const updatePostMutation = useMutation({
    mutationFn: updatePost,

    onError: (error, variables, context) => {
      console.log(error);
    },
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ['movie_reviews'] });
      console.log(data);
    },
    onSettled: (data, error, variables, context) => {},
  });

  return { deletePostMutation, addPostMutation, updatePostMutation };
};
