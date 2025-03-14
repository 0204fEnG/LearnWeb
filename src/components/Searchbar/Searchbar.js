import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import './Searchbar.scss';
import SearchIcon from "../icons/Search";

const Searchbar = ({ inputContent,searchType,handleInputContentChange}) => {
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const location=useLocation()
  const [searchHistory, setSearchHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const divRef=useRef()

  // 加载搜索历史
  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
    setSearchHistory(savedHistory);
  }, []);

  // 保存去重的搜索历史
  const saveSearchHistory = (term) => {
    const cleanedTerm = term.trim();
    if (!cleanedTerm) return;

    const updatedHistory = [
      cleanedTerm,
      ...searchHistory.filter(item => item !== cleanedTerm)
    ].slice(0, 10);
    
    localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
    setSearchHistory(updatedHistory);
  };

  // 执行搜索
 const handleSearch = (searchTerm = inputContent) => {
  const searchTermTrimmed = searchTerm.trim();
  if (!searchTermTrimmed) {
    inputRef.current?.focus();
    return;
  }

  saveSearchHistory(searchTermTrimmed);
  setShowHistory(false);

  const currentType = searchType || 'circle';
  if (location.pathname !== '/search') {
    navigate(`/search?q=${encodeURIComponent(searchTermTrimmed)}&type=${currentType}`, { replace: true });
  }
};

  // 处理键盘事件
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // 监听全局点击事件，判断是否点击在搜索历史区域外部[^14^]
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (divRef.current && !divRef.current.contains(e.target)) {
        setShowHistory(false);
      }
    };
    const handleFocus = () => setShowHistory(true);
    const input = inputRef.current;
    if (input) {
      input.addEventListener('focus', handleFocus);
    }
    document.addEventListener('click', handleClickOutside);
    return () => {
      if (input) {
        input.removeEventListener('focus', handleFocus);
      }
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);
  return (
    <div className='searchbar-container' ref={divRef}>
      <div className="search-input-wrapper">
      <input
        ref={inputRef}
        className="search-input"
        placeholder="请输入搜索内容"
        value={inputContent}
        onChange={(e) => handleInputContentChange(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      
        <button className="search-button" onClick={(e) => {
          e.stopPropagation();
          handleSearch(inputContent)
        }
        }>
        <SearchIcon className='search' />
      </button>
</div>
      {showHistory && (
        <div className="search-history">
          <div className="history-header">
            {searchHistory.length > 0 ? (
              <>
              <span className="history-title">搜索历史</span>
                <button className="search-button" onClick={(e) => {
                  e.stopPropagation();
                localStorage.removeItem('searchHistory');
                setSearchHistory([]);
              }}>
                清空
              </button>
              </>
            ):<span className="history-title">暂无搜索历史</span>}
          </div>
          {searchHistory.length > 0 &&
            <ul className="histories">
              {searchHistory.map((term, indexLi) => (
                <li
                  key={indexLi}
                  className="history-item"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleInputContentChange(term)
                    handleSearch(term)
                  }}
                >
                  {term}
                  <span className="delete" onClick={(e) => {
                    e.stopPropagation();
                    setSearchHistory((prev) => {
                      const newHistory = [...prev];
                      newHistory.splice(indexLi, 1);
                      localStorage.setItem('searchHistory', JSON.stringify(newHistory));
                      return newHistory;
                    });
                  }}>×
                  </span>
                </li>
              ))}
            </ul>
          }
        </div>
      )}
    </div>
  );
};

export default Searchbar;