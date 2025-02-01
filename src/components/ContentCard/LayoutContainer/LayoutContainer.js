import{useState,useEffect,useRef}from 'react'
import './LayoutContainer.scss'
const LayoutContainer = ({ items }) => {
    const [columns, setColumns] = useState(1);
    const columnItems = new Array(columns)
    for (let i = 0; i < columns; i++) {
        columnItems[i] = new Array(0)
    }
    for (let i = 0; i < items.length;) {
        for (let j = 0; j < columns; j++) {
            if (i < items.length) {
                columnItems[j].push(items[i])
                i++
            }
            else {
                break;
            }
        }
    }
    const containerRef = useRef(null)
    useEffect(() => {
        const handleResizeColumnChange = () => {
            const currentContainerWidth = containerRef.current.offsetWidth
            if (currentContainerWidth < 300) {
                return
            }
            const newColumn = Math.floor(currentContainerWidth / 300)
            setColumns(newColumn)
        }
        handleResizeColumnChange()
        window.addEventListener('resize', handleResizeColumnChange)
        return () => {
            window.removeEventListener('resize',handleResizeColumnChange)
        }
    }, [])
    return (<div className="layout-container" ref={containerRef}>
        {
            columnItems.map((columnItem, index) => (
                <div className="column-item" key={index}>
                    {
                        columnItem.map((rowItem) => (
                            <div className="row-item" key={rowItem.id}>
                                {
                                    rowItem.name
                                }
                                <img src={rowItem.src} alt="no" className="row-img" />
                            </div>
                        ))
                    }
                </div>
            ))
        }
    </div>
    )
}
export default LayoutContainer