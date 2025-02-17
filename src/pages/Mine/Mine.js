// import { useEffect} from 'react'
import { useEffect, useRef, useState ,lazy} from 'react'
import './Mine.scss'
import SingleRowDisplayBar from '../../components/HorizontalDisplayBar/SingleRowDisplayBar/SingleRowDisplayBar';
import SectionCardContainer from '../../components/ContentCard/SectionCardContainer/SectionCardContainer';
import SectionNavbar from '../../components/Navbar/SectionNavbar/SectionNavbar';
import Message from '../../components/icons/Message';
const LazyMineHome = lazy(()=>import('./MineHome/MineHome'))
const LazyMineDynamics = lazy(() => import('./MineDynamics/MineDynamics'))
const Mine = () => {
    const divTop = useRef(null)
    const [topOpacity, setTopOpacity] = useState(0);
  const topOpacityRef = useRef(topOpacity);
  const [circles, setCircles] = useState([])
      const [homeSections,sethomeSections] =useState( [
          {
              name: '主页',
              component:<LazyMineHome/>
          },
          {
              name: '动态',
              component:<LazyMineDynamics/>
          }
      ])
      const [sectionsName, setSectionsName] = useState([])
      const [sectionsFuc,setSectionsFuc] =useState([]) 
      useEffect(() => {
          setSectionsName(homeSections.map((section) => section.name))
          setSectionsFuc(homeSections.map((section) => section.component))
      },[homeSections])
      const [homeNavTargetIndex, setHomeNavTargetIndex] = useState({index:0,isScroll:false})
      const [homeSectionsScrollInstance, setHomeSectionsScrollInstance] = useState(0)
      const [sectionsIsActive, setSectionsIsActive] = useState(new Array(homeSections.length).fill(false).map((_, index) => index === 0))
      const handleSectionsIsActiveChange = (activeIndex) => {
          const newSectionIsActive = [...sectionsIsActive]
          newSectionIsActive[activeIndex]=true
          setSectionsIsActive(newSectionIsActive)
      }
      const handleHomeNavTargetIndexChange = (targetIndex) => {
          setHomeNavTargetIndex(targetIndex)
          handleSectionsIsActiveChange(targetIndex.index)
      }
      const handleHomeSectionsScrollInstanceChange = (scrollInstanceIndex) => {
          setHomeSectionsScrollInstance(scrollInstanceIndex)
      }
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
        <li className='tool'>
          <Message className='tool-svg'/>
              <span className='name'>消息</span>
            </li>
          </ul> 
      <main className='app-mine__main' ref={divTop}>
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
              <p className="bio">ColorThief因其简便性和高效性被广泛应用于前端开发和图像处理相关的项目中。尽管直接指定与之集成的“典型生态项目”较为困难，因为它的适用范围非常广，ColorThief常与其他前端框架或者图像服务结合使用，如在构建响应式网页设计、React或Vue.js应用程序中的个性化功能模块。开发者通常会在自己的项目中嵌入ColorThief以实现特定的色彩分析需求，从而增强用户体验或进行数据分析的辅助。</p>
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
        <div className="mine-main">
          <div className="mine-nav">
            <SectionNavbar sectionsName={sectionsName} scrollInstance={homeSectionsScrollInstance } targetIndex={homeNavTargetIndex} onNavClick={ handleHomeNavTargetIndexChange} />
          </div>
          <SectionCardContainer sectionsIsActive={sectionsIsActive} sectionsFunc={sectionsFuc} onSectionScroll={ handleHomeSectionsScrollInstanceChange} onSectionActive={handleHomeNavTargetIndexChange} targetIndex={homeNavTargetIndex} />
          </div>
        </main>
    </div>
}
export default Mine