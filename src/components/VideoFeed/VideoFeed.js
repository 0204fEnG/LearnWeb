import { useRef, useState, useEffect, useCallback, createContext } from 'react'
import { throttle } from 'lodash'
import './VideoFeed.scss'
import { formatTime } from '../../utils/helpers'
import Good from '../icons/Good'
import { Link } from 'react-router-dom'
import ThreeDots from '../icons/ThreeDots'
import Reply from '../icons/Reply'
const mockVideos = [
  { id: 1, url: '/videos/ban.mp4', title: '视频1' },
  { id: 2, url: '/videos/next.mp4', title: '视频2' },
  { id: 3, url: '/videos/x5.mp4', title: '视频3' },
  { id: 4, url: '/videos/shuimen.mp4', title: '视频4' }
]

const VideoItem = ({ video, isActive,onCommentClick,isCommentsEnter }) => {
  const videoRef = useRef(null)
  const progressRef = useRef(null)
  const [isLoading, setIsLoading] = useState(true)
  const [state, setState] = useState({
    isPlaying: false,
    isMuted:true,
    progress: 0,
    duration: 0,
    currentTime: 0,
    isDrag:false
  })

  useEffect(() => {
  const handleMouseUp = () => {
    document.removeEventListener('mousemove', handleProgressDrag)
    document.removeEventListener('mouseup', handleProgressDragEnd)
  }

  // 清理事件监听器
  return () => {
    document.removeEventListener('mousemove', handleProgressDrag)
    document.removeEventListener('mouseup', handleProgressDragEnd)
    handleMouseUp()
  }
}, [])
  // 视频初始化
  useEffect(() => {
    const videoElement = videoRef.current
    if (!videoElement) return

 const handleReady = () => {
  setIsLoading(false)
  if (isActive) {
    videoElement.play().catch(error => {
      console.error('视频播放错误:', error)
      setIsLoading(false) // 视频加载失败时停止加载状态
    })
  }
}

    videoElement.addEventListener('loadeddata', handleReady)
    videoElement.muted = state.isMuted
    videoElement.preload = 'metadata'

    return () => {
      videoElement.removeEventListener('loadeddata', handleReady)
      videoElement.pause()
    }
  }, [state.isMuted, isActive])

  // 播放状态同步
  useEffect(() => {
    if (!videoRef.current) return
    isActive ? videoRef.current.play() : videoRef.current.pause()
  }, [isActive])

// 修正播放状态同步
const handlePlayback = async () => {
  try {
    const video = videoRef.current
    if (video.paused) {
      await video.play()
      setState(prev => ({ ...prev, isPlaying: true }))
    } else {
      video.pause()
      setState(prev => ({ ...prev, isPlaying: false }))
    }
  } catch (error) {
    console.error('播放控制错误:', error)
  }
}

  // 音量控制
  const handleVolumeChange = (e) => {
    const volume = parseFloat(e.target.value)
    videoRef.current.volume = volume
    setState(prev => ({
      ...prev,
      volume,
      isMuted: volume === 0
    }))
  }






//   const handleProgressClick = (e) => {
//   console.log('hello')
//   if (!progressRef.current || !videoRef.current) return
//   const rect = progressRef.current.getBoundingClientRect()
//   const percent = (e.clientX - rect.left) / rect.width // 点击位置的进度百分比
//   const currentTime = Math.min(Math.max(percent, 0), 1) * state.duration // 计算出当前时间
//   videoRef.current.currentTime = currentTime // 更新视频的播放时间
//   setState(prev => ({
//     ...prev,
//     currentTime,
//     progress: (currentTime / prev.duration) * 100 // 更新进度条
//   }))
// }
  // 进度条拖拽处理
  const handleProgressDragStart = (e) => {
    if (!progressRef.current) return
    setState((prev) => ({
      ...prev,
      isDrag:true
    }))
    handleProgressDrag(e)
    document.body.classList.add('no-select')
    document.addEventListener('mousemove', handleProgressDrag)
    document.addEventListener('mouseup', handleProgressDragEnd)
  }

const handleProgressDrag = (e) => {
  if (!progressRef.current) return

  // 获取进度条容器相对于页面的位置
  const rect = progressRef.current.getBoundingClientRect()

  // 计算鼠标相对进度条的偏移量
  const percent = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1)

  // 更新进度条和当前时间
  setState(prev => ({
    ...prev,
    currentTime: percent * prev.duration,// 更新视频的当前时间
    progress:percent*100
  }))
}

