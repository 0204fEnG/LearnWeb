import { useNavigate, useSearchParams } from 'react-router-dom';
import { lazy, Suspense, useEffect } from 'react';
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
  const navigate = useNavigate();

  // 初始化默认搜索类型

  const handleSearchTypeItems = [
    {
      name: '搜圈子',
      handleFunc: () => {
        setSearchParams(prev => {
          prev.set('type', 'circle');
          return prev;
        },{ replace: true });
      }
    },
    {
      name: '搜帖子',
      handleFunc: () => {
        setSearchParams(prev => {
          prev.set('type', 'post');
          return prev;
        },{ replace: true });
      }
    },
    {
      name: '搜用户',
      handleFunc: () => {
        setSearchParams(prev => {
          prev.set('type', 'user');
          return prev;
        },{ replace: true });
      }
    },
    {
      name: '搜短视频',
      handleFunc: () => {
        setSearchParams(prev => {
          prev.set('type', 'short');
          return prev;
        },{ replace: true });
      }
    }
  ];
const nav=useNavigate()
  const renderPage = () => {
    switch (searchParams.get('type')) {
      case 'circle':
        return <LazySearchCirclePage />;
      case 'post':
        return <LazySearchPostPage />;
      case 'user':
        return <LazySearchUserPage />;
      case 'short':
        return <LazySearchShortPage />;
      default:
        return <LazySearchCirclePage />;
    }
  };

  return (
    <div className="search-container">
      <div className="search-header">
        <button className="search-back-to-wrapper" onClick={(e) => {
          e.stopPropagation()
          nav(-1)
        }}><ChevronLeftIcon className='search-back-to'/></button>
        <div className="search-page-bar-container"><Searchbar/></div>
      </div>
      <div className="navbar-container">
        <FuncNavbar handleItems={handleSearchTypeItems} />
      </div>
      <Suspense fallback={<Loading />}>
        {renderPage()}
      </Suspense>
    </div>
  );
};

export default Search;