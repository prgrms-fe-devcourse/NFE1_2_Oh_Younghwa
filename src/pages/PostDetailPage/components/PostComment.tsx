import OptionButtonIcon from '../../../shared/components/atom/icons/OptionButtonIcon.tsx';
import PlaceholderIcon from '../../../shared/components/atom/icons/PlaceholderIcon.tsx';
import { Comment } from '../model/article.ts';
import { elapsedText } from '../utility/elapsedText.ts';

import '../scss/postDetail.scss';

type CommentProps = {
  comments: Comment[];
};

export default function PostComment({ comments }: CommentProps) {
  const comment = comments;

  return (
    <div>
      <h1 className="comment-title">답글</h1>
      {comment.map((comment) => (
        <div key={comment._id} className="post-wrap">
          {comment.author.image ? <img className="profile-img" src={comment.author.image} alt={comment.comment} /> : <PlaceholderIcon/>}
          <div className="post-box">
            <div className="post-info">
              <p className="nickname">{comment.author.fullName}</p>
              <p className="created">{elapsedText(new Date(comment.createdAt))}</p>
            </div>
            <p className="post-contents">{comment.comment}</p>
            <div className="activity-wrap">
              <div className="activity-side">
              </div>
              <div><OptionButtonIcon /></div>
            </div>
          </div>
          </div>
        </div>
      ))}
    </div>
  );
}
