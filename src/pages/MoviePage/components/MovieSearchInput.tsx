import { ChangeEventHandler } from 'react';
import InputSearchIcon from '../../../shared/components/atom/icons/InputSearchIcon';
type MovieSearchInputProps = {
  handleSearchKeyword: ChangeEventHandler<HTMLInputElement>;
};
export default function MovieSearchInput({ handleSearchKeyword }: MovieSearchInputProps) {
  return (
    <div className="search-bar">
      <div className="search-icon">
        <InputSearchIcon />
      </div>
      <input className="search-input" type="text" placeholder="영화제목 검색" onChange={handleSearchKeyword} />
    </div>
  );
}
