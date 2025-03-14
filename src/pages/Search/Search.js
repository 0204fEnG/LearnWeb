import { Outlet, useNavigate, useSearchParams } from 'react-router-dom';
import { lazy, Suspense, useEffect, useState } from 'react';
import FuncNavbar from '../../components/Navbar/FuncNav/FuncNavbar';
import Searchbar from '../../components/Searchbar/Searchbar';
import './Search.scss';
import Loading from '../../components/Loading/Loading';
import ChevronLeftIcon from '../../components/icons/ChevronLeftIcon.js';
const LazySearchCirclePage = lazy(() => import('./SearchCircle/SearchCircle.js'));
const LazySearchPostPage = lazy(() => import('./SearchPost/SearchPost.js'));
const LazySearchUserPage = lazy(() => import('./SearchUser/SearchUser.js'));
const LazySearchShortPage = lazy(() => import('./SearchShort/SearchShort.js'));
const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [mysearchParams, setMysearchParams] = useState({
    q: searchParams.get('q')||'',
    type:searchParams.get('type')||''
  })
  const handleInputContentChange = (newQ) => {
    setSearchParams(prev => {
      prev.set('q', newQ);
      return prev;
    }, { replace: true });
    setMysearchParams(prev => ({
      ...prev,
      q: newQ
    }));
  } 
  // 初始化默认搜索类型

  const handleSearchTypeItems = [
    {
      name: '搜圈子',
      handleFunc: () => {
        setSearchParams(prev => {
          prev.set('type', 'circle');
          return prev;
        }, { replace: true });
        setMysearchParams(prev => ({
          ...prev,
          type:'circle'
        }))
      }
    },
    {
      name: '搜帖子',
      handleFunc: () => {
        setSearchParams(prev => {
          prev.set('type', 'post');
          return prev;
        }, { replace: true });
        setMysearchParams(prev => ({
          ...prev,
          type:'post'
        }))
      }
    },
    {
      name: '搜用户',
      handleFunc: () => {
        setSearchParams(prev => {
          prev.set('type', 'user');
          return prev;
        }, { replace: true });
        setMysearchParams(prev => ({
          ...prev,
          type:'user'
        }))
      }
    },
    {
      name: '搜短视频',
      handleFunc: () => {
        setSearchParams(prev => {
          prev.set('type', 'short');
          return prev;
        }, { replace: true });
        setMysearchParams(prev => ({
          ...prev,
          type:'short'
        }))
      }
    }
  ];
const nav=useNavigate()
  const renderPage = () => {
    switch (mysearchParams.type) {
      case 'circle':
        return <LazySearchCirclePage keyword={mysearchParams.q}/>;
      case 'post':
        return <LazySearchPostPage keyword={mysearchParams.q}/>;
      case 'user':
        return <LazySearchUserPage keyword={mysearchParams.q}/>;
      case 'short':
        return <LazySearchShortPage keyword={mysearchParams.q}/>;
      default:
        return <LazySearchCirclePage keyword={mysearchParams.q}/>;
    }
  };

  return (
    <div className="search-container">
      <div className="search-header">
        <button className="search-back-to-wrapper" onClick={(e) => {
          e.stopPropagation()
          nav(-1)
        }}><ChevronLeftIcon className='search-back-to'/></button>
        <div className="search-page-bar-container"><Searchbar inputContent={mysearchParams.q} searchType={mysearchParams.type } handleInputContentChange={handleInputContentChange}/></div>
      </div>
      <div className="navbar-container">
        <FuncNavbar handleItems={handleSearchTypeItems} />
      </div>
      <Suspense fallback={<Loading />}>
        {renderPage()}
      </Suspense>
      <Outlet/>
    </div>
  );
};

export default Search;
