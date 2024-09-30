import { useMutation, useQueryClient } from '@tanstack/react-query';

import { unfollowUser } from '../api/userApi';

export const useHandleUnfollow = () => {
  const queryClient = useQueryClient();
  const unfollowHandler = useMutation({
    mutationFn: (followId: string) => unfollowUser(followId),
    onSuccess: (result) => {
      console.log('unfollow', result);
      //팔로우 정보를 바로 반영하기 위해 데이터 다시 가져옴(버튼용)
      queryClient.invalidateQueries({ queryKey: ['user'] });
      //팔로우 정보를 바로 반영(팔로우 숫자 표시용)
      queryClient.invalidateQueries({ queryKey: ['otherUsers'] });
    },
    onError: (error) => {
      console.error('unFollow Error', error);
    },
  });
  return unfollowHandler;
};
