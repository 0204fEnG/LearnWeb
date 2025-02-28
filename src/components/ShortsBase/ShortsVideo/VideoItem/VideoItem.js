import { useContext, useState } from 'react'
import Comment from '../../../icons/Comment'
import Star from '../../../icons/Star'
import Up from '../../../icons/Up'
import './VideoItem.scss'
import { ShortsBaseContext } from '../../ShortsBase'
const VideoItem = ({ title, color }) => {
    const {commentsIsPush,handleCommentsShow} =useContext(ShortsBaseContext)
    const getRandomNumber=(min, max)=> {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    const [videoUrl,setVideoUrl]=useState(getRandomNumber(1,7))
    const commentsToolOnclick = (e) => {
        e.stopPropagation()
        handleCommentsShow()
    }
    return (
        <div className="video-item-container" style={{ backgroundColor: `${color}` }}>
            <div className={`video-container${commentsIsPush?' comments--push':''}`}>
                <video autoPlay muted loop>
                    <source src={`/videos/${videoUrl}.mp4`} type='video/mp4'/>
                </video>
            </div>
            <ul className="video-item-tools">
                <li className="video-item-tool"><Up className='video-item-icon'/></li>
                <li className="video-item-tool" onClick={commentsToolOnclick}><Comment className='video-item-icon'/></li>
                <li className="video-item-tool"><Star className='video-item-icon'/></li>
            </ul>
        </div>
    )
}
export default VideoItem