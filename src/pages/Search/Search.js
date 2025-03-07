import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import RouteNavbar from '../../components/Navbar/RouteNav/RouteNavbar';
import { useEffect } from 'react';
import Searchbar from '../../components/Searchbar/Searchbar';

const Search = () => {
  const location = useLocation(); // 获取当前路由信息
  const navigate = useNavigate(); // 获取导航函数
  const searchParams = new URLSearchParams(location.search); // 获取查询参数
  const query = searchParams.get('query'); // 获取 'query' 参数

  // 动态生成子路由
  const routes = [
    {
      name: '搜圈子',
      path: `/search/search-circle?query=${encodeURIComponent(query || '')}`
    }
  ];

  // 当查询参数变化时更新路由
  useEffect(() => {
    if (query) {
      // 确保只有在路径不正确时才进行导航
      const currentPath = location.pathname;
      if (currentPath !== `/search/search-circle`) {
        navigate(`/search/search-circle?query=${encodeURIComponent(query)}`);
      }
    }
  }, [query, navigate, location.pathname]); // 确保依赖项正确

  return (
    <div className="search-container">
      <Searchbar />
      <RouteNavbar routes={routes} />
      <Outlet />
    </div>
  );
};

export default Search;