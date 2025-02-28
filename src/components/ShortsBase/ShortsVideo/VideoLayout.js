import { useEffect, useState ,useRef, useCallback} from 'react';
import VideoItem from './VideoItem/VideoItem'
import './VideoLayout.scss'
const VideoLayout = ({currentVideoIndex,setCurrentVideoIndex,videoItems,videosLength,isTransforming,timerRef}) => {
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
        <div className="shorts-layout-container" ref={layOutRef}>
            <div className="video-items-container" style={{transform:`translateY(-${currentVideoIndex*100}%)`}}>
                {
                    videoItems.map((color,index)=><VideoItem title={index} color={color} />)
                }
            </div>
        </div>
    )
}
export default VideoLayout