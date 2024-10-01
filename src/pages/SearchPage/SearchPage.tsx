import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import InputDeleteIcon from '../../shared/components/atom/icons/InputDeleteIcon';
import InputSearchIcon from '../../shared/components/atom/icons/InputSearchIcon';

import RecentSearch from './Components/RecentSearch';
import RecommendPost from './Components/RecommendPost';

import './search.scss';

const SearchPage = () => {
  const navigate = useNavigate(); // 페이지 탐색을 위한 훅
  const [isInputFocused, setIsInputFocused] = useState(false); // 입력 필드 포커스 상태
  const [inputValue, setInputValue] = useState(''); // 입력 값을 저장하는 상태
  const [searchQuery, setSearchQuery] = useState(''); // 검색어 저장
  const [selectedCategory, setSelectedCategory] = useState('post');

  // 검색 폼 제출 핸들러
  

  return (
    <div className="search-body">
      <form className="search-form">
        <InputSearchIcon />
        <input
          className="search-form-input"
          type="search"
          value={inputValue}
          onClick={()=>
            navigate('/result')}
          />
        <InputDeleteIcon />
      </form>

     
        <div className="recommend-post">
          <h3>추천 게시물</h3>
          <RecommendPost />
        </div>
    </div>
  );
};

export default SearchPage;
