import React from 'react';
import { useArticles } from '../hooks/useArticles.ts';
import { Post } from '../model/article.ts';



const Postlist = () => {
  const { data = [], isError, isLoading } = useArticles();

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>에러 발생</div>;

  console.log(data);

  return (
    <div>
      <div className="">
        {data.map((post: Post) => (
          <div key={post._id} className="">
            <img
              style={{ objectFit: 'contain', width: '32px' }}
              src={post.author.image}
              alt={post.title}
            />{' '}
            <h3>{post.author.fullName}</h3>
            <p>{post.createdAt}</p>
            <p>{post.title}</p>
            <div>
              <div>{post.likes.length}</div>
              <div>{post.comments.length}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Postlist;