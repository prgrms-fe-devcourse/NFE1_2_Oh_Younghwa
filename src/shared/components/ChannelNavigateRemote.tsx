import { Link } from 'react-router-dom';

import GenreSelectButtonIcon from './atom/icons/GenreSelectButtonIcon';

const ChannelNavigateRemote = () => {
  return (
    <div>
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
        <Link to={'../posts/channel/66fa6380186a007fe2c4226b'}>
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
    </div>
  );
};

export default ChannelNavigateRemote;
