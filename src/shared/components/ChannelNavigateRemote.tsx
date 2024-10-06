import { Link } from 'react-router-dom';

import GenreSelectButtonIcon from './atom/icons/GenreSelectButtonIcon';

const ChannelNavigateRemote = () => {
  const showLog = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const value = event.currentTarget;

    //모든 active 제거
    document.querySelectorAll('.active').forEach((el) => {
      el.classList.remove('active');
    });
    //선택된 요소에 active 추가
    value.classList.add('active');
  };

  return (
    <div>
      <div className="navigate-channel">
        {/* <Link to={'#'}>
          <div className="follow-channel">팔로잉</div>
        </Link> */}
        <Link to={'/posts/channel/home'}>
          <div className="genre-channel active" onClick={showLog}>
            전체
          </div>
        </Link>
        <Link to={'../posts/channel/6701580f426f72722a790504'}>
          <div className="genre-channel" onClick={showLog}>
            액션
          </div>
        </Link>
        <Link to={'/posts/channel/67015828426f72722a790527'}>
          <div className="genre-channel" onClick={showLog}>
            로맨스
          </div>
        </Link>
        <Link to={'/posts/channel/67015836426f72722a790542'}>
          <div className="genre-channel" onClick={showLog}>
            호러
          </div>
        </Link>
        <Link to={'/posts/channel/67015845426f72722a790546'}>
          <div className="genre-channel" onClick={showLog}>
            SF
          </div>
        </Link>
        <Link to={'/posts/channel/67015856426f72722a79054a'}>
          <div className="genre-channel" onClick={showLog}>
            독립영화
          </div>
        </Link>
        <Link to={'/posts/channel/6701579b426f72722a7904cf'}>
          <div className="genre-channel" onClick={showLog}>
            일반
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ChannelNavigateRemote;
