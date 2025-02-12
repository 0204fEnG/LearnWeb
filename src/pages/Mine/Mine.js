// import { useEffect} from 'react'
import { useEffect, useRef, useState } from 'react'
import './Mine.scss'
import SingleRowDisplayBar from '../../components/HorizontalDisplayBar/SingleRowDisplayBar/SingleRowDisplayBar';
const Mine = () => {
    const divTop = useRef(null)
    const [topOpacity, setTopOpacity] = useState(0);
  const topOpacityRef = useRef(topOpacity);
  const [circles,setCircles]=useState([])

useEffect(() => {
  topOpacityRef.current = topOpacity; // 每次 topOpacity 更新时，同步到 ref
}, [topOpacity]);

  useEffect(() => {
    const axiosData = [
      {
        avatar: 'http://192.168.178.8:3100/uploads/avatar/circle/1(1).jpeg',
        name: '第1个圈子',
        page:'/circles/circle/'
      },
      {
        avatar: 'http://192.168.178.8:3100/uploads/avatar/circle/1(2).jpeg',
        name: '第2个圈子',
        page:'/circles/circle/'
      },
      {
        avatar: 'http://192.168.178.8:3100/uploads/avatar/circle/1(3).jpeg',
        name: '第3个圈子',
        page:'/circles/circle/'
      },
      {
        avatar: 'http://192.168.178.8:3100/uploads/avatar/circle/1(4).jpeg',
        name: '第4个圈子',
        page:'/circles/circle/'
      },
      {
        avatar: 'http://192.168.178.8:3100/uploads/avatar/circle/1(5).jpeg',
        name: '第5个圈子',
        page:'/circles/circle/'
      },
      {
        avatar: 'http://192.168.178.8:3100/uploads/avatar/circle/1(6).jpeg',
        name: '第6个圈子',
        page:'/circles/circle/'
      },
      {
        avatar: 'http://192.168.178.8:3100/uploads/avatar/circle/1(7).jpeg',
        name: '第7个圈子',
        page:'/circles/circle/'
      },
      {
        avatar: 'http://192.168.178.8:3100/uploads/avatar/circle/1(8).jpeg',
        name: '第8个圈子',
        page:'/circles/circle/'
      },
      {
        avatar: 'http://192.168.178.8:3100/uploads/avatar/circle/1(9).jpeg',
        name: '第9个圈子',
        page:'/circles/circle/'
      },
      {
        avatar: 'http://192.168.178.8:3100/uploads/avatar/circle/1(1).jpeg',
        name: '第1个圈子',
        page:'/circles/circle/'
      },
      {
        avatar: 'http://192.168.178.8:3100/uploads/avatar/circle/1(2).jpeg',
        name: '第2个圈子',
        page:'/circles/circle/'
      },
      {
        avatar: 'http://192.168.178.8:3100/uploads/avatar/circle/1(3).jpeg',
        name: '第3个圈子',
        page:'/circles/circle/'
      },
      {
        avatar: 'http://192.168.178.8:3100/uploads/avatar/circle/1(4).jpeg',
        name: '第4个圈子',
        page:'/circles/circle/'
      },
      {
        avatar: 'http://192.168.178.8:3100/uploads/avatar/circle/1(5).jpeg',
        name: '第5个圈子',
        page:'/circles/circle/'
      },
      {
        avatar: 'http://192.168.178.8:3100/uploads/avatar/circle/1(6).jpeg',
        name: '第6个圈子',
        page:'/circles/circle/'
      },
      {
        avatar: 'http://192.168.178.8:3100/uploads/avatar/circle/1(7).jpeg',
        name: '第7个圈子',
        page:'/circles/circle/'
      },
      {
        avatar: 'http://192.168.178.8:3100/uploads/avatar/circle/1(8).jpeg',
        name: '第8个圈子',
        page:'/circles/circle/'
      },
      {
        avatar: 'http://192.168.178.8:3100/uploads/avatar/circle/1(9).jpeg',
        name: '第9个圈子',
        page:'/circles/circle/'
      },
      {
        avatar: 'http://192.168.178.8:3100/uploads/avatar/circle/1(1).jpeg',
        name: '第1个圈子',
        page:'/circles/circle/'
      },
      {
        avatar: 'http://192.168.178.8:3100/uploads/avatar/circle/1(2).jpeg',
        name: '第2个圈子',
        page:'/circles/circle/'
      },
      {
        avatar: 'http://192.168.178.8:3100/uploads/avatar/circle/1(3).jpeg',
        name: '第3个圈子',
        page:'/circles/circle/'
      },
      {
        avatar: 'http://192.168.178.8:3100/uploads/avatar/circle/1(4).jpeg',
        name: '第4个圈子',
        page:'/circles/circle/'
      },
      {
        avatar: 'http://192.168.178.8:3100/uploads/avatar/circle/1(5).jpeg',
        name: '第5个圈子',
        page:'/circles/circle/'
      },
      {
        avatar: 'http://192.168.178.8:3100/uploads/avatar/circle/1(6).jpeg',
        name: '第6个圈子',
        page:'/circles/circle/'
      },
      {
        avatar: 'http://192.168.178.8:3100/uploads/avatar/circle/1(7).jpeg',
        name: '第7个圈子',
        page:'/circles/circle/'
      },
      {
        avatar: 'http://192.168.178.8:3100/uploads/avatar/circle/1(8).jpeg',
        name: '第8个圈子',
        page:'/circles/circle/'
      },
      {
        avatar: 'http://192.168.178.8:3100/uploads/avatar/circle/1(9).jpeg',
        name: '第9个圈子',
        page:'/circles/circle/'
      }
    ]
    setCircles(axiosData)
  },[])
useEffect(() => {
  const topScrollToShow = () => {
    const topScroll = divTop.current.scrollTop;
    const newOpacity = Math.min(topScroll / 200, 1); // 确保 opacity 不超过 1
    setTopOpacity(newOpacity);
    console.log(newOpacity); // 输出最新的 opacity
  };

  if (divTop.current) {
    divTop.current.addEventListener('scroll', topScrollToShow);
  }

  return () => {
    if (divTop.current) {
      divTop.current.removeEventListener('scroll', topScrollToShow);
    }
  };
}, []);
    return <div className="app-mine">
        <header className='app-mine__top' style={{opacity:`${topOpacity}`}}>
            <div className="info">
                <img src="/images/header/banner/小小陈.png" alt="用户头像" className="avatar" />
                <span className="name">feng</span>
            </div>
        </header>
      <main className='app-mine__main' ref={divTop}>
        <header className='app-mine__header'>
          <img src="/images/header/banner/小小陈.png" alt="用户头像" className="avatar" />
          <div className="tools">
            <button className='tool'>⚙</button>
            <button className='tool'>✉</button>
          </div>
          <div className="info">
            <div className="name">
              feng
              <div className="level">Lv 6</div>
            </div>
            <div className="bio">且将新火试新茶,诗酒趁年华</div>
            <div className="experience-value">
              <div className="bar"></div>
            </div>
            <div className="progress">经验值:800/1000</div>

          </div>
          <div className="list3">
            <div className="item">动态</div>
            <div className="item">关注</div>
            <div className="item">粉丝</div>
          </div>
        </header>
        <SingleRowDisplayBar cards={circles} title='我关注的圈子' />
        <SingleRowDisplayBar cards={circles} title='我关注的圈子' />
        <SingleRowDisplayBar cards={circles} title='我关注的圈子' />
        <SingleRowDisplayBar cards={circles} title='我关注的圈子' />
        <SingleRowDisplayBar cards={circles} title='我关注的圈子' />
        <SingleRowDisplayBar cards={circles} title='我关注的圈子' />
        <SingleRowDisplayBar cards={circles} title='我关注的圈子' />
        </main>
    </div>
}
export default Mine