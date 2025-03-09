// import Banner from '../../../components/Banner/Banner'
// import './HomeRecommend.scss'
// import SingleLineDisplayBar from'../../../components/HorizontalDisplayBar/SingleLineDisplayBar/SingleLineDisplayBar.js'
// import LayoutContainer from '../../../components/ContentCard/LayoutContainer/LayoutContainer.js'
// import { Outlet } from 'react-router-dom'
// import { useEffect, useState } from 'react'
// import SortTop from '../../../components/SortTop/SortTop.js'
// const HomeRecommend = () => {
//     // const videoUrl = '/videos/ban.mp4'
//     const [sortIndex,setSortIndex]=useState(0)//0 热度 1 最新
//     const sortItems = [
//         {
//             name: '按热度',
//             handleFunc:() => {
//                 setSortIndex(0)
//             }
//         },
//         {
//             name: '按时间',
//             handleFunc:() => {
//                 setSortIndex(1)
//             }
//         }
//     ]
//     const [postItems,setPostItems]=useState([])
//     const imgUrl = [
//         "/images/header/banner/1.png",
//         "/images/header/banner/2.png",
//         "/images/header/banner/3.png",
//         "/images/header/banner/4.png",
//         "/images/header/banner/5.png",
//         "/images/header/banner/6.png",
//     ]
//     useEffect(() => {
        
//     },[])
//            const displayItems = [
//         {
//             name:'a'
//         },
//         {
//             name:'b'
//         },
//         {
//             name:'c'
//         },
//         {
//             name:'d'
//         },
//         {
//             name:'e'
//         },
//         {
//             name:'f'
//         },
//         {
//             name:'g'
//         },
//         {
//             name:'h'
//         }
//     ]
    
//     return (
//         <div className="home-recommend">
//             <header className="home-recommend__header">
//                 <Banner bannerType={2} bannerData={imgUrl} />
//                 <SingleLineDisplayBar displayItems={displayItems} />
//             </header>
//             <SortTop sortIndex={sortIndex} sortItems={sortItems}/>
//             <main className="home-recommend__main" >
//                 <LayoutContainer items={postItems}/>
//             </main>
//             <Outlet/>
//         </div>
//     )
// }
// export default HomeRecommend


import Banner from '../../../components/Banner/Banner';
import './HomeRecommend.scss';
import SingleLineDisplayBar from '../../../components/HorizontalDisplayBar/SingleLineDisplayBar/SingleLineDisplayBar.js';
import LayoutContainer from '../../../components/ContentCard/LayoutContainer/LayoutContainer.js';
import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import SortTop from '../../../components/SortTop/SortTop.js';
import { getPostList } from '../../../api/post.js'; // 假设有一个获取帖子列表的 API

const HomeRecommend = () => {
  const [sortIndex, setSortIndex] = useState(0); // 0 热度 1 最新
  const [postItems, setPostItems] = useState([]); // 帖子列表状态
  const [page, setPage] = useState(1); // 当前页码
  const [hasMore, setHasMore] = useState(true); // 是否还有更多数据
    const [loading, setLoading] = useState(false); // 加载状态
    console.log(postItems)
  // 排序选项
  const sortItems = [
    {
      name: '按热度',
      handleFunc: () => {
        setSortIndex(0);
        setPage(1); // 重置页码
        setPostItems([]); // 清空帖子列表
        setHasMore(true); // 重置是否有更多数据
      },
    },
    {
      name: '按时间',
      handleFunc: () => {
        setSortIndex(1);
        setPage(1); // 重置页码
        setPostItems([]); // 清空帖子列表
        setHasMore(true); // 重置是否有更多数据
      },
    },
  ];

  // 获取帖子列表
  const getPostItems = async (page, sortIndex) => {
    if (loading || !hasMore) return; // 避免重复请求
    setLoading(true);

    try {
      const sortBy = sortIndex === 0 ? 'replies' : 'createdAt'; // 排序字段
      const sortOrder = sortIndex === 0 ? -1 : 1; // 排序顺序

      const data = await getPostList({
        page,
        limit: 10, // 每页条数
        sortBy,
        sortOrder,
      });

      if (data.length > 0) {
        setPostItems((prev) => [...prev, ...data]); // 追加新数据
        setPage((prev) => prev + 1); // 更新页码
      } else {
        setHasMore(false); // 没有更多数据
      }
    } catch (error) {
      console.error('获取帖子列表失败:', error);
    } finally {
      setLoading(false);
    }
  };

  // 初始化加载帖子列表
  useEffect(() => {
    getPostItems(page, sortIndex);
  }, [sortIndex]); // 当排序方式变化时重新加载

  // 监听滚动事件，实现无限滚动
  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
      if (scrollHeight - scrollTop <= clientHeight + 100 && hasMore && !loading) {
        getPostList(page, sortIndex);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [page, sortIndex, hasMore, loading]);

  // 图片 URL 数据
  const imgUrl = [
    '/images/header/banner/1.png',
    '/images/header/banner/2.png',
    '/images/header/banner/3.png',
    '/images/header/banner/4.png',
    '/images/header/banner/5.png',
    '/images/header/banner/6.png',
  ];

  // 展示项数据
  const displayItems = [
    { name: 'a' },
    { name: 'b' },
    { name: 'c' },
    { name: 'd' },
    { name: 'e' },
    { name: 'f' },
    { name: 'g' },
    { name: 'h' },
  ];

  return (
    <div className="home-recommend">
      <header className="home-recommend__header">
        <Banner bannerType={2} bannerData={imgUrl} />
        <SingleLineDisplayBar displayItems={displayItems} />
      </header>
      <SortTop sortIndex={sortIndex} sortItems={sortItems} />
      <main className="home-recommend__main">
        <LayoutContainer items={postItems} />
        {loading && <div className="loading">加载中...</div>}
        {!hasMore && <div className="no-more">没有更多数据了</div>}
      </main>
      <Outlet />
    </div>
  );
};

export default HomeRecommend;