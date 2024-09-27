import NoResultIcon from '../../../shared/components/atom/icons/NoResultIcon';

import '../scss/NoResult.scss';
export default function NoResult() {
  return (
    <div className="no-result-page">
      <NoResultIcon />
      <p className="no-result-message">찾으시는 검색 결과가 없습니다</p>
    </div>
  );
}