const handleProgressDragEnd = (e) => { // 添加事件参数e
  if (!progressRef.current || !videoRef.current) return;
  //根据鼠标释放时的位置重新计算进度
  const rect = progressRef.current.getBoundingClientRect();
  const percent = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1);
  const currentTime = percent * state.duration;

  // 直接更新视频时间和状态
  videoRef.current.currentTime = currentTime;
  setState(prev => ({
    ...prev,
    currentTime,
    progress: percent * 100,
    isDrag: false
  }));

  document.body.classList.remove('no-select');
  document.removeEventListener('mousemove', handleProgressDrag);
  document.removeEventListener('mouseup', handleProgressDragEnd);
  };

  return (
    <div className={`video-item ${state.isViewportFullscreen ? 'viewport-fullscreen' : ''}`}>
      {isLoading && <div className="loading-indicator">加载中...</div>}
      <div className={`short-video ${isCommentsEnter?'video-enter':''}`}>
    <video
        ref={videoRef}
      loop={state.playbackMode === 'loop'}
      muted={state.isMuted}
      playsInline
      onClick={handlePlayback}
      onTimeUpdate={() => setState(prev => ({
        ...prev,
        currentTime: !prev.isDrag?videoRef.current?.currentTime || 0:prev.currentTime,
        progress:!prev.isDrag?(((videoRef.current?.currentTime || 0) / prev.duration) * 100 || 0):prev.progress
      }))}
      onLoadedMetadata={() => setState(prev => ({
        ...prev,
        duration: videoRef.current?.duration || 0
      }))}
    >
      <source src={video.url} type="video/mp4" />
    </video>
    </div>

      <div className="tools">
        <div className="tool">点赞</div>
        <div className="tool" onClick={onCommentClick}>回复</div>
        <div className="tool">收藏</div>
        <div className="tool">转发</div>
      </div>
      <div className="video-controls">
      {/* <button onClick={handlePlayback}>
        {state.isPlaying ? '⏸' : '▶'}
      </button>

        <div className="time-display">
          {formatTime(state.currentTime)} / {formatTime(state.duration)}
        </div>

        <div className="volume-control" onClick={e => e.stopPropagation()}>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={state.volume}
            onChange={(e) => {
                e.stopPropagation()
                handleVolumeChange(e)
            }}
          />
        </div>

        <select 
          value={state.playbackMode}
          onChange={(e) => handlePlaybackModeChange(e.target.value)}
        >
          <option value="loop">循环播放</option>
          <option value="auto">自动连播</option>
          <option value="single">播完暂停</option>
        </select>

        <select 
          value={state.playbackRate}
          onChange={e => {
            const rate = parseFloat(e.target.value)
            videoRef.current.playbackRate = rate
            setState(prev => ({ ...prev, playbackRate: rate }))
          }}
        ></select>

        <div className="fullscreen-controls">
          <button onClick={toggleViewportFullscreen}>
            {state.isViewportFullscreen ? '退出视口全屏' : '视口全屏'}
          </button>
          <button onClick={toggleFullscreen}>
            {state.isFullscreen ? '退出全屏' : '浏览器全屏'}
          </button>
        </div> */}

        <div 
          className="progress-container"
          ref={progressRef}
          // onClick={handleProgressClick}
          onMouseDown={handleProgressDragStart}
          // onMouseUp={handleProgressClick}
        >
          <div className="progress-bar" style={{transform: `translateX(-${100-state.progress}%)` }}>
          </div>
        </div>
      </div>
    </div>
  )
}

