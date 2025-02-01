import{useState,useEffect,useRef}from 'react'
import './LayoutContainer.scss'
const LayoutContainer = ({ items }) => {
    const [columns, setColumns] = useState(0);
    const [columnItems, setColumnItems] = useState([]);
    const containerRef = useRef(null)
    useEffect(() => {
        const onResizeColumnChange = () => {
                // const currentContainerWidth = containerRef.current.offsetWidth
                const currentContainerWidth = window.innerWidth
                if (currentContainerWidth < 300) {
                    return
            }
            else if(currentContainerWidth < 1000){
                const newColumn = Math.floor(currentContainerWidth / 300)
                setColumns(newColumn)
            }
                else {
                    const newColumn = Math.floor(currentContainerWidth / 390)
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
            columns > 0 && columnItems&& columnItems.map((columnItem, index) => (
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