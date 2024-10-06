import axios, { AxiosInstance } from 'axios';

import { AWS_MOVIE_API_URL, LMS_API_BASE_URL, TMDB_API_BASE_URL } from './baseUrl';
/**영화api전용 axios instance */
export const movieApiAxiosClient: AxiosInstance = axios.create({
  baseURL: TMDB_API_BASE_URL,
  timeout: 2000,
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
  },
});

/**회원가입, 로그인 전용 axios instance */
export const authAxiosClient: AxiosInstance = axios.create({
  baseURL: LMS_API_BASE_URL,
  timeout: 2000,
  headers: {
    accept: 'application/json',
  },
});

/**로그인한 사용자 전용 axios instance */
export const loginUserAxiosClient: AxiosInstance = axios.create({
  baseURL: LMS_API_BASE_URL,
  timeout: 2000,
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
  },
});

/**로그인한 사용자 전용 axios instance */
export const reviewAxiosClient = (): AxiosInstance => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('토큰이 없습니다');
  }
  const validateTokenRequest = axios.create({
    baseURL: LMS_API_BASE_URL,
    timeout: 1000,
    headers: {
      accept: 'application/json',
      Authorization: `bearer ${token}`,
    },
  });
  return validateTokenRequest;
};

/**사용자 토큰을 담은 요청을 서버로 전송해서 인증된 사용자인지 검증 */
export const validateTokenAxiosClient = (token: string): AxiosInstance => {
  const validateTokenRequest = axios.create({
    baseURL: LMS_API_BASE_URL,
    timeout: 1000,
    headers: {
      accept: 'application/json',
      Authorization: `bearer ${token}`,
    },
  });
  return validateTokenRequest;
};

/* 게시글 api전용 axios instance */
export const postApiAxiosClient: AxiosInstance = axios.create({
  baseURL: LMS_API_BASE_URL,
  timeout: 2000,
  headers: {
    accept: 'application/json',
  },
});

export const postFormAxiosClient = (): AxiosInstance => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('토큰이 없습니다');
  }
  const validateTokenRequest = axios.create({
    baseURL: LMS_API_BASE_URL,
    headers: {
      accept: 'multipart/form-data',
      Authorization: `bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });
  return validateTokenRequest;
};

/**회원가입, 로그인 전용 axios instance */
export const awsAxiosClient: AxiosInstance = axios.create({
  baseURL: AWS_MOVIE_API_URL,
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
  },
});