const VideoSetting = ({ handleViewportFullScreen, handleBrowserScreen, handlePlayMode }) => {
  const [isActive, setIsActive] = useState(false)
  useEffect(() => {
    setTimeout(() => {
      setIsActive(true)
    },0)
  },[])
  return (
    <div className={`setting-container${isActive?' active':''}`}>
      <button className="setting"onClick={handleViewportFullScreen}>视口全屏</button>
      <button className="setting"onClick={handleBrowserScreen}>浏览器全屏</button>
      <button className="setting mode" onClick={handlePlayMode}>切换播放模式
        <div className="mode-container">
        <button className="play-mode">播完暂停</button>
        <button className="play-mode">自动连播</button>
        <button className="play-mode">无限循环</button>
        </div>
      </button>
    </div>
  )
}
const VideoFeed = ({ onCommentClick, isCommentsEnter ,childRef}) => {
  const [videos, setVideos] = useState(mockVideos)
  const [activeIndex, setActiveIndex] = useState(0)
  const [settingIsShow,setSettingIsShow]=useState(false)
  const [feedSetting, setFeedSetting] = useState({
      isBrowserscreen: false,//浏览器全屏
      isViewportFullscreen: false,//视口全屏
      PlayMode: 'loop',//播放模式，以及auto，ended
  })
//   const toggleViewportFullscreen = () => {
//     setState(prev => ({
//       ...prev,
//       isViewportFullscreen: !prev.isViewportFullscreen
//     }))
//   }

//   // 浏览器全屏切换
//   const toggleFullscreen = () => {
//     if (!document.fullscreenElement) {
//       videoRef.current?.parentElement.requestFullscreen()
//       setState(prev => ({ ...prev, isFullscreen: true }))
//     } else {
//       document.exitFullscreen()
//       setState(prev => ({ ...prev, isFullscreen: false }))
//     }
//     }
//       // 播放模式切换
// const handlePlaybackModeChange = (mode) => {
//   const video = videoRef.current
//   video.loop = mode === 'loop'

//   setState(prev => ({ ...prev, playbackMode: mode }))

//   // 在移除事件之前先移除已存在的监听器，避免重复绑定
//   video.removeEventListener('ended', handleAutoPlayNext)
//   if (mode === 'auto') {
//     video.addEventListener('ended', handleAutoPlayNext)
//   }
// }
//     const handleAutoPlayNext = () => {
//     const container = document.querySelector('.video-feed-container')
//     container?.scrollBy(0, container.clientHeight)
//   }
  const handleScroll = useCallback(throttle(() => {
    const container = childRef.current
    if (!container) return
    const index = Math.round(container.scrollTop / container.clientHeight)
    setActiveIndex(Math.min(index, videos.length - 1))
  }, 300), [videos.length])

  return (
    <div 
      className={`video-feed-container ${isCommentsEnter?'video-feed-leave':''}`}
      ref={childRef}
      onScroll={handleScroll}
    >
      {videos.map((video, index) => (
        <VideoItem
          key={video.id}
          video={video}
          isActive={index === activeIndex}
          onCommentClick={onCommentClick}
          isCommentsEnter={isCommentsEnter}
        />
      ))}
      </div>
  )
}

