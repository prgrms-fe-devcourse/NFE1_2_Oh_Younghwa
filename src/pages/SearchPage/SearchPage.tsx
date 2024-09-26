import React, { useState } from 'react';
import RecentSearch from './Components/RecentSearch';
import RecommendPost from './Components/RecommendPost';

const SearchPage = () => {
    const [isInputFocused, setIsInputFocused] = useState(false);

    return (
        <div className='search-body'>
            <div className='search-text'>검색</div>
            <input className='search-bar'
                type='text' 
                onFocus={() => setIsInputFocused(true)}  // 입력 칸이 클릭되면 true
                onBlur={() => setIsInputFocused(false)}  // 입력 칸에서 벗어나면 false
            />
            {/* 입력 칸이 포커스되었을 때 최근 검색어, 아니면 추천 게시물 */}
            {isInputFocused ? (
                <div className='recent-search'>
                    <h3>최근 검색어</h3>
                    <RecentSearch/>
                </div>
            ) : (
                <div className='recommend-post'>
                    <h3>추천 게시물</h3>
                    <RecommendPost/>
                </div>
            )}
        </div>
    );
};

export default SearchPage;