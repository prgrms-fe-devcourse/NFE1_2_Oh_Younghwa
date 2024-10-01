
import './timeline.scss'; // 미리 정의된 CSS 파일

interface Props {
  text: string;
  limit: number;
}

post.title

export const TextMaxHidden: React.FC<Props> = ({ text, limit = 264 }) => {
  const className = text.length > limit ? 'long-text' : 'short-text';

  return <div className={className}>{text}</div>;
};
