import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import CommentButtonIcon from '../../../shared/components/atom/icons/CommentButtonIcon';
import InputDeleteIcon from '../../../shared/components/atom/icons/InputDeleteIcon';
import InputSearchIcon from '../../../shared/components/atom/icons/InputSearchIcon';
import LikeButtonIcon from '../../../shared/components/atom/icons/LikeButtonIcon';
import OptionButtonIcon from '../../../shared/components/atom/icons/OptionButtonIcon';
import PlaceholderIcon from '../../../shared/components/atom/icons/PlaceholderIcon';
import { useLikesMutation } from '../../MovieDetailPage/hook/useLikesMutation';
import { elapsedText } from '../../TimelinePage/utility/elapsedText';
import UpdateModal from '../../WritePostPage/components/UpdateModal';
import WriteCommentModal from '../../WritePostPage/components/WriteComment';
import { searchPosts, searchTags, searchUsers } from '../api/searchApi';

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
  const inputRef = useRef<HTMLInputElement>(null);

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
    const tags = await searchTags(inputValue);
    setSearchResults({ users, posts, tags }); // 검색 결과 업데이트
  };

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (inputValue === '') {
        // 입력값이 비어있을 때 검색 결과 초기화
        setSearchResults({ users: [], posts: [], tags: [] });
      } else {
        const users = await searchUsers(inputValue);
        const posts = await searchPosts(inputValue);
        const tags = await searchTags(inputValue);
        setSearchResults({ users, posts, tags });
      }

      if (inputRef.current) {
        inputRef.current.focus();
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
          ref={inputRef}
        />

        <div
          onClick={() => {
            setInputValue('');
            setSearchResults({ users: [], posts: [], tags: [] });
          }}
        >

          <InputDeleteIcon />
        </div>
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
                <Link to={`/users/${post.author._id}`}>
                  {post.author.image ? (
                    <img className="search-post-profileimg" src={post.author.image} />
                  ) : (
                    <PlaceholderIcon />
                  )}
                </Link>
                <div className="search-post-detail">
                  <Link to={`/users/${post.author._id}`}>
                    <div className="search-post-info">
                      <p className="search-post-name">{post.author.fullName}</p>
                      <p className="search-post-updated">{elapsedText(new Date(post.updatedAt))}</p>
                    </div>
                  </Link>
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
          {searchResults.tags.length > 0 ? (
            searchResults.tags.map((post, index) => (
              <div key={index} className="search-post">
                <Link to={`/users/${post.author._id}`}>
                  {post.author.image ? (
                    <img className="search-post-profileimg" src={post.author.image} />
                  ) : (
                    <PlaceholderIcon />
                  )}
                </Link>
                <div className="search-post-detail">
                  <Link to={`/users/${post.author._id}`}>
                    <div className="search-post-info">
                      <p className="search-post-name">{post.author.fullName}</p>
                      <p className="search-post-updated">{elapsedText(new Date(post.updatedAt))}</p>
                    </div>
                  </Link>
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
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>태그가 없습니다.</p>
          )}
        </div>
      )}

      {selectedCategory === 'user' && (
        <div className="search-container">
          {searchResults.users.length > 0 ? (
            searchResults.users.map((user, index) => (
              <div key={index} className="search-user">
                <Link to={`/users/${user._id}`}>
                  {user.image ? <img className="search-user-image" src={user.image} /> : <PlaceholderIcon />}
                </Link>

                <Link to={`/users/${user._id}`}>
                  <div className="search-user-info">
                    <h4 className="search-user-name">{user.fullName}</h4>
                    <p className="search-user-followerNum">팔로워{user.followers.length}명</p>
                    <p className="search-user-message">{user.messages}</p>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <p>사용자가 없습니다.</p>
          )}
        </div>
      )}

      {/* {UpdateModalOpen && (
        <UpdateModal
          listPostId={nowPostId}
          listChannelId={'66f50d3001d4aa076bcbdb99'}
          listPostTitle={nowPostTitle}
          isUpdateModalOpen={UpdateModalOpen}
          onClose={() => setUpdateModalOpen(false)}
        />
      )}

      {CommentModalOpen && (
        <WriteCommentModal
          listPostId={nowPostId}
          listChannelId={'66f50d3001d4aa076bcbdb99'}
          listFullname={nowPostFullname}
          listPostTitle={nowPostTitle}
          isCommentModalOpen={CommentModalOpen}
          listPostImg={nowPostImg}
          onClose={() => setCommentModalOpen(false)}
        />
      )} */}
    </div>
  );
};

export default ResultPage;
