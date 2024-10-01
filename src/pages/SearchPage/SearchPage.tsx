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
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchQuery(inputValue); // 검색어를 상태에 설정

    // 검색어가 있을 때 ResultPage로 이동
    if (inputValue) {
      navigate('/result', { state: { searchQuery: inputValue, selectedCategory } }); // /result 경로로 이동
    }
  };

  return (
    <div className="search-body">
      <form className="search-form" onSubmit={handleSubmit}>
        <InputSearchIcon />
        <input
          className="search-form-input"
          type="search"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)} // 입력값 변경 시 상태 업데이트
          onFocus={() => setIsInputFocused(true)} // 입력 칸이 클릭되면 true
          onBlur={() => setIsInputFocused(false)} // 입력 칸에서 벗어나면 false
        />
        <InputDeleteIcon />
      </form>

      {/* 입력 필드 포커스에 따라 다른 컴포넌트 렌더링 */}
      {isInputFocused ? (
        <div className="recent-search">
          <h3>최근 검색어</h3>
          <RecentSearch />
        </div>
      ) : (
        <div className="recommend-post">
          <h3>추천 게시물</h3>
          <RecommendPost />
        </div>
      )}
    </div>
  );
};

export default SearchPage;
