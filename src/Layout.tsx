import { useEffect, useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';

import WriteModal from './pages/WritePostPage/components/WriteModal';
import GoBackIconSvg from './shared/components/atom/icons/GoBackIcon';
import HomePageIconSvg from './shared/components/atom/icons/HomePageIcon';
import MoviePageIconSvg from './shared/components/atom/icons/MoviePageIcon';
import MypageIconSvg from './shared/components/atom/icons/MyPageIcon';
import NotificationPageIconSvg from './shared/components/atom/icons/NotificationPageIcon';
import SearchPageIconSvg from './shared/components/atom/icons/SearchPageIcon';
import WriteButtonIcon from './shared/components/atom/icons/WriteButtonIcon';
import ChannelNavigateRemote from './shared/components/ChannelNavigateRemote';

import './App.scss';

const titleMapping: { [key: string]: string } = {
  '/search': '검색',
  '/result': '검색결과',
  '/movie': '영화 정보',
  '/movie/detail': '영화 상세정보',
  '/mypage': '마이페이지',
  '/posts': '포스트',
  '/notifications': '알림',
  // Add more routes and titles as needed
};

function App() {
  const location = useLocation();
  const currentPath = location.pathname;
  let title = titleMapping[currentPath];

  const navigate = useNavigate();

  //현재 주소가 /posts로 시작하면 상단에 포스트로 표기

  if (currentPath.startsWith('/posts')) {
    title = titleMapping['/posts'];
  }

  //주소에 따라서 타임라인채널 리모트 표시여부
  const [isArrowOn, setisArrowOn] = useState(true);

  useEffect(() => {
    if (currentPath.startsWith('/posts/channel')) {
      setisArrowOn(false);
    } else if (currentPath.startsWith('/search')) {
      setisArrowOn(false);
    } else if (currentPath.startsWith('/movie')) {
      setisArrowOn(false);
    } else if (currentPath.startsWith('/notifications')) {
      setisArrowOn(false);
    } else if (currentPath.startsWith('/mypage')) {
      setisArrowOn(false);
    } else {
      setisArrowOn(true);
    }
  }, [location]);

  const [isNavOn, setisNavOn] = useState(true);

  useEffect(() => {
    if (currentPath.startsWith('/posts/channel')) {
      setisNavOn(false);
    else{setisNavOn(true);}
  }, [location]);

  //글쓰기 모달 표시여부 버튼 컨트롤용
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div className="navigate-bar">
        <Link to={'/posts/channel/home'}>
          <div className="menu-icon home">
            <HomePageIconSvg />
          </div>
        </Link>
        <Link to={'/search'}>
          <div className="menu-icon search">
            <SearchPageIconSvg />
          </div>
        </Link>
        <Link to={'/movie'}>
          <div className="menu-icon movie">
            <MoviePageIconSvg />
          </div>
        </Link>
        <Link to={'/notifications'}>
          <div className="menu-icon alert">
            <NotificationPageIconSvg />
          </div>
        </Link>
        <Link to={'/mypage'}>
          <div className="menu-icon mypage">
            <MypageIconSvg />
          </div>
        </Link>
      </div>

      <div className="contents-wrap">
        <button className="write-button" onClick={() => setModalOpen(true)}>
          <WriteButtonIcon />
        </button>
        <div className="contents-title-wrap">
          <div className={`remote ${isNavOn ? '' : 'enter-channel'}`}>
            <ChannelNavigateRemote />
          </div>

          <div className="contents-title">
            <div className={`arrow-holder ${isArrowOn ? 'enter-channel' : ''}`} onClick={() => navigate(-1)}>
              <GoBackIconSvg />
            </div>
            <div>{title}</div>
          </div>
        </div>
        <div className="contents">
          <Outlet />
        </div>
      </div>

      {/* 글쓰는 모달 온오프 */}
      {modalOpen && <WriteModal isModalOpen={modalOpen} onClose={() => setModalOpen(false)} />}
    </>
  );
}

export default App;
