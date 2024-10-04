import { useMutation, useQueryClient } from '@tanstack/react-query';

import { changeUserInfo, newInfo } from '../api/userApi';

export const useEditProfile = () => {
  const queryClient = useQueryClient();

  const editMutation = useMutation({
    mutationFn: ({ newName, newBio, newImg }: newInfo) => changeUserInfo({ newName, newBio, newImg }),

    onSuccess: (result) => {
      console.log(`프로필이 변경되었습니다.`, result);
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onError: (error) => {
      console.error('프로필을 변경할 수 없습니다.', error);
    },
  });
  return editMutation;
};
