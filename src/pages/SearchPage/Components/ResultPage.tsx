import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import InputDeleteIcon from '../../../shared/components/atom/icons/InputDeleteIcon';
import InputSearchIcon from '../../../shared/components/atom/icons/InputSearchIcon';

import { searchUsers, searchPosts } from '../api/searchApi';
import '../search.scss';
import LikeButtonIcon from '../../../shared/components/atom/icons/LikeButtonIcon';
import CommentButtonIcon from '../../../shared/components/atom/icons/CommentButtonIcon';

type User = {
  _id: string;
  fullName: string;
  profileImage: string;
  followers: [];
  messages: string;
};

type Post = {
  title: string;
  updatedAt: string;
  author: Author;
  likes: [];
  comments: [];
  image?: string;
};
type Author = {
  fullName: string;
  _id: string;
};

type SearchResult = {
  users: User[];
  posts: Post[];
};

const getFollowerCount = (user: User): number => {
  return user.followers.length;
};
const ResultPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('post');
  const [inputValue, setInputValue] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult>({ users: [], posts: [] });

  // 카테고리 클릭 핸들러
  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  // // 검색 결과를 가져오는 함수
  // const fetchSearchResults = async () => {

  //     const users = await searchUsers(inputValue);
  //     console.log(users)
  //     const posts = await searchPosts(inputValue);
  //     console.log(posts)
  //     setSearchResults({ users, posts }); // 검색 결과 업데이트

  // };

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (inputValue) {
        const users = await searchUsers(inputValue);
        const posts = await searchPosts(inputValue);
        setSearchResults({ users, posts });
      } else {
        setSearchResults({ users: [], posts: [] });
      }
    };

    fetchSearchResults();
  }, [inputValue]);

  return (
    <div className="search-contents">
      <form className="search-form">
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
        <div className="search-container">
          {searchResults.posts.length > 0 ? (
            searchResults.posts.map((post, index) => (
              <div key={index} className="search-post">
                <h2 className="search-post-name">{post.author.fullName}</h2>
                <h3 className="search-post-title">{post.title}</h3>
                {post.image && <img src={post.image} className="search-post-image" alt={post.title} />}
                <div className="search-post-icons">
                  <p className="search-post-likeNum">
                    <LikeButtonIcon />
                    {post.likes.length}
                  </p>
                  <p className="search-post-commentNum">
                    <CommentButtonIcon />
                    {post.comments.length}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p>게시글이 없습니다.</p>
          )}
        </div>
      )}
      {selectedCategory === 'tag' && <p>{`태그 결과: ${inputValue}`}</p>}
      {selectedCategory === 'user' && (
        <div className="search-container">
          {searchResults.users.length > 0 ? (
            searchResults.users.map((user, index) => (
              <div key={index} className="search-user">
                <img src={user.profileImage} className="search-user-image" />
                <div className="search-user-info">
                  <h4 className="search-user-name">{user.fullName}</h4>
                  <p className="search-user-followerNum">팔로워{getFollowerCount(user)}명</p>
                  <p className="search-user-message">{user.messages}한줄</p>
                </div>
              </div>
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
