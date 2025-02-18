import{useState,useEffect,useRef}from 'react'
import './LayoutContainer.scss'
import PostCard from '../PostCard/PostCard'
const LayoutContainer = ({ items }) => {
    const [columns, setColumns] = useState(0);
    const [columnItems, setColumnItems] = useState([]);
    const containerRef = useRef(null)
    useEffect(() => {
        const onResizeColumnChange = () => {
                // const currentContainerWidth = containerRef.current.offsetWidth
                const currentContainerWidth = window.innerWidth
                if (currentContainerWidth < 350) {
                    setColumns(1)
            }
            else if(currentContainerWidth < 1000){
                const newColumn = Math.floor(currentContainerWidth / 350)
                setColumns(newColumn)
            }
                else {
                    const newColumn = Math.floor(currentContainerWidth / 400)
                setColumns(newColumn)
            }
        }
        onResizeColumnChange()
        window.addEventListener('resize', onResizeColumnChange)
        return () => {
            window.removeEventListener('resize',onResizeColumnChange)
        }
    }, [])
    useEffect(() => {
        if (columns > 0) {
            const newColumnItems = new Array(columns).fill(null).map(() => []);
            for (let i = 0, j = 0; i < items.length; i++, j = (j + 1) % columns) {
                newColumnItems[j].push(items[i]);
            }
            setColumnItems(newColumnItems);
        }
    }, [columns, items]);
    return (<div className="layout-container" ref={containerRef}>
        {
            columns > 0 && columnItems&& columnItems.map((columnItem, columnIndex) => (
                    <div className="column-item" key={columnIndex}>
                    {
                        
                        columnItem.map((rowItem,rowIndex) => <div className="row-item"><PostCard postItem={rowItem}/></div>)
                        }
                    </div>
            ))
        }
    </div>
    )
}
export default LayoutContainer