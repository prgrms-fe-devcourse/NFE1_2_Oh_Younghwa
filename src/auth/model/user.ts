export type User = {
  _id: string;
  email: string;
  emailVerified: boolean;
  fullName: string;
  role: 'Regular' | 'Admin'; // role에 따른 값이 확정적이라면 문자열 리터럴 타입으로 지정
  isOnline: boolean;
  banned: boolean;
  createdAt: string; // ISO 문자열
  updatedAt: string; // ISO 문자열
  followers: string[]; // 만약 팔로워 정보에 아이디만 저장되는 경우
  following: string[]; // 만약 팔로잉 정보에 아이디만 저장되는 경우
  likes: string[]; // 사용자 좋아요를 나타낼 때의 게시물 ID
  posts: string[]; // 사용자가 작성한 게시물 ID
  comments: string[]; // 사용자가 작성한 댓글 ID
  notifications: Notification[]; // 타입을 세부 정의할 필요가 있으면 Notification 타입 정의 필요
  messages: string[]; // 메시지 타입을 세부 정의할 필요가 있으면 Message 타입 정의 필요
  __v: number; // Mongoose 버전 키
};
