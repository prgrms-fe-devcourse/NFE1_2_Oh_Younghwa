import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import InputDeleteIcon from '../../../shared/components/atom/icons/InputDeleteIcon';
import InputSearchIcon from '../../../shared/components/atom/icons/InputSearchIcon';

import { searchUsers, searchPosts } from '../api/searchApi'; // API 호출 함수 가져오기
import '../search.scss';

type User = {
  userId: string;
  nickname: string;
  profileImage: string;
  followersCount: number;
  oneLinerMessage: string; // 한줄 메시지
};

type Post = {
  postId: number;
  postTitle: string;
};

type SearchResult = {
  users: User[];
  posts: Post[];
};

const ResultPage = () => {
  const location = useLocation(); // 현재 위치 정보 가져오기
  const navigate = useNavigate();
  const { searchQuery: initialSearchQuery, selectedCategory: initialCategory } = location.state || {
    searchQuery: '',
    selectedCategory: 'post',
  };

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  // 선택된 카테고리
  const [inputValue, setInputValue] = useState(initialSearchQuery);
  const [searchResults, setSearchResults] = useState<SearchResult>({ users: [], posts: [] });

  // 카테고리 클릭 핸들러
  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  // 검색 폼 제출 핸들러
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue) {
      navigate('/result'); // 검색 결과 페이지 이동
    }
  };

  // 검색 결과를 가져오는 함수
  const fetchSearchResults = async () => {
    try {
      const users = await searchUsers(inputValue);
      console.log(users); // 지워야 함
      const posts = await searchPosts(inputValue);
      setSearchResults({ users, posts }); // 검색 결과 업데이트
    } catch (error) {
      console.error('검색 결과를 가져오는 중 오류 발생:', error);
    }
  };

  useEffect(() => {
    fetchSearchResults();
  }, []);

  return (
    <div className="search-contents">
      <form className="search-form" onSubmit={handleSubmit}>
        <InputSearchIcon />
        <input
          className="search-form-input"
          type="search"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <InputDeleteIcon />
      </form>

      <div className="search-contents-button">
        <button
          className={`search-contents-button-post ${selectedCategory === 'post' ? 'active' : ''}`}
          onClick={() => handleCategoryClick('post')}
        >
          게시글
        </button>
        <button
          className={`search-contents-button-tag ${selectedCategory === 'tag' ? 'active' : ''}`}
          onClick={() => handleCategoryClick('tag')}
        >
          태그
        </button>
        <button
          className={`search-contents-button-user ${selectedCategory === 'user' ? 'active' : ''}`}
          onClick={() => handleCategoryClick('user')}
        >
          사용자
        </button>
      </div>

      {selectedCategory === 'post' && (
        <div>
          <h2>게시글 결과:</h2>
          {searchResults.posts.length > 0 ? (
            searchResults.posts.map((post) => (
              <div key={post.postId}>
                <h3>{post.postTitle}</h3>
              </div>
            ))
          ) : (
            <p>게시글이 없습니다.</p>
          )}
        </div>
      )}
      {selectedCategory === 'tag' && <p>{`태그 결과: ${initialSearchQuery}`}</p>}
      {selectedCategory === 'user' && (
        <div>
          {searchResults.users.length > 0 ? (
            searchResults.users.map((user) => (
              <div key={user.userId} className="user-card">
                <img src={user.profileImage} alt={user.nickname} className="user-profile-image" />
                <div className="user-info">
                  <h4>사용자 명 {user.nickname}</h4>
                  <p>{user.oneLinerMessage}</p>
                  <p>팔로워 수 {user.followersCount}</p>
                </div>
              </div>
              // 데이터가 제대로 안뜸 + 이미지 및 한줄메세지 받아와야 함
            ))
          ) : (
            <p>사용자가 없습니다.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ResultPage;
