import { createContext, useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useTokenValidation } from '../auth/hooks/useTokenValidation';
import { User } from '../auth/model/user';

const SessionContent = createContext<User | undefined>(undefined);

export const SessionProvider = ({ children }: { children: React.ReactNode }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const { data, isLoading, error } = useTokenValidation();

  useEffect(() => {
    console.log(pathname);
    console.log('session', data);
  }, [pathname]); // 페이지를 이동할 때마다 세션을 갱신
  // 로딩 중일 때 대기

  // 인증 실패 시 로그인 화면으로 리디렉션
  if (!data && !isLoading) {
    console.log(data);
    navigate('/login'); // 로그인 페이지로 리다이렉트
  }
  console.log(data);

  return <SessionContent.Provider value={data}>{children}</SessionContent.Provider>;
};

// // 클라이언트 컴포넌트용 커스텀 훅
// export const useSession = () => {
//   return useContext(SessionContent);
// };
