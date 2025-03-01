import { useEffect, useState ,useRef, useCallback, Component, useContext} from 'react';
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
  console.log('mode:',playSetting.playMode)
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
      e.preventDefault();
      
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
    },[handleLayOutWheelScroll])
    return (
      <div className="shorts-layout-container" ref={layOutRef} >
            <div className="video-items-container" style={{transform:`translateY(-${currentVideoIndex*100}%)`}}>
                {
            videoItems.map((videoItem, index) => <VideoItem key={index}
              videoUrl={videoItem.videoUrl}
              videoId={index} onMenuClick={(e) => handleStopEvent(e, handlePlaySettingShow)}
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