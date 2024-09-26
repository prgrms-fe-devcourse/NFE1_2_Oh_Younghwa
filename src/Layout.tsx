import { Link, Outlet, useLocation } from 'react-router-dom';

import PopularMovies from './pages/MoviePage/components/PopularMovies';
import GoBackIconSvg from './shared/components/atom/icons/GoBackIcon';
import HomePageIconSvg from './shared/components/atom/icons/HomePageIcon';
import MoviePageIconSvg from './shared/components/atom/icons/MoviePageIcon';
import MypageIconSvg from './shared/components/atom/icons/MyPageIcon';
import NotificationPageIconSvg from './shared/components/atom/icons/NotificationPageIcon';
import SearchPageIconSvg from './shared/components/atom/icons/SearchPageIcon';

import './App.scss';
const titleMapping: { [key: string]: string } = {
  '/search': '검색',
  '/result' : '검색결과'
  // Add more routes and titles as needed
};
function App() {
  const location = useLocation();
  const currentPath = location.pathname;
  const title = titleMapping[currentPath];
  return (
    <>
      {/* <h1>LAYOUT</h1> */}
      <div className="navigate-bar">
        <div className="menu-icon home">
          <HomePageIconSvg />
        </div>
        <div className="menu-icon search">
          <SearchPageIconSvg />
        </div>
        <div className="menu-icon movie">
          <MoviePageIconSvg />
        </div>
        <div className="menu-icon alert">
          <NotificationPageIconSvg />
        </div>
        <div className="menu-icon mypage">
          <MypageIconSvg />
        </div>
      </div>

      <div className="contents-wrap">
        <div className="contents-title-wrap">
          <div className="contents-title">
            <div className="arrow-holder">
              <GoBackIconSvg />
            </div>
            {title}
            <div className="arrow-holder"></div>
          </div>
        </div>
        <div className="contents"><Outlet /></div>
      </div>
      {/* <Link to="/asdf">wrongPage</Link>
      <Link to="/movie">movie</Link>
      <Link to="/">home</Link> */}
      {/* <PopularMovies /> */}
      
    </>
  );
}

export default App;
