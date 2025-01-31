import { useEffect, useRef, useState } from 'react'
import './SingleLineDisplayBar.scss'
const SingleLineDisplayBar = ({ displayItems }) => {
    // const [indicatorCount, setIndicatorCount] = useState(0)
    // const [currentIndicator, setCurrentIndicator] = useState(0)
    // const displayContainer = useRef()
    // useEffect(() => {
    //     const indicatorResize = () => {
    //         const containerWidth = displayContainer.current.offsetWidth
    //         const itemsLength = displayItems.length
    //         const itemsWidth = itemsLength * 60
    //         scrollWidth = itemsWidth - containerWidth
    //         const tempIndicatorCount = Math.ceil(itemsWidth / containerWidth)
    //         setIndicatorCount(tempIndicatorCount)
    //     }
    //     indicatorResize()
    //     window.addEventListener('resize', indicatorResize)
    //     return ()=>{
    //         window.removeEventListener('resize', indicatorResize) 
    //     }
    // },[])
    return (
        <div className="display-container">
            <div className="display-items">
            {displayItems.map((item, index) => (
                <div className="display-item" key={index}>
                    {item.name}
                </div>
            ))}
            </div>
            {/* <div className="indicator-container">
                 {Array.from({ length: indicatorCount }).map((_, index) =>
                     <div className={['indicator',currentIndicator===index?'indicator--active':''].join(' ')} key={index}>
                </div>
            )}
            </div> */}
        </div>
    )
}
export default SingleLineDisplayBar
