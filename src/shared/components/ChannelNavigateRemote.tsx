import { Link } from 'react-router-dom';

import GenreSelectButtonIcon from './atom/icons/GenreSelectButtonIcon';

const ChannelNavigateRemote = () => {
  return (
    <div>
      <div className="navigate-channel">
        <Link to={'#'}>
          <div className="follow-channel">팔로잉</div>
        </Link>
        <Link to={'/posts/channel/home'}>
          <div className="now-channel">
            전체
            <GenreSelectButtonIcon />
          </div>
        </Link>
        <Link to={'../posts/channel/6701580f426f72722a790504'}>
          <div className="genre-channel">액션</div>
        </Link>
        <Link to={'/posts/channel/67015828426f72722a790527'}>
          <div className="genre-channel">로맨스</div>
        </Link>
        <Link to={'/posts/channel/67015836426f72722a790542'}>
          <div className="genre-channel">호러</div>
        </Link>
        <Link to={'/posts/channel/67015845426f72722a790546'}>
          <div className="genre-channel">SF</div>
        </Link>
        <Link to={'/posts/channel/67015856426f72722a79054a'}>
          <div className="genre-channel">독립영화</div>
        </Link>
        <Link to={'/posts/channel/6701579b426f72722a7904cf'}>
          <div className="genre-channel">일반</div>
        </Link>
      </div>
    </div>
  );
};

export default ChannelNavigateRemote;
