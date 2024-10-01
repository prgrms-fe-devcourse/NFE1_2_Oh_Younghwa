import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';

import GenreSelectButtonIcon from './shared/components/atom/icons/GenreSelectButtonIcon';
import GoBackIconSvg from './shared/components/atom/icons/GoBackIcon';
import HomePageIconSvg from './shared/components/atom/icons/HomePageIcon';
import MoviePageIconSvg from './shared/components/atom/icons/MoviePageIcon';
import MypageIconSvg from './shared/components/atom/icons/MyPageIcon';
import NotificationPageIconSvg from './shared/components/atom/icons/NotificationPageIcon';
import SearchPageIconSvg from './shared/components/atom/icons/SearchPageIcon';

import './App.scss';
const titleMapping: { [key: string]: string } = {
  '/search': '검색',
  '/result': '검색결과',
  '/movie': '영화 정보',
  '/movie/detail': '영화 상세정보',
  '/mypage': '마이페이지',
  '/posts': '포스트',


  // Add more routes and titles as needed
};

function App() {
  const location = useLocation();
  const currentPath = location.pathname;
  let title = titleMapping[currentPath];

  if (currentPath.startsWith('/posts')) {
    title = titleMapping['/posts'];
  }

  const navigate = useNavigate();

  return (
    <>
      <div className="navigate-bar">
        <Link to={'/posts/channel/66f50d3001d4aa076bcbdb99'}>

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
        <div className="menu-icon alert">
          <NotificationPageIconSvg />
        </div>
        <Link to={'/mypage'}>
          <div className="menu-icon mypage">
            <MypageIconSvg />
          </div>
        </Link>
      </div>

      <div className="contents-wrap">
        <div className="contents-title-wrap">
          <div className="navigate-channel">
            <Link to={'#'}>
              <div className="follow-channel">팔로잉</div>
            </Link>
            <Link to={'/posts/channel/66f50d3001d4aa076bcbdb99'}>
              <div className="now-channel">
                전체
                <GenreSelectButtonIcon />
              </div>
            </Link>
            <Link to={'/posts/channel/66fa6380186a007fe2c4226b'}>
              <div className="genre-channel">액션</div>
            </Link>
            <Link to={'/posts/channel/66fa63d9186a007fe2c422bc'}>
              <div className="genre-channel">로맨스</div>
            </Link>
            <Link to={'/posts/channel/66fa6402186a007fe2c422c5'}>
              <div className="genre-channel">호러</div>
            </Link>
            <Link to={'/posts/channel/66fa641f186a007fe2c423ae'}>
              <div className="genre-channel">SF</div>
            </Link>
            <Link to={'/posts/channel/66fa6452186a007fe2c425c8'}>
              <div className="genre-channel">독립영화</div>
            </Link>
          </div>
          <div className="contents-title">
            <div className="arrow-holder" onClick={() => navigate(-1)}>
              <GoBackIconSvg />
            </div>
            <div>{title}</div>
            <div className="arrow-holder"></div>
          </div>
        </div>
        <div className="contents">
          <Outlet />
        </div>
      </div>

    </>
  );
}

export default App;
