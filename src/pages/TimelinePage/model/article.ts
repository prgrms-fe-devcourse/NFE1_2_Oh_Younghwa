export interface User {
  coverImage: string; // 커버 이미지
  image: string; // 프로필 이미지
  role: string;
  emailVerified: boolean; // 사용되지 않음
  banned: boolean; // 사용되지 않음
  isOnline: boolean;
  posts: Post[];
  likes: Like[];
  comments: string[];
  followers: Follow[]; //followers 정보 수정하기 위해서 수정
  following: Follow[]; //following 정보 수정하기 위해서 수정
  notifications: Notification[];
  messages: Message[];
  _id: string;
  fullName: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  username: string;
}

export interface Channel {
  authRequired: boolean; // 사용되지 않음
  posts: string[];
  _id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface Post {
  likes: Like[];
  comments: Comment[];
  _id: string;
  image: string;
  imagePublicId: string;
  title: string;
  channel: string;
  author: User;
  createdAt: string;
  updatedAt: string;
}

export interface MoviePost {
  likes: string[];
  comments: Comment[];
  _id: string;
  image: string;
  imagePublicId: string;
  title: string;
  channel: string;
  author: string;
  createdAt: string;
  updatedAt: string;
}
export interface PostListResponse {
  results: Post[];
}

export interface Like {
  _id: string;
  user: string; // 사용자 id
  post: string; // 포스트 id
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  _id: string;
  comment: string;
  author: User;
  post: string; // 포스트 id
  createdAt: string;
  updatedAt: string;
}

export interface Follow {
  _id: string;
  user: string; // 사용자 id
  follower: string; // 사용자 id
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  _id: string;
  message: string;
  sender: User;
  receiver: User;
  seen: boolean;
  createdAt: string;
  updatedAt: string;
}
