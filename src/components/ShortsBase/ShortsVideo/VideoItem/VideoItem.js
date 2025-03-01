import { useContext, useEffect, useState,useRef } from 'react'
import Comment from '../../../icons/Comment'
import Star from '../../../icons/Star'
import Up from '../../../icons/Up'
import './VideoItem.scss'
import { ShortsBaseContext } from '../../ShortsBase'
import UpFull from '../../../icons/UpFull'
import StarFull from '../../../icons/StarFull'
import { handleStopEvent } from '../../../../utils/functions/handleStopEvent'
const VideoItem = ({videoId,videoUrl,onMenuClick,playMode,playRate}) => {
    const { commentsIsPush, handleCommentsShow ,currentVideoIndex,handleCurrentVideoIndex} = useContext(ShortsBaseContext)
    const videoRef=useRef(null)
    const [videoItemState, setVideoItemState] = useState({
        isPlay: false,
        isMuted: true,
        isUpFull: false,
        isStarFull:false,
    })
    const commentsToolOnclick = (e) => {
        e.stopPropagation()
        handleCommentsShow()
    }
    const handleUpIconClick = (e) => {
        e.stopPropagation()
        setVideoItemState((prev) => (
            {
                ...prev,
                isUpFull:!prev.isUpFull
            }
        ))
    }
    const handleStarIconClick = (e) => {
        e.stopPropagation()
        setVideoItemState((prev) => (
            {
                ...prev,
                isStarFull:!prev.isStarFull
            }
        ))
    }
    useEffect(() => {
        if (!videoRef.current) return
        videoRef.current.playbackRate=playRate
    },[playRate])
    useEffect(() => {
        setVideoItemState((prev) => ({
            ...prev,
            isPlay: currentVideoIndex === videoId,
            isMuted:!(currentVideoIndex === videoId)
        }))
    }, [currentVideoIndex, videoId])
    useEffect(() => {
      if (!videoRef.current) return;
      if (videoItemState.isPlay) {
        videoRef.current.play().catch((err) => {
          // 过滤因正常切换导致的中断错误
          if (!err.message.includes("interrupted")) {
            console.error("播放错误:", err);
          }
        });
      } else {
        videoRef.current.pause();
      }
    }, [videoItemState.isPlay]);
    const handleVideoEnded = () => {
        switch (playMode) {
            case 'loopPlay': {   
                videoRef.current.currentTime = 0;
                videoRef.current.play();
                break
            }
            case 'autoPlay':{
                handleCurrentVideoIndex(1)
                break
            }
            case 'playedPause': {
                videoRef.current.pause();
                break
            }
            default: break;
        }
    }
    useEffect(() => {
        if (!videoRef.current) return
        videoRef.current.muted=videoItemState.isMuted
    },[videoItemState.isMuted])
    return (
        <div className="video-item-container">
            <div className={`video-container${commentsIsPush?' comments--push':''}`}>
                <video
                    ref={videoRef}
                    controls
                    onContextMenu={onMenuClick}
                    onEnded={(e)=>handleStopEvent(e,handleVideoEnded)}
                >
                    <source src={videoUrl} type='video/mp4'/>
                </video>
            </div>
            <ul className="video-item-tools">
                <button className="video-item-tool" onClick={handleUpIconClick}>{
                    videoItemState.isUpFull ?
                    <UpFull className='video-item-icon up-full'/>
                    :
                    <Up className='video-item-icon' />
                }
                </button>
                <button className="video-item-tool" onClick={commentsToolOnclick}><Comment className='video-item-icon'/></button>
                <button className="video-item-tool" onClick={handleStarIconClick}>{
                    videoItemState.isStarFull ?
                    <StarFull className='video-item-icon star-full' />
                    :
                    <Star className='video-item-icon' />
                }</button>
            </ul>
        </div>
    )
}
export default VideoItem