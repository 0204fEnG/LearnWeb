import { useEffect, useState ,useRef, useCallback, Component} from 'react';
import VideoItem from './VideoItem/VideoItem'
import './VideoLayout.scss'
import useMyTransition from '../../../hooks/useMyTransition';
import { handleStopEvent } from '../../../utils/functions/handleStopEvent';
import BaseToolsCard from '../../ToolsCards/BaseToolsCard/BaseToolsCard'
import SliderButton from '../../Button/SliderButton/SliderButton';
const VideoLayout = ({ currentVideoIndex, setCurrentVideoIndex, videoItems, videosLength, isTransforming, timerRef }) => {
  const { domIsEnter: playSettingIsEnter, domIsRender: playSettingIsRender, handleDomShow: handlePlaySettingShow } = useMyTransition(300)
  const [playSetting, setPlaySetting] = useState({
    playMode: {
      modeIndex: 0,
      mode: 'loopPlay'
    }
  })
   const playModeButtonItems= [
      {
        name: '自动循环',
        handleFuc: () => {
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
        handleFuc: () => {
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
        handleFuc: () => {
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
  const settings = [{
    name: '播放模式',
    component: <SliderButton buttonItems={playModeButtonItems} currentIndex={playSetting.playMode.modeIndex} />
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
      setCurrentVideoIndex(prev => {
        const newIndex = prev + direction;
        return Math.max(0, Math.min(newIndex, videosLength - 1));
      });
    
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
            videoItems.map((color, index) => <VideoItem key={index} title={index} color={color} currentVideoIndex={currentVideoIndex} videoId={ index} onMenuClick={(e)=>handleStopEvent(e,handlePlaySettingShow)} />)
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