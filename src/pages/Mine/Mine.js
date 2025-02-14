// import { useEffect} from 'react'
import { useEffect, useRef, useState } from 'react'
import colorthief from 'colorthief'
import './Mine.scss'
import SingleRowDisplayBar from '../../components/HorizontalDisplayBar/SingleRowDisplayBar/SingleRowDisplayBar';
const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";
const Mine = () => {
    const divTop = useRef(null)

    const [topOpacity, setTopOpacity] = useState(0);
  const topOpacityRef = useRef(topOpacity);
  const [circles, setCircles] = useState([])
//     const divImg = useRef(null)
//   const [mainColor, setMainColor] = useState('transparent');
//   const ColorThief = new colorthief();
//   const getMainColor=async (imageElement)=> {
//     try {
//       imageElement.crossOrigin = 'anonymous'
//       const color = await ColorThief.getColor(imageElement);
//       const rgbColor = `${color.join(',')}`
//       const lastColor=`radial-gradient(circle at center, rgba(${rgbColor}, 1) 0%, rgba(${rgbColor}, 0.5) 100%)`
//         setMainColor(lastColor)// 打印颜色的RGB数组
//     } catch (err) {
//         console.error(err);
//     }
// }
//     useEffect(() => {
//       const img = divImg.current;
//   if (img && img.complete) {
//     getMainColor(img);
//   } else if (img) {
//     img.onload = () => getMainColor(img);
//   }
//   }, []);
useEffect(() => {
  topOpacityRef.current = topOpacity; // 每次 topOpacity 更新时，同步到 ref
}, [topOpacity]);

  useEffect(() => {
    const axiosData = [
      {
        avatar: '/images/header/banner/小小陈.png',
        name: '第1个圈子212121212',
        page:'/circles/circle/'
      },
      {
        avatar: '/images/header/banner/小小陈.png',
        name: '第2个圈子',
        page:'/circles/circle/'
      },
      {
        avatar: '/images/header/banner/小小陈.png',
        name: '第3个圈子',
        page:'/circles/circle/'
      },
      {
        avatar: '/images/header/banner/小小陈.png',
        name: '第4个圈子',
        page:'/circles/circle/'
      },
      {
        avatar: '/images/header/banner/小小陈.png',
        name: '第5个圈子',
        page:'/circles/circle/'
      },
      {
        avatar: '/images/header/banner/小小陈.png',
        name: '第6个圈子',
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
                <img src="/images/header/banner/小小陈.png" alt="用户头像" className="avatar"/>
                <span className="name">feng</span>
            </div>
      </header>
          <ul className="tools">
            <li className='tool' onClick={() => console.log(11)}>
              <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="svg">
                <path d="M15.435 17.7717H4.567C2.60143 17.7717 1 16.1723 1 14.2047V5.76702C1 3.80144 2.59942 2.20001 4.567 2.20001H15.433C17.3986 2.20001 19 3.79943 19 5.76702V14.2047C19.002 16.1703 17.4006 17.7717 15.435 17.7717ZM4.567 4.00062C3.59327 4.00062 2.8006 4.79328 2.8006 5.76702V14.2047C2.8006 15.1784 3.59327 15.9711 4.567 15.9711H15.433C16.4067 15.9711 17.1994 15.1784 17.1994 14.2047V5.76702C17.1994 4.79328 16.4067 4.00062 15.433 4.00062H4.567Z" fill="currentColor"></path>
                <path d="M9.99943 11.2C9.51188 11.2 9.02238 11.0667 8.59748 10.8019L8.5407 10.7635L4.3329 7.65675C3.95304 7.37731 3.88842 6.86226 4.18996 6.50976C4.48954 6.15544 5.0417 6.09699 5.4196 6.37643L9.59412 9.45943C9.84279 9.60189 10.1561 9.60189 10.4067 9.45943L14.5812 6.37643C14.9591 6.09699 15.5113 6.15544 15.8109 6.50976C16.1104 6.86409 16.0478 7.37731 15.6679 7.65675L11.4014 10.8019C10.9765 11.0667 10.487 11.2 9.99943 11.2Z" fill="currentColor"></path>
              </svg>
              <span className='name'>消息</span>
            </li>
          </ul> 
      <main className='app-mine__main' ref={divTop}>
        {/* <header className='app-mine__header'>
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
        </header> */}
        <div className="header">
          <div className="back">
          <img src='http://192.168.178.8:3100/uploads/avatar/circle/you.png' alt="空间背景图" className="backimg"/>
            <img src='http://192.168.178.8:3100/uploads/avatar/circle/you.png' alt="空间背景图" className="backimg-mask" />
          </div>
          <div className="info">
            <img src="/images/header/banner/小小陈.png" alt="头像" className="avatar" />
            <div className="person">
              <span className="name">feng
                <span className="level">Lv6</span>
              </span>
              <p className="bio">ColorThief因其简便性和高效性被广泛应用于前端开发和图像处理相关的项目中。</p>
              <div className="experience">
                <div className="bar"></div>
              </div>
              <div className="progress">经验值:300/1000</div>
            </div>
            <ul className='three'>
              <li className='item'><div className="count">120</div><div className="name">关注</div></li>
              <li className='item'><div className="count">30</div><div className="name">粉丝</div></li>
              <li className='item'><div className="count">12131</div><div className="name">获赞</div></li>
            </ul>
           
          </div>
        </div>
        <div className="main">
        <SingleRowDisplayBar cards={circles} title='我关注的圈子' />
        <SingleRowDisplayBar cards={circles} title='我关注的圈子' />
        </div>
        </main>
    </div>
}
export default Mine