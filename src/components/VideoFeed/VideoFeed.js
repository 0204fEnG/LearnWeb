import { useRef, useState, useEffect, useCallback } from 'react'
import { throttle } from 'lodash'
import './VideoFeed.scss'
import { formatTime } from '../../utils/helpers'

const mockVideos = [
  { id: 1, url: '/videos/ban.mp4', title: '视频1' },
  { id: 2, url: '/videos/next.mp4', title: '视频2' },
  { id: 3, url: '/videos/x5.mp4', title: '视频3' },
  { id: 4, url: '/videos/shuimen.mp4', title: '视频4' }
]

const VideoItem = ({ video, isActive }) => {
  const videoRef = useRef(null)
  const progressRef = useRef(null)
  const [isLoading, setIsLoading] = useState(true)
  const [state, setState] = useState({
    isPlaying: false,
    progress: 0,
    duration: 0,
    currentTime: 0,
    playbackRate: 1,
    isMuted: true,
    volume: 1,
    playbackMode: 'loop',
    isViewportFullscreen: false,
    isFullscreen: false,
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

  // 播放模式切换
const handlePlaybackModeChange = (mode) => {
  const video = videoRef.current
  video.loop = mode === 'loop'

  setState(prev => ({ ...prev, playbackMode: mode }))

  // 在移除事件之前先移除已存在的监听器，避免重复绑定
  video.removeEventListener('ended', handleAutoPlayNext)
  if (mode === 'auto') {
    video.addEventListener('ended', handleAutoPlayNext)
  }
}

  // 自动播放下一集
  const handleAutoPlayNext = () => {
    const container = document.querySelector('.video-feed-container')
    container?.scrollBy(0, container.clientHeight)
  }

  // 视口全屏切换
  const toggleViewportFullscreen = () => {
    setState(prev => ({
      ...prev,
      isViewportFullscreen: !prev.isViewportFullscreen
    }))
  }

  // 浏览器全屏切换
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      videoRef.current?.parentElement.requestFullscreen()
      setState(prev => ({ ...prev, isFullscreen: true }))
    } else {
      document.exitFullscreen()
      setState(prev => ({ ...prev, isFullscreen: false }))
    }
  }
const handleProgressClick = (e) => {
  if (!progressRef.current || !videoRef.current) return
  const rect = progressRef.current.getBoundingClientRect()
  const percent = (e.clientX - rect.left) / rect.width // 点击位置的进度百分比
  const currentTime = Math.min(Math.max(percent, 0), 1) * state.duration // 计算出当前时间
  videoRef.current.currentTime = currentTime // 更新视频的播放时间
  setState(prev => ({
    ...prev,
    currentTime,
    progress: (currentTime / prev.duration) * 100 // 更新进度条
  }))
}
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

  const handleProgressDragEnd = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = state.currentTime
    }
    setState(prev => ({ ...prev, isDrag: false }))
    document.body.classList.remove('no-select')
    document.removeEventListener('mousemove', handleProgressDrag)
    document.removeEventListener('mouseup', handleProgressDragEnd)
  }

  return (
    <div className={`video-item ${state.isViewportFullscreen ? 'viewport-fullscreen' : ''}`}>
      {isLoading && <div className="loading-indicator">加载中...</div>}
      
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

      <div className="video-controls">
      <button onClick={handlePlayback}>
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
        </div>

        <div 
          className="progress-container"
          ref={progressRef}
          onClick={handleProgressClick}
          onMouseDown={handleProgressDragStart}
        >
          <div className="progress-bar" style={{width: `${state.progress}%` }}>
              <div 
                className="drag-thumb"
              />
          </div>
        </div>
      </div>
    </div>
  )
}

const VideoFeed = () => {
  const containerRef = useRef(null)
  const [videos, setVideos] = useState(mockVideos)
  const [activeIndex, setActiveIndex] = useState(0)

  const handleScroll = useCallback(throttle(() => {
    const container = containerRef.current
    if (!container) return
    
    const index = Math.round(container.scrollTop / container.clientHeight)
    setActiveIndex(Math.min(index, videos.length - 1))
  }, 300), [videos.length])

  return (
    <div 
      className="video-feed-container"
      ref={containerRef}
      onScroll={handleScroll}
    >
      {videos.map((video, index) => (
        <VideoItem
          key={video.id}
          video={video}
          isActive={index === activeIndex}
        />
      ))}
    </div>
  )
}

export default VideoFeed