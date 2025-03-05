import './ShortsBase.scss'
import VideoLayout from './ShortsVideo/VideoLayout.js'
import ShortsComments from './ShortsComments/ShortsComments.js'
import ChevronTop from '../icons/ChevronTop.js'
import ChevronBottom from '../icons/ChevronBottom.js'
import { useState, createContext,useEffect,useRef,useCallback } from 'react'
import useMyTransition from '../../hooks/useMyTransition.js'
import { KeepAlive ,useAliveController} from 'react-activation'
export const ShortsBaseContext=createContext()
const ShortsBase = ({videoItems}) => {
    const { drop, refresh, clear, getCachingNodes } = useAliveController()
    const { domIsEnter: commentsIsPush, domIsRender: commentsIsRender, handleDomShow: handleCommentsShow } = useMyTransition(200)
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
    const [videosLength, setVideosLength] = useState(videoItems.length)
    const isTransforming = useRef(false); 
    const timerRef = useRef()
    console.log(currentVideoIndex)
    useEffect(() => {
        setVideosLength(videoItems.length)
    }, [videoItems])
// 在ShortsBaseContext中修改
const handleCurrentVideoIndex = (newIndex) => {
  setCurrentVideoIndex(Math.max(0, Math.min(newIndex, videosLength - 1)));
}
    const handleCommentsContainerClick = (e) => {
        if (e.currentTarget !== e.target) {
            console.log('oms')
            return
        }
        e.stopPropagation()
        console.log('com!')
        handleCommentsShow()
    }
    const handleChangeClick = useCallback((e, newIndex) => {
        e.preventDefault()
        if (isTransforming.current) { 
          return;
        }
        isTransforming.current=true
        if (timerRef.current) {
          clearTimeout(timerRef.current);
        }
        handleCurrentVideoIndex(newIndex)
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
                        <button className='change' onClick={(e)=>handleChangeClick(e,currentVideoIndex-1)}><ChevronTop className='change-icon'/></button>
                        <button className='change'onClick={(e)=>handleChangeClick(e,currentVideoIndex+1)}><ChevronBottom className='change-icon'/></button>
                    </div>
                </div>
                </div>
        </ShortsBaseContext.Provider>
    )
}
export default ShortsBase