// import {  Link, useNavigate, useParams} from 'react-router-dom'
// import './Post.scss'
// import { useEffect, useRef, useState } from 'react'
// import ChevronLeftIcon from '../../components/icons/ChevronLeftIcon'
// import NineGrid from '../../components/NineGrid/NineGrid'
// import ThreeDotsVer from '../../components/icons/ThreeDotsVer'
// import { useActivate} from 'react-activation'
// import Comment from '../../components/Comment/Comment'
// import SortTop from '../../components/SortTop/SortTop'
// const Post = () => {
//     const [isFinal, setIsFinal] = useState(false)
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
//     const nav = useNavigate()
//     // const divInfo = useOutletContext()
//     const { postId } = useParams()
//     const [count, setCount] = useState(0)
//     const timer=useRef(null)
//     const handleMaskClick = (event) => {
//         // if (event.target !== event.currentTarget) {
//         //     return
//         // }
//         // event.stopPropagation();
//         if (!isFinal) {
//             clearTimeout(timer.current)
//             setIsFinal(true)
//         }
//         else {
//             setIsFinal(false)
//             timer.current=setTimeout(() => {
//                 nav(-1)
//             }, 300)
//         }
//     }
//     const imgs = [
//         '/images/header/banner/1.png',
//         '/images/header/banner/2.png',
//         '/images/header/banner/3.png',
//         '/images/header/banner/4.png',
//         '/images/header/banner/5.png',
//         '/images/header/banner/6.png',
//         '/images/header/banner/1(1).jpeg',
//         '/images/header/banner/1(4).jpeg',
//         '/images/header/banner/1(3).jpeg',
//     ]
//     useActivate(() => {
//         setIsFinal(true)
//     })
//     useEffect(() => {
//         timer.current = setTimeout(() => {
//         setIsFinal(true)
//         }, 10)
//         return () => {
//             clearTimeout(timer.current)
//         }
//     },[])
//     return (
//         <div className={`post-mask ${isFinal&&'final'}`} onClick={handleMaskClick} >
//             <div className={`post-css-container ${isFinal&&'final'}`}>
//             <div onClick={(event) => {
//                 event.stopPropagation(); // 阻止事件冒泡
//             }} className='post-container' >
//                 <div className="header">
//                     <div onClick={handleMaskClick} className='back-container'>
//                         <ChevronLeftIcon className='back' />
//                     </div>
//                     <div className="author-info">
//                         <Link to={`/user/${postId}/user-home`}className="img-container" onClick={()=>setCount((prev)=>prev+1)}>
//                         <img src="/images/header/banner/4.png" alt="用户头像" className="avatar" />
//                         </Link>
//                         <Link to={`/user/${postId}/user-home`} className='name-container'>
//                             <span className="name">{postId}</span>
//                             <span className="publish-time">count:{ count}</span>
//                         </Link>
//                     </div>
//                        <div className="follow-container">
//                             <button className='follow'>
//                                 关注
//                             </button>
//                     </div>
//                     <button className="three"><ThreeDotsVer className='three-svg'/></button>
//                 </div>
//                 <div className="content-container">
//                     <div className="article">
//         &emsp;&emsp;鼬是一个天才，他富有智慧，理智，善于思考，7岁时就被三代火影猿飞日斩称赞能以火影的角度思考问题，因此鼬从小的思想也没有被宇智波一族和村子的界限所束缚。有些沉默寡言，不善交流，因此鼬的童年时期在同龄人和甚至比自己稍微大一点儿的人中，鼬的思想和成熟也使他显得有些孤立，由于4岁时经历了第三次忍界大战的惨烈，所以对于战争非常厌恶，他为了更加了解这个世界，不断的渴望力量和知识。
// 有自我牺牲精神，受止水的影响，认为忍者是为了实现目标而忍辱负重的人，因此他自愿成为了罪人而灭族，背负了整个木叶和佐助的仇恨与黑暗。鼬是个非常热爱村子的人，即使这个村子有着无数黑暗和矛盾，他也依旧以自己身为木叶的忍者而感到骄傲。为了村子和弟弟的安危，鼬选择灭族后隐藏真相成为S级叛忍并加入“晓”组织。
// 身为间谍的时期，一度对自己的选择感到深深的迷茫和矛盾，但还是认清了自我，了解到了一个人的力量有限，认为想要依靠自己去解决一切的自己是失败的，而要和伙伴们共同努力，做好自己应做的事情，他的这份思想深深的感染了一度想要靠自己拯救一切的鸣人，也正因如此，面对对自己的身份感到迷茫的药师兜，鼬伸出了援手拯救了他的心。
// 鼬深爱着自己的弟弟佐助，在佐助小时候的记忆中，鼬一直是个温柔、优秀、深爱自己的好哥哥，鼬为了守护村子而选择了灭族，但是只有佐助，鼬无论如何也无法下手，对佐助表示“无论你今后的路怎么走，我都一直深爱着你”。
//                     </div>
//                     <div className="img-container">
//                         <NineGrid images={imgs}/>
//                     </div>
//                 </div>
//                     <div className="comments-container">
//                         <SortTop stickyTop='sort-sticky-top' sortIndex={sortIndex} sortItems={sortItems}/>
//                     <Comment/>
//                 </div>
//                 </div>
//                 </div>
//         </div>
//     )
// }
// export default Post

