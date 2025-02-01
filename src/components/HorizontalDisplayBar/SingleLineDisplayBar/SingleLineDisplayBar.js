import { useEffect, useRef, useState } from 'react'
import './SingleLineDisplayBar.scss'
const SingleLineDisplayBar = ({displayItems}) => {
    const length = displayItems.length
    const [column, setColumn] = useState(1)
    const [maxCount, setMaxCount] = useState(5)
    const [currentIndex, setCurrentIndex] = useState(0)
    const pageWidth = useRef(0)
    const touchStartTime = useRef(0);
    const touchStartX = useRef(0);
    const columnItems = new Array(column)
    for (let i = 0; i < column; i++){
        columnItems[i]=new Array()
    }
    for (let i = 0,k=0; i < column&&k<length; i++){
        for (let j = 0; j < maxCount; j++){
            if (k < length) {
                columnItems[i].push(displayItems[k])
                k++
            }
            else {
                break;
            }
        }
    }
    const containerRef=useRef(null)
    useEffect(() => {
        const handleContainerChange=() => {
            const displayContainerWidth = containerRef.current.offsetWidth
            containerRef.current.style.transform = 'translateX(0)';
            setCurrentIndex(0)
            const maxCount = 5 + 2 * Math.floor(displayContainerWidth / 500)
            const containerCount = Math.ceil(length / maxCount)
            setMaxCount(maxCount)
            setColumn(containerCount)
        }
        handleContainerChange()
        window.addEventListener('resize', handleContainerChange)
        return () => {
            window.removeEventListener('resize',handleContainerChange)
        }
    }, [])
useEffect(() => {
    pageWidth.current = containerRef.current.offsetWidth;
    
        const handleContainerTouchStart = (e) => {
            touchStartX.current = e.targetTouches[0].pageX;
            touchStartTime.current = Date.now();
            containerRef.current.style.transition = 'none';
        };

        const handleContainerTouchMove = (e) => {
            e.preventDefault();
            const currentTouchX = e.targetTouches[0].pageX;
            const diffX = currentTouchX - touchStartX.current;
            const newTranslateX = -currentIndex * pageWidth.current + diffX;
            containerRef.current.style.transform = `translateX(${newTranslateX}px)`;
        };

        const handleContainerTouchEnd = (e) => {
            const endTouchX = e.changedTouches[0].pageX;
            const diffX = endTouchX - touchStartX.current;
            const touchEndTime = Date.now();
            const touchDuration = touchEndTime - touchStartTime.current;
            const touchSpeed = Math.abs(diffX) / touchDuration; // pixels per millisecond
            const thresholdSpeed = 0.5; // pixels per millisecond
            let newPageIndex = currentIndex;

            if (Math.abs(diffX) > pageWidth.current * 0.3 || touchSpeed > thresholdSpeed) {
                if (diffX < 0 && currentIndex < column - 1) {
                    newPageIndex = currentIndex + 1;
                } else if (diffX > 0 && currentIndex > 0) {
                    newPageIndex = currentIndex - 1;
                }
            }

            containerRef.current.style.transition = 'transform 0.3s ease-in-out';
            containerRef.current.style.transform = `translateX(-${newPageIndex*100}%)`;
            setCurrentIndex(newPageIndex);
        };

        containerRef.current.addEventListener('touchstart', handleContainerTouchStart);
        containerRef.current.addEventListener('touchmove', handleContainerTouchMove);
        containerRef.current.addEventListener('touchend', handleContainerTouchEnd);

    return () => {
        if (containerRef.current) {
            containerRef.current.removeEventListener('touchstart', handleContainerTouchStart);
            containerRef.current.removeEventListener('touchmove', handleContainerTouchMove);
            containerRef.current.removeEventListener('touchend', handleContainerTouchEnd);
        }
        };
}, [currentIndex, column]);
    return (
        <div className="display-container">
            <div className="display-items-container" ref={containerRef}>
            {columnItems.map((column, columnIndex) => (
            <div className="display-items" key={columnIndex}>
                {column.map((row,rowIndex)=>(
                <div className="display-item" key={rowIndex}>
                    {row.name}
                </div>))}
            </div>
                ))}
            </div>
            <div className="indicator-container">
                {
                    Array.from({ length: column }, (_, index) => (
                        <div className={['indicator',currentIndex===index?'indicator--active':''].join(' ')}  key={index}></div>))
                }
            </div>
        </div>
    )
}
export default SingleLineDisplayBar
