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
    const { drop, dropScope, clear, getCachingNodes } = useAliveController()
    const { domIsEnter: commentsIsPush, domIsRender: commentsIsRender, handleDomShow: handleCommentsShow } = useMyTransition(250)
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
    const getRandomColor = () => {
      const letters = '0123456789ABCDEF';
      let color = '#';
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    };
    const [videoItems, setVideoItems] = useState(Array.from({ length: 10 }, () => getRandomColor()))
    const [videosLength, setVideosLength] = useState(videoItems.length)
    const isTransforming = useRef(false); 
    const timerRef=useRef()
    useEffect(() => {
        setVideosLength(videoItems.length)
    },[videoItems])
    const handleCommentsContainerClick = (e) => {
        if (e.currentTarget !== e.target) {
            return
        }
        e.stopPropagation()
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
        setCurrentVideoIndex(Math.max(0,Math.min(newIndex, videosLength - 1)))
        timerRef.current=setTimeout(() => {
          isTransforming.current = false;
        }, 300)
    }, [videosLength])
    
    return (
        <ShortsBaseContext.Provider value={{ commentsIsPush,handleCommentsShow }}>
            <div className="shorts-base-container">
                <div className="shorts-main">
                    <div className="shorts-video-container">
                        <VideoLayout
                            currentVideoIndex={currentVideoIndex}
                            setCurrentVideoIndex={setCurrentVideoIndex}
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
                    <button>缓存</button>
                    <button></button>
                    <button></button>
                </div>
                </div>
        </ShortsBaseContext.Provider>
    )
}
export default ShortsBase