import React, { useEffect, useRef, useState } from "react";
import './Searchbar.scss';
import Search from "../icons/Search";
import { useNavigate } from "react-router-dom";

const Searchbar = () => {
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const [searchHistory, setSearchHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

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
    ].slice(0, 10); // 保留最近10条
    
    localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
    setSearchHistory(updatedHistory);
  };

  // 执行搜索
  const handleSearch = () => {
    const searchTerm = inputRef.current?.value?.trim();
    if (!searchTerm) {
      inputRef.current?.focus();
      return;
    }

    saveSearchHistory(searchTerm);
    setShowHistory(false);
    navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
  };

  // 处理键盘事件
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // 优化后的设备检测
  useEffect(() => {
    const handleFocus = () => {
      setShowHistory(true);
    };

    const handleBlur = () => {
      setTimeout(() => {
        setShowHistory(false);
      }, 200); // 延迟隐藏避免立即关闭
    };

    const input = inputRef.current;
    if (input) {
      input.addEventListener('focus', handleFocus);
      input.addEventListener('blur', handleBlur);
    }

    return () => {
      if (input) {
        input.removeEventListener('focus', handleFocus);
        input.removeEventListener('blur', handleBlur);
      }
    };
  },[]);

  return (
    <div className='searchbar-container'>
      <input
        ref={inputRef}
        className="search-input"
        placeholder="请输入搜索内容"
        onKeyPress={handleKeyPress}
      />
      
      <div className="search-button" onClick={handleSearch}>
        <Search className='search' />
      </div>

      {showHistory && searchHistory.length > 0 && (
        <div className="search-history">
          <div className="history-header">
            <span>搜索历史</span>
            <button 
              onClick={() => {
                localStorage.removeItem('searchHistory');
                setSearchHistory([]);
              }}
            >
              清空
            </button>
          </div>
          <ul>
            {searchHistory.map((term, index) => (
              <li 
                key={index}
                onClick={() => {
                  inputRef.current.value = term;
                  handleSearch();
                }}
              >
                {term}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Searchbar;