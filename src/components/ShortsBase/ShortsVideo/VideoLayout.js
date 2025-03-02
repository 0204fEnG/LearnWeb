import { useEffect, useState ,useRef, useCallback, useContext} from 'react';
import VideoItem from './VideoItem/VideoItem'
import './VideoLayout.scss'
import useMyTransition from '../../../hooks/useMyTransition';
import { handleStopEvent } from '../../../utils/functions/handleStopEvent';
import BaseToolsCard from '../../ToolsCards/BaseToolsCard/BaseToolsCard'
import SliderButton from '../../Button/SliderButton/SliderButton';
import { ShortsBaseContext } from '../ShortsBase';
const VideoLayout = ({ videoItems, videosLength, isTransforming, timerRef }) => {
  const { currentVideoIndex,handleCurrentVideoIndex}=useContext(ShortsBaseContext)
  const { domIsEnter: playSettingIsEnter, domIsRender: playSettingIsRender, handleDomShow: handlePlaySettingShow } = useMyTransition(200)
  const [playSetting, setPlaySetting] = useState({
    playMode: {
      modeIndex: 0,
      mode: 'loopPlay'
    },
    playRate: {
      rateIndex: 2,
      rate:1
    }
  })
  const touchStartY = useRef(0);
  const touchOffset = useRef(0);
  const isSwiping = useRef(false);
  const containerHeight = useRef(0);
  const startIndex = useRef(currentVideoIndex);
   const playModeButtonItems= [
      {
        name: '自动循环',
        handleFunc: () => {
          setPlaySetting((prev) => (
            {
              ...prev,
              playMode: {
                modeIndex:0,
                mode:'loopPlay'
              }
            }
          ))
        }
      },
      {
        name: '播完暂停',
        handleFunc: () => {
          setPlaySetting((prev) => (
            {
              ...prev,
              playMode: {
                modeIndex: 1,
                mode: 'playedPause'
              }
            }
          ))
        }
      },
      {
        name: '自动连播',
        handleFunc: () => {
          setPlaySetting((prev) => (
            {
              ...prev,
              playMode: {
                modeIndex:2,
                mode:'autoPlay'
              }
            }
          ))
        }
      }
  ]
  const playRateButtonItems = [
    {
      name: '0.5',
      handleFunc: () => {
        setPlaySetting((prev) => ({
          ...prev,
          playRate: {
            rateIndex: 0,
            rate:0.5
          }
        }))
      }
    },
    {
      name: '0.75',
      handleFunc: () => {
        setPlaySetting((prev) => ({
          ...prev,
          playRate: {
            rateIndex: 1,
            rate:0.75
          }
        }))
      }
    },
    {
      name: '1',
      handleFunc: () => {
        setPlaySetting((prev) => ({
          ...prev,
          playRate: {
            rateIndex: 2,
            rate:1
          }
        }))
      }
    },
    {
      name: '2',
      handleFunc: () => {
        setPlaySetting((prev) => ({
          ...prev,
          playRate: {
            rateIndex: 3,
            rate:2
          }
        }))
      }
    },
    {
      name: '3',
      handleFunc: () => {
        setPlaySetting((prev) => ({
          ...prev,
          playRate: {
            rateIndex: 4,
            rate:3
          }
        }))
      }
    }
  ]
  const settings = [{
    name: '播放模式',
    component: <SliderButton buttonItems={playModeButtonItems} currentIndex={playSetting.playMode.modeIndex} />
  },
    {
      name: '倍速',
      component: <SliderButton buttonItems={playRateButtonItems} currentIndex={playSetting.playRate.rateIndex} />
  }]
    const layOutRef = useRef(null)
    const handleLayOutWheelScroll = useCallback((e) => {
      if (isTransforming.current) {
          return;
      }
    
      isTransforming.current = true;
      
      // 清除旧计时器
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    
      const direction = e.deltaY > 0 ? 1 : -1;
      handleCurrentVideoIndex(direction)
      // 设置新计时器
      timerRef.current = setTimeout(() => {
        isTransforming.current = false;
      }, 300);
    }, [videosLength]);
    useEffect(() => {
        if (layOutRef.current) {
           layOutRef.current.addEventListener('wheel',handleLayOutWheelScroll)
        }
        return () => {
            if (layOutRef.current) {
               layOutRef.current.removeEventListener('wheel',handleLayOutWheelScroll)
           }
       } 
    }, [handleLayOutWheelScroll])

  const handleTouchStart = useCallback((e) => {
    const touchY = e.touches[0].clientY;
    touchStartY.current = touchY;
    startIndex.current = currentVideoIndex;
    isSwiping.current = true;
    containerHeight.current = layOutRef.current?.clientHeight || 0;
  }, [currentVideoIndex]);

  const handleTouchMove = useCallback((e) => {
    if (!isSwiping.current || !containerHeight.current) return;
    e.preventDefault();
    const touchY = e.touches[0].clientY;
    const deltaY = touchY - touchStartY.current;
    const maxDelta = containerHeight.current;
    const clampedDelta = Math.max(-maxDelta, Math.min(deltaY, maxDelta));
    touchOffset.current = (clampedDelta / containerHeight.current) * 100;
    
    // 立即更新样式
    layOutRef.current.querySelector('.video-items-container').style.transform = 
      `translateY(calc(-${startIndex.current * 100}% + ${touchOffset.current}%)`;
    layOutRef.current.querySelector('.video-items-container').style.transition = 'none';
  }, []);

  const handleTouchEnd = useCallback(() => {
    isSwiping.current = false;
    const threshold = 20; // 切换阈值 25%
    const absOffset = Math.abs(touchOffset.current);
    const direction = touchOffset.current > 0 ? -1 : 1;
    layOutRef.current.querySelector('.video-items-container').style.transition = 'transform 0.3s ease-in-out';
    if (absOffset >= threshold&&((direction > 0 && currentVideoIndex < videosLength - 1)||(direction<0&&currentVideoIndex>0))) {
      handleCurrentVideoIndex(direction);
    }
    else {
      // 重置样式

      layOutRef.current.querySelector('.video-items-container').style.transform =
        `translateY(-${currentVideoIndex * 100}%)`;
    }
      touchOffset.current = 0;
  }, [currentVideoIndex, handleCurrentVideoIndex]);
   useEffect(() => {
    const layout = layOutRef.current;
    if (!layout) return;

    layout.addEventListener('touchstart', handleTouchStart);
    layout.addEventListener('touchmove', handleTouchMove);
    layout.addEventListener('touchend', handleTouchEnd);

    return () => {
      layout.removeEventListener('touchstart', handleTouchStart);
      layout.removeEventListener('touchmove', handleTouchMove);
      layout.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleTouchStart, handleTouchMove, handleTouchEnd]);
    return (
      <div className="shorts-layout-container" ref={layOutRef} >
        <div className="video-items-container"
         style={{ 
          transform: `translateY(-${currentVideoIndex * 100}%)`,
          transition: isSwiping.current ? 'none' : 'transform 0.3s ease-in-out'
        }}>
                {
            videoItems.map((videoItem, index) => <VideoItem key={videoItem.videoId}
              videoUrl={videoItem.videoUrl}
              order={index}
              userAvatar={videoItem.userAvatar}
              userName={videoItem.userName}
              title={videoItem.title}
              publishTime={videoItem.publishTime}
              description={videoItem.description}
              likes={videoItem.likes}
              comments={videoItem.comments}
              favorites={videoItem.favorites}
              onMenuClick={(e) => handleStopEvent(e, handlePlaySettingShow)}
              playMode={playSetting.playMode.mode}
              playRate={playSetting.playRate.rate}
            />
            )
                }
        </div>
        {
          playSettingIsRender&&
          <div className={`play-setting-container${playSettingIsEnter ? ' play-setting-container--enter' : ''}`}
          onClick={(e)=>handleStopEvent(e,handlePlaySettingShow)}>
              <div className={`play-setting-wrapper${playSettingIsEnter ? ' play-setting-wrapper--enter' : ''}`}>
                <BaseToolsCard toolItems={settings}/>
              </div>
          </div>
        }
        </div>
    )
}
export default VideoLayout