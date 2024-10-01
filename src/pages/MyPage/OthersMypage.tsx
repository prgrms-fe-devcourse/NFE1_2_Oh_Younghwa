import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import FollowPlusButton from '../../shared/components/atom/icons/FollowPlusButton';

import MyPageHeader from './components/MyPageHeader';
import UserLog from './components/UserLog';
import { useGetOtherUsers } from './hooks/useGetOtherUsers';
import { useGetUsers } from './hooks/useGetUsers';
import { useHandleFollow } from './hooks/useHandleFollow';

import './scss/myPage.scss';
import './scss/userLog.scss';

export default function OthersMyPage() {
  const token = localStorage.getItem('token');

  const { userId } = useParams();
  const { data, isLoading, error } = useGetOtherUsers(userId as string); //다른 사용자의 정보
  const { data: myInfo } = useGetUsers(); //내 정보
  // const { mutate: followMutate } = useHandleFollow();
  const { mutate: followMutate } = useHandleFollow();
  const navigate = useNavigate();

  useEffect(() => {
    //로그인 한 유저인지 확인
    if (token) {
      //접속한 상태에서 'user/접속한 나의 id' 입력하면 '/mypage'로 이동
      if (userId === myInfo?._id) {
        navigate('/mypage');
      }
    }
  }, [myInfo, data, navigate]);

  //팔로우 중인 유저 리스트
  const followingUserList = myInfo?.following.map((follow) => follow);
  //리스트에서 상대방의 userId 찾아서 팔로우 여부 확인 - 팔로우
  const isFollowing = followingUserList?.findIndex((id) => id.user === userId);
  //팔로우 중인 유저 리스트에서 고유의 팔로우 관계 id 찾기 - 언팔로우
  const followId = followingUserList?.find((followR) => followR.user === userId);

  //팔로우 버튼
  const followHandler = (user: string) => {
    if (user && isFollowing === -1) {
      followMutate({
        isFollowing: false,
        userId: user,
      });
    }
  };

  //언팔로우 버튼
  const unfollowHandler = (id: string | undefined) => {
    //이미 팔로우 중인 유저라면 버튼 한 번 더 눌렀을 때 언팔로우하기
    if (followId !== undefined) {
      //팔로우 중인 유저로 확인되면
      followMutate({
        isFollowing: true,
        followId: id,
      }); //언팔로우 가능
    }
  };

  if (isLoading) return <div>로딩중...</div>;
  if (error) return <div>에러 발생</div>;

  return (
    <div className="mypage-container">
      {data && (
        <>
          <MyPageHeader user={data} />
          <UserLog user={data} />
          {isFollowing === -1 ? (
            <>
              <button className="follow-btn" onClick={() => followHandler(data._id)}>
                팔로우 <FollowPlusButton />
              </button>
            </>
          ) : (
            <button className="following-btn" onClick={() => unfollowHandler(followId?._id)}>
              팔로잉
            </button>
          )}
        </>
      )}
    </div>
  );
}