const VideoComments = ({ onCloseComments, isCommentsEnter}) => {
  return (
    <div className={`video-comments${isCommentsEnter?' comments-active':''}`}>
  <div className='comments-container'>
                    <div className="comments-top">
        <div className="title">共1条评论</div>
        <div className="close" onClick={onCloseComments}>关闭</div>
                    </div>
                    <div className="comment-container">
                        <div className="comment-header">
                            <Link to={`/user/slz1/user-home`} className="avatar-container"><img src='/images/header/banner/4.png' alt="touxiang" className="avatar" /></Link>
                            <div className="info-container">
                                <div className="name-container">
                                    <Link to={`/user/212/user-home`} className="name">{21212 }</Link>
                                <span className="level">Lv4</span>
                                <span className="author">楼主</span>                                    
                                </div>
                                <div className="time"><span className="publish-time">1月29日</span></div>
                            </div>
                        </div>
                        <div className="comment">自</div>
                        <ul className="tools">
                            <button className="tool"><Good className='svg-icon'/><div className="count">9923</div></button>
                            <button className="tool"><Reply className='svg-icon'/><div className="count">23</div></button>
                            <button className="more-container"><ThreeDots className='more-svg'/></button>
                        </ul>
                        <div className="reply">
                            <div className="pre-reply-container">
                            <div className="pre-reply">
                                <Link to='/user/24feng/user-home' className='user-name'>24feng: </Link>
                            对面没算准金银角大招时间，一般来说金银角大招后摇不算难抓
                            </div>
                            <div className="pre-reply">
                                <Link to='/user/24yd21ng/user-home' className='user-name'>24yd21ng: </Link>
                                不是下一个无限火力，他
                                </div>
                            </div>
                         <button className="reply-count">共 133 条回复&gt;</button>
        </div>
          /</div>
        <div className="comment-container">
                        <div className="comment-header">
                            <Link to={`/user/slz1/user-home`} className="avatar-container"><img src='/images/header/banner/4.png' alt="touxiang" className="avatar" /></Link>
                            <div className="info-container">
                                <div className="name-container">
                                    <Link to={`/user/212/user-home`} className="name">{21212 }</Link>
                                <span className="level">Lv4</span>
                                <span className="author">楼主</span>                                    
                                </div>
                                <div className="time"><span className="publish-time">1月29日</span></div>
                            </div>
                        </div>
                        <div className="comment">自</div>
                        <ul className="tools">
                            <button className="tool"><Good className='svg-icon'/><div className="count">9923</div></button>
                            <button className="tool"><Reply className='svg-icon'/><div className="count">23</div></button>
                            <button className="more-container"><ThreeDots className='more-svg'/></button>
                        </ul>
                        <div className="reply">
                            <div className="pre-reply-container">
                            <div className="pre-reply">
                                <Link to='/user/24feng/user-home' className='user-name'>24feng: </Link>
                            对面没算准金银角大招时间，一般来说金银角大招后摇不算难抓
                            </div>
                            <div className="pre-reply">
                                <Link to='/user/24yd21ng/user-home' className='user-name'>24yd21ng: </Link>
                                不是下一个无限火力，他
                                </div>
                            </div>
                         <button className="reply-count">共 133 条回复&gt;</button>
        </div>
          /</div>
        <div className="comment-container">
                        <div className="comment-header">
                            <Link to={`/user/slz1/user-home`} className="avatar-container"><img src='/images/header/banner/4.png' alt="touxiang" className="avatar" /></Link>
                            <div className="info-container">
                                <div className="name-container">
                                    <Link to={`/user/212/user-home`} className="name">{21212 }</Link>
                                <span className="level">Lv4</span>
                                <span className="author">楼主</span>                                    
                                </div>
                                <div className="time"><span className="publish-time">1月29日</span></div>
                            </div>
                        </div>
                        <div className="comment">自</div>
                        <ul className="tools">
                            <button className="tool"><Good className='svg-icon'/><div className="count">9923</div></button>
                            <button className="tool"><Reply className='svg-icon'/><div className="count">23</div></button>
                            <button className="more-container"><ThreeDots className='more-svg'/></button>
                        </ul>
                        <div className="reply">
                            <div className="pre-reply-container">
                            <div className="pre-reply">
                                <Link to='/user/24feng/user-home' className='user-name'>24feng: </Link>
                            对面没算准金银角大招时间，一般来说金银角大招后摇不算难抓
                            </div>
                            <div className="pre-reply">
                                <Link to='/user/24yd21ng/user-home' className='user-name'>24yd21ng: </Link>
                                不是下一个无限火力，他
                                </div>
                            </div>
                         <button className="reply-count">共 133 条回复&gt;</button>
        </div>
          /</div>
        <div className="comment-container">
                        <div className="comment-header">
                            <Link to={`/user/slz1/user-home`} className="avatar-container"><img src='/images/header/banner/4.png' alt="touxiang" className="avatar" /></Link>
                            <div className="info-container">
                                <div className="name-container">
                                    <Link to={`/user/212/user-home`} className="name">{21212 }</Link>
                                <span className="level">Lv4</span>
                                <span className="author">楼主</span>                                    
                                </div>
                                <div className="time"><span className="publish-time">1月29日</span></div>
                            </div>
                        </div>
                        <div className="comment">自</div>
                        <ul className="tools">
                            <button className="tool"><Good className='svg-icon'/><div className="count">9923</div></button>
                            <button className="tool"><Reply className='svg-icon'/><div className="count">23</div></button>
                            <button className="more-container"><ThreeDots className='more-svg'/></button>
                        </ul>
                        <div className="reply">
                            <div className="pre-reply-container">
                            <div className="pre-reply">
                                <Link to='/user/24feng/user-home' className='user-name'>24feng: </Link>
                            对面没算准金银角大招时间，一般来说金银角大招后摇不算难抓
                            </div>
                            <div className="pre-reply">
                                <Link to='/user/24yd21ng/user-home' className='user-name'>24yd21ng: </Link>
                                不是下一个无限火力，他
                                </div>
                            </div>
                         <button className="reply-count">共 133 条回复&gt;</button>
        </div>
          /</div>
        <div className="comment-container">
                        <div className="comment-header">
                            <Link to={`/user/slz1/user-home`} className="avatar-container"><img src='/images/header/banner/4.png' alt="touxiang" className="avatar" /></Link>
                            <div className="info-container">
                                <div className="name-container">
                                    <Link to={`/user/212/user-home`} className="name">{21212 }</Link>
                                <span className="level">Lv4</span>
                                <span className="author">楼主</span>                                    
                                </div>
                                <div className="time"><span className="publish-time">1月29日</span></div>
                            </div>
                        </div>
                        <div className="comment">自</div>
                        <ul className="tools">
                            <button className="tool"><Good className='svg-icon'/><div className="count">9923</div></button>
                            <button className="tool"><Reply className='svg-icon'/><div className="count">23</div></button>
                            <button className="more-container"><ThreeDots className='more-svg'/></button>
                        </ul>
                        <div className="reply">
                            <div className="pre-reply-container">
                            <div className="pre-reply">
                                <Link to='/user/24feng/user-home' className='user-name'>24feng: </Link>
                            对面没算准金银角大招时间，一般来说金银角大招后摇不算难抓
                            </div>
                            <div className="pre-reply">
                                <Link to='/user/24yd21ng/user-home' className='user-name'>24yd21ng: </Link>
                                不是下一个无限火力，他
                                </div>
                            </div>
                         <button className="reply-count">共 133 条回复&gt;</button>
        </div>
          /</div>
        <div className="comments-bottom"></div>
      </div>   
      </div>
      )
}
const ShortsUI = () => {
  const [isCommentShow, setIsCommentShow] = useState(false)
  const [isCommentsEnter, setIsCommentsEnter] = useState(false)
  const commentsTimer = useRef()
    const childFeedRef = useRef(null);
  const handlechildFeedscroll = () => {
    if (childFeedRef.current) {
      // childFeedRef.current.scrollBy(100%); // 每次滚动200px
    }
  };
  const handleCommentShow = () => {
    if (!isCommentShow) {
      setIsCommentShow(true)
      setTimeout(() => {
        setIsCommentsEnter(true)
      })
    }
    else {
      if (isCommentsEnter) {
        setIsCommentsEnter(false)
        commentsTimer.current = setTimeout(() => {
          setIsCommentShow(false)
        },300)
      }
      else {
        clearTimeout(commentsTimer.current)
        setIsCommentsEnter(true)
      }
    }

  }

  return (
    <div className="shorts-layout-container">
    <div className="shorts-layout">
        <VideoFeed onCommentClick={handleCommentShow} isCommentsEnter={isCommentsEnter} childRef={ childFeedRef} />
        {isCommentShow&&
          <VideoComments onCloseComments={handleCommentShow} isCommentsEnter={isCommentsEnter} />
      }
      </div>
        <div className="change-container">
        <button className='change'>↑</button>
        <button className='change'>↓</button>
      </div>
      </div>
  )
}
export default ShortsUI