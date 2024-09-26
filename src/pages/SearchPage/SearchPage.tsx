import React, { useState } from 'react';
import RecentSearch from './Components/RecentSearch';
import RecommendPost from './Components/RecommendPost';
import './search.scss';
import InputSearchIcon from '../../shared/components/atom/icons/InputSearchIcon';

const SearchPage = () => {
    const [isInputFocused, setIsInputFocused] = useState(false);

    return (
        <div className='search-body'>
            <form className="search-form">
                    <InputSearchIcon/>
                    <input
                        className='search-form-input'
                        type='text'
                        onFocus={() => setIsInputFocused(true)}  // 입력 칸이 클릭되면 true
                        onBlur={() => setIsInputFocused(false)}  // 입력 칸에서 벗어나면 false
                    />
            </form>

            <div className='search-contents'>
                {isInputFocused ? (
                    <div className='recent-search'>
                        <h3>최근 검색어</h3>
                        <RecentSearch />
                    </div>
                ) : (
                    <div className='recommend-post'>
                        <h3>추천 게시물</h3>
                        <RecommendPost />
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchPage;
