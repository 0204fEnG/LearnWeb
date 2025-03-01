import { useContext, useEffect, useState,useRef } from 'react'
import Comment from '../../../icons/Comment'
import Star from '../../../icons/Star'
import Up from '../../../icons/Up'
import './VideoItem.scss'
import { ShortsBaseContext } from '../../ShortsBase'
import UpFull from '../../../icons/UpFull'
import StarFull from '../../../icons/StarFull'
const VideoItem = ({ title, color ,currentVideoIndex,videoId,onMenuClick}) => {
    const { commentsIsPush, handleCommentsShow } = useContext(ShortsBaseContext)
    const videoRef=useRef(null)
    const [videoItemState, setVideoItemState] = useState({
        isPlay: false,
        isMuted: true,
        isUpFull: false,
        isStarFull:false,
    })
    const getRandomNumber=(min, max)=> {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    const [videoUrl,setVideoUrl]=useState(getRandomNumber(1,7))
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
        setVideoItemState((prev) => ({
            ...prev,
            isPlay: currentVideoIndex === videoId,
            isMuted:!(currentVideoIndex === videoId)
        }))
    }, [currentVideoIndex, videoId])

    useEffect(() => {
        if (!videoRef.current) return
        videoItemState.isPlay?videoRef.current.play():videoRef.current.pause()
    }, [videoItemState.isPlay])
    
    useEffect(() => {
        if (!videoRef.current) return
        videoRef.current.muted=videoItemState.isMuted
    },[videoItemState.isMuted])
    return (
        <div className="video-item-container" style={{ backgroundColor: `${color}` }}>
            <div className={`video-container${commentsIsPush?' comments--push':''}`}>
                <video
                    ref={videoRef}
                    controls loop
                    onContextMenu={onMenuClick}
                >
                    <source src={`/videos/${videoUrl}.mp4`} type='video/mp4'/>
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