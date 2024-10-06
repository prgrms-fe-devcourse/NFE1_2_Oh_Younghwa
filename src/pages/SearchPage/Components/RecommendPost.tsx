import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import CommentButtonIcon from '../../../shared/components/atom/icons/CommentButtonIcon';
import LikeButtonIcon from '../../../shared/components/atom/icons/LikeButtonIcon';
import PlaceholderIcon from '../../../shared/components/atom/icons/PlaceholderIcon';
import { elapsedText } from '../../TimelinePage/utility/elapsedText';
import { recommendPosts } from '../api/searchApi';

import '../search.scss';

export type User = {
  _id: string;
  fullName: string;
  followers: [];
  messages: string;
  image: string;
};

export type Post = {
  _id: string;
  title: string;
  updatedAt: string;
  author: User;
  likes: [];
  comments: [];
  image?: string;
};
const RecommendedPost = () => {
  const [recommendedPosts, setRecommendedPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecommendedPosts = async () => {
      setLoading(true);
      try {
        const posts = await recommendPosts();
        setRecommendedPosts(posts);
      } catch (error) {
        console.error('Failed to fetch recommended posts:', error);
        setError('추천 게시물을 가져오는 데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendedPosts();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="recommend-container">
      <h2 className="recommend-post-text">추천 게시물</h2>
      {recommendedPosts.length > 0 ? (
        recommendedPosts.map((post) => (
          <div key={post._id} className="search-post">
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
                {post.image ? <img className="search-post-image" src={post.image} alt="post" /> : null}
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
        <p>No recommended posts found.</p>
      )}
    </div>
  );
};

export default RecommendedPost;
