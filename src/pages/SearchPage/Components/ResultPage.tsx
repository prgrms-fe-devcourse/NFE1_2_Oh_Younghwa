import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import CommentButtonIcon from '../../../shared/components/atom/icons/CommentButtonIcon';
import InputDeleteIcon from '../../../shared/components/atom/icons/InputDeleteIcon';
import InputSearchIcon from '../../../shared/components/atom/icons/InputSearchIcon';
import LikeButtonIcon from '../../../shared/components/atom/icons/LikeButtonIcon';
import OptionButtonIcon from '../../../shared/components/atom/icons/OptionButtonIcon';
import { elapsedText } from '../../TimelinePage/utility/elapsedText';
import { searchPosts, searchUsers } from '../api/searchApi';

import '../search.scss';

type User = {
  _id: string;
  fullName: string;
  followers: [];
  messages: string;
  image: string;
};

type Post = {
  _id: string;
  title: string;
  updatedAt: string;
  author: User;
  likes: [];
  comments: [];
  image?: string;
};

type SearchResult = {
  users: User[];
  tags: Post[];
  posts: Post[];
};

const ResultPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('post');
  const [inputValue, setInputValue] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult>({ users: [], posts: [], tags: [] });

  // 카테고리 클릭 핸들러
  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchSearchResult();
  };
  // // 검색 결과를 가져오는 함수
  const fetchSearchResult = async () => {
    const users = await searchUsers(inputValue);
    const posts = await searchPosts(inputValue);
    const tags = await searchPosts(inputValue);
    setSearchResults({ users, posts, tags }); // 검색 결과 업데이트
  };

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (inputValue) {
        const users = await searchUsers(inputValue);
        const posts = await searchPosts(inputValue);
        const tags = await searchPosts(inputValue);
        setSearchResults({ users, posts, tags });
      } else {
        setSearchResults({ users: [], posts: [], tags: [] });
      }
    };

    fetchSearchResults();
  }, [inputValue]);

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
        <div className="search-container">
          {searchResults.posts.length > 0 ? (
            searchResults.posts.map((post, index) => (
              <div key={index} className="search-post">
                <img className="search-post-profileimg" src={post.author.image} alt="profile-img" />
                <div className="search-post-detail">
                  <div className="search-post-info">
                    <p className="search-post-name">{post.author.fullName}</p>
                    <p className="search-post-updated">{elapsedText(new Date(post.updatedAt))}</p>
                  </div>
                  <Link to={`/posts/${post._id}`}>
                    <h3 className="search-post-title">{post.title}</h3>
                    {post.image ? <img className="search-post-image" src={post.image} /> : null}
                  </Link>
                  <div className="search-post-icons">
                    <div className="search-post-icondetaile">
                      <div className="search-post-likeNum">
                        <LikeButtonIcon />
                        {post.likes.length}
                      </div>
                      <div className="search-post-commentNum">
                        <CommentButtonIcon />
                        {post.comments.length}
                      </div>
                    </div>
                    <div className="search-post-options">
                      <OptionButtonIcon />
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>게시글이 없습니다.</p>
          )}
        </div>
      )}

      {selectedCategory === 'tag' && (
        <div className="search-container">
          {searchResults.tags.length > 0 ? <p>태그 검색 결과</p> : <p>게시글이 없습니다.</p>}
        </div>
      )}

      {selectedCategory === 'user' && (
        <div className="search-container">
          {searchResults.users.length > 0 ? (
            searchResults.users.map((user, index) => (
              <div key={index} className="search-user">
                <img src={user.image} className="search-user-image" alt="profile" />
                <Link to={`/users/${user._id}`}>
                  <div className="search-user-info">
                    <h4 className="search-user-name">{user.fullName}</h4>
                    <p className="search-user-followerNum">팔로워{user.followers.length}명</p>
                    <p className="search-user-message">{user.messages}한줄</p>
                  </div>
                </Link>
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
