import { useMutation, useQueryClient } from '@tanstack/react-query';

import { followUser, unfollowUser } from '../api/userApi';

interface Params {
  isFollowing: boolean;
  userId?: string;
  followId?: string;
}

export const useHandleFollow = () => {
  const queryClient = useQueryClient();

  const followHandler = useMutation({
    mutationFn: ({ isFollowing, userId, followId }: Params) => {
      return isFollowing ? unfollowUser(followId as string) : followUser(userId as string);
    },
    onSuccess: (result, variables) => {
      console.log(variables.isFollowing ? 'Unfollow' : 'Follow', result);
      //팔로우 정보를 바로 반영하기 위해 데이터 다시 가져옴(버튼용)
      queryClient.invalidateQueries({ queryKey: ['user'] });
      //팔로우 정보를 바로 반영(팔로우 숫자 표시용)
      queryClient.invalidateQueries({ queryKey: ['otherUsers'] });
    },
    onError: (error, variables) => {
      console.error(variables.isFollowing ? 'Unfollow Error' : 'Follow Error', error);
    },
  });
  return followHandler;
};
