import { createContext, useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useTokenValidation } from '../auth/hooks/useTokenValidation';
import { User } from '../auth/model/user';

const SessionContent = createContext<User | undefined>(undefined);

export const SessionProvider = ({ children }: { children: React.ReactNode }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const { data, isLoading } = useTokenValidation();
  // 세션 없을 시 로그인 페이지로 리다이렉트.
  // 로딩중일때는 당연히 세션이 없으므로 로딩중일때는 무시
  useEffect(() => {
    if (!isLoading && !data) {
      console.log('세션 없어요!');
      navigate('/login'); // 로그인 페이지로 리다이렉트
    }
  }, [pathname]); // 페이지를 이동할 때마다 세션을 갱신
  // 로딩 중일 때 대기

  // 컨텍스트가 변경되면 React는 자동으로 해당 context 를 읽는 컴포넌트를 다시 렌더링합니다.
  return <SessionContent.Provider value={data}>{children}</SessionContent.Provider>;
};

export const useSession = () => {
  return useContext(SessionContent);
};
