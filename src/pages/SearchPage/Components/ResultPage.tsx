import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; 
import '../search.scss';
import InputSearchIcon from '../../../shared/components/atom/icons/InputSearchIcon';
import InputDeleteIcon from '../../../shared/components/atom/icons/InputDeleteIcon';

const ResultPage = () => {
  const location = useLocation(); // 현재 위치 정보 가져오기
  const navigate = useNavigate(); // 페이지 탐색을 위한 훅 사용
  const { searchQuery: initialSearchQuery, selectedCategory: initialCategory } = location.state || { searchQuery: '', selectedCategory: 'post' };
  
  const [selectedCategory, setSelectedCategory] = useState(initialCategory); // 선택된 카테고리 상태
  const [inputValue, setInputValue] = useState(initialSearchQuery); // 입력 값을 상태로 관리

  // 카테고리 클릭 핸들러
  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category); // 선택된 카테고리를 업데이트
  };

  // 검색 폼 제출 핸들러
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
    if (inputValue) {
      navigate('/result', { state: { searchQuery: inputValue, selectedCategory } }); // 새로운 검색어로 결과 페이지 이동
    }
  };

  return (
    <div className="search-contents">
      <form className='search-form' onSubmit={handleSubmit}>
        <InputSearchIcon /> 
        <input
          className="search-form-input"
          type="search"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)} 
        />
        <InputDeleteIcon/>
      </form>

      <div className='search-contents-button'>
        {/* 카테고리 버튼 */}
        <button 
          className={`search-contents-button-post ${selectedCategory === 'post' ? 'active' : ''}`} 
          onClick={() => handleCategoryClick('post')}>
          게시글
        </button>
        <button 
          className={`search-contents-button-tag ${selectedCategory === 'tag' ? 'active' : ''}`} 
          onClick={() => handleCategoryClick('tag')}>
          태그
        </button>
        <button 
          className={`search-contents-button-user ${selectedCategory === 'user' ? 'active' : ''}`} 
          onClick={() => handleCategoryClick('user')}>
          사용자
        </button>
      </div>

      {/* 선택된 카테고리에 따라 다른 결과 렌더링 */}
      {selectedCategory === 'post' && (
        <p>{`게시글 결과: ${initialSearchQuery}`}</p>
      )}
      {selectedCategory === 'tag' && (
        <p>{`태그 결과: ${initialSearchQuery}`}</p>
      )}
      {selectedCategory === 'user' && (
        <p>{`사용자 결과: ${initialSearchQuery}`}</p>
      )}
    </div>
  );
};

export default ResultPage;
