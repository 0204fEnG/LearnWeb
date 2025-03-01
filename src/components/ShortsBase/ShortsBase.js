import './ShortsBase.scss'
import VideoLayout from './ShortsVideo/VideoLayout.js'
import ShortsComments from './ShortsComments/ShortsComments.js'
import ChevronTop from '../icons/ChevronUp.js'
import ChevronBottom from '../icons/ChevronBottom.js'
import { useState, createContext,useEffect,useRef,useCallback } from 'react'
import useMyTransition from '../../hooks/useMyTransition.js'
import { KeepAlive ,useAliveController} from 'react-activation'
export const ShortsBaseContext=createContext()
const ShortsBase = () => {
    const { drop, refresh, clear, getCachingNodes } = useAliveController()
    const { domIsEnter: commentsIsPush, domIsRender: commentsIsRender, handleDomShow: handleCommentsShow } = useMyTransition(200)
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
    const [videoItems, setVideoItems] = useState([
        {
            videoId:28212,
            userAvatar: '/images/header/banner/1.png',
            userName:'user1',
            title: '视频1',
            videoUrl: '/videos/3.mp4',
            description: '测试专用简介1',
            publishTime: '5天前 18:57',
            likes: 450,
            comments: 30210,
            favorites:2230
        },
        {
            videoId:2103,
            userAvatar: '/images/header/banner/2.png',
            userName:'user2',
            title: '视频2',
            videoUrl: '/videos/7.mp4',
            description: '测试专用简介2',
            publishTime: '2024年10月24日 09:05',
            likes: 415,
            comments: 3210,
            favorites:230
        },
        {
            videoId:29221,
            userAvatar: '/images/header/banner/3.png',
            userName:'user3',
            title: '视频3',
            videoUrl: '/videos/6.mp4',
            description: '测试专用简介3',
            publishTime: '2024年12月24日 18:05',
            likes: 145,
            comments: 3002,
            favorites:230
        },
        {
            videoId:2154,
            userAvatar: '/images/header/banner/4.png',
            userName:'user4',
            title: '视频4',
            videoUrl: '/videos/5.mp4',
            description: '测试专用简介4',
            publishTime: '1月1日 23:05',
            likes: 235,
            comments: 3040,
            favorites:2330
        },
        {
            videoId:292,
            userAvatar: '/images/header/banner/5.png',
            userName:'user5',
            title: '视频5',
            videoUrl: '/videos/4.mp4',
            description: '测试专用简介5',
            publishTime: '2024年5月1日 14:05',
            likes: 2145,
            comments: 3001,
            favorites:2320
        },
        {
            videoId:210093,
            userAvatar: '/images/header/banner/6.png',
            userName:'user6',
            title: '视频6',
            videoUrl: '/videos/3.mp4',
            description: '2月3日 00:05',
            publishTime: '',
            likes: 4215,
            comments: 31200,
            favorites:2310
        },
        {
            videoId:2113,
            userAvatar: '/images/header/banner/5.png',
            userName:'user7',
            title: '视频7',
            videoUrl: '/videos/2.mp4',
            description: '测试专用简介7',
            publishTime: '3月1日 14:05',
            likes: 4785,
            comments: 3070,
            favorites:23560
        },
        {
            videoId:2131313,
            userAvatar: '/images/header/banner/4.png',
            userName:'user8',
            title: '视频8',
            videoUrl: '/videos/1.mp4',
            description: '测试专用简介8',
            publishTime: '3天前 13:56',
            likes: 425,
            comments: 12300,
            favorites:5230
        },
    ])
    const [videosLength, setVideosLength] = useState(videoItems.length)
    const isTransforming = useRef(false); 
    const timerRef=useRef()
    useEffect(() => {
        setVideosLength(videoItems.length)
    }, [videoItems])
    const handleCurrentVideoIndex = (direction) => {
        setCurrentVideoIndex((prev) => {
            const newIndex=direction+prev
            return Math.max(0, Math.min(newIndex, videosLength - 1))
        })
    }
    const handleCommentsContainerClick = (e) => {
        if (e.currentTarget !== e.target) {
            return
        }
        e.stopPropagation()
        handleCommentsShow()
    }
    const handleChangeClick = useCallback((e, newDirection) => {
        e.preventDefault()
        if (isTransforming.current) { 
          return;
        }
        isTransforming.current=true
        if (timerRef.current) {
          clearTimeout(timerRef.current);
        }
        handleCurrentVideoIndex(newDirection)
        timerRef.current=setTimeout(() => {
          isTransforming.current = false;
        }, 300)
    }, [videosLength,handleCurrentVideoIndex])
    return (
        <ShortsBaseContext.Provider value={{ commentsIsPush,handleCommentsShow,currentVideoIndex,handleCurrentVideoIndex}}>
            <div className="shorts-base-container">
                <div className="shorts-main">
                    <div className={`shorts-video-container${commentsIsPush ? ' comments--push' : ''}`}>
                        <VideoLayout
                            videoItems={videoItems}
                            videosLength={videosLength}
                            isTransforming={isTransforming}
                            timerRef={timerRef}
                        />  
                    </div>
                    {commentsIsRender&&
                        <div className={`shorts-comments-container${commentsIsPush ? ' comments--push' : ''}`}
                        onClick={handleCommentsContainerClick}>
                            <div className={`shorts-comments-wrapper${commentsIsPush ? ' comments--push' : ''}`}>
                                <KeepAlive id={currentVideoIndex} name={currentVideoIndex}>
                                    <ShortsComments index={currentVideoIndex } />
                                </KeepAlive>        
                            </div>
                        </div>
                    }    
                </div>
                <div className="shorts-aside">
                    <div className="video-change-buttons">
                        <button className='change' onClick={(e)=>handleChangeClick(e,-1)}><ChevronTop className='change-icon'/></button>
                        <button className='change'onClick={(e)=>handleChangeClick(e,1)}><ChevronBottom className='change-icon'/></button>
                    </div>
                </div>
                </div>
        </ShortsBaseContext.Provider>
    )
}
export default ShortsBase