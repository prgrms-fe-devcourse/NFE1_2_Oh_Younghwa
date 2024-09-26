import { Outlet } from 'react-router-dom';

import GoBackIconSvg from './shared/components/atom/icons/GoBackIcon';
import HomePageIconSvg from './shared/components/atom/icons/HomePageIcon';
import MoviePageIconSvg from './shared/components/atom/icons/MoviePageIcon';
import MypageIconSvg from './shared/components/atom/icons/MyPageIcon';
import NotificationPageIconSvg from './shared/components/atom/icons/NotificationPageIcon';
import SearchPageIconSvg from './shared/components/atom/icons/SearchPageIcon';

import './App.scss';

function App() {
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
            title
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
