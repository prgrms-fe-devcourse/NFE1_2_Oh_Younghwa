import { useMutation, useQueryClient } from '@tanstack/react-query';

import { changeImg, changeInfo, newInfo } from '../api/userApi';

export const useEditProfile = () => {
  const queryClient = useQueryClient();

  const editMutation = useMutation({
    mutationFn: async ({ newName, newBio, newImg }: newInfo) => {
      // 첫 번째 함수 호출 (사용자 정보 변경)
      if (newName || newBio) {
        await changeInfo({ newName, newBio });
      }
      // 두 번째 함수 호출 (이미지 변경)
      if (newImg) {
        await changeImg({ newImg });
      }
    },

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
