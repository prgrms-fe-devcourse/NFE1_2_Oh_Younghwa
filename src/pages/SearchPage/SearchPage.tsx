import { useNavigate } from 'react-router-dom';

import InputDeleteIcon from '../../shared/components/atom/icons/InputDeleteIcon';
import InputSearchIcon from '../../shared/components/atom/icons/InputSearchIcon';

import RecommendPost from './Components/RecommendPost';

import './search.scss';

const SearchPage = () => {
  const navigate = useNavigate();

  return (
    <div className="search-body">
      <form className="search-form">
        <InputSearchIcon />
        <input className="search-form-input" type="search" onClick={() => navigate('/result')} />
        <InputDeleteIcon />
      </form>

      <div className="recommend-post">
        <RecommendPost />
      </div>
    </div>
  );
};

export default SearchPage;