import { Link, useNavigate, useParams } from 'react-router-dom';
import './Post.scss';
import { useEffect, useRef, useState } from 'react';
import ChevronLeftIcon from '../../components/icons/ChevronLeftIcon';
import NineGrid from '../../components/NineGrid/NineGrid';
import ThreeDotsVer from '../../components/icons/ThreeDotsVer';
import { useActivate } from 'react-activation';
import Comment from '../../components/Comment/Comment';
import SortTop from '../../components/SortTop/SortTop';
import { formatPublishTime } from '../../utils/time/formatPublishTime';
import { getPost } from '../../api/post'; // 导入 getPost API

const Post = () => {
  const [isFinal, setIsFinal] = useState(false);
  const [sortIndex, setSortIndex] = useState(0); // 0 热度 1 最新
  const [post, setPost] = useState(null); // 帖子数据
  const [loading, setLoading] = useState(true); // 加载状态
  const [error, setError] = useState(null); // 错误状态

  const sortItems = [
    {
      name: '按热度',
      handleFunc: () => {
        setSortIndex(0);
      },
    },
    {
      name: '按时间',
      handleFunc: () => {
        setSortIndex(1);
      },
    },
  ];

  const nav = useNavigate();
  const { postId } = useParams();
  const timer = useRef(null);

  // 加载帖子数据
  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const response = await getPost(postId);
        setPost(response.post); // 假设返回的数据结构为 { data: { post: {...} } }
        setError(null);
      } catch (err) {
        setError('加载帖子失败，请稍后重试');
        console.error('加载帖子失败:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  const handleMaskClick = (event) => {
    if (!isFinal) {
      clearTimeout(timer.current);
      setIsFinal(true);
    } else {
      setIsFinal(false);
      timer.current = setTimeout(() => {
        nav(-1);
      }, 300);
    }
  };

  const imgs = [
    '/images/header/banner/1.png',
    '/images/header/banner/2.png',
    '/images/header/banner/3.png',
    '/images/header/banner/4.png',
    '/images/header/banner/5.png',
    '/images/header/banner/6.png',
    '/images/header/banner/1(1).jpeg',
    '/images/header/banner/1(4).jpeg',
    '/images/header/banner/1(3).jpeg',
  ];

  useActivate(() => {
    setIsFinal(true);
  });

  useEffect(() => {
    timer.current = setTimeout(() => {
      setIsFinal(true);
    }, 0);
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  // 加载中状态
  if (loading) {
    return <div className="post-mask final">加载中...</div>;
  }

  // 错误状态
  if (error) {
    return <div className="post-mask final">{error}</div>;
  }

  // 帖子数据未找到
  if (!post) {
    return <div className="post-mask final">帖子未找到</div>;
  }

  return (
    <div className={`post-mask ${isFinal && 'final'}`} onClick={handleMaskClick}>
      <div className={`post-css-container ${isFinal && 'final'}`}>
        <div
          onClick={(event) => {
            event.stopPropagation(); // 阻止事件冒泡
          }}
          className="post-container"
        >
          <div className="header">
            <div onClick={handleMaskClick} className="back-container">
              <ChevronLeftIcon className="back" />
            </div>
            <div className="author-info">
              <Link
                to={`/user/${post.author._id}/user-home`}
                className="img-container"
              >
                <img
                  src={post.author.avatar}
                  alt="用户头像"
                  className="avatar"
                />
              </Link>
              <Link
                to={`/user/${post.author._id}/user-home`}
                className="name-container"
              >
                <span className="name">{post.author.username}</span>
                              <span className="publish-time">{formatPublishTime(post.createdAt )}</span>
              </Link>
            </div>
            <div className="follow-container">
              <button className="follow">关注</button>
            </div>
            <button className="three">
              <ThreeDotsVer className="three-svg" />
            </button>
          </div>
          <div className="content-container">
            <div className="article">{post.content}</div>
            <div className="img-container">
              <NineGrid images={post.images || []} />
            </div>
          </div>
          <div className="comments-container">
            <SortTop
              stickyTop="sort-sticky-top"
              sortIndex={sortIndex}
              sortItems={sortItems}
            />
            <Comment />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;