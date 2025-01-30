import { useEffect } from 'react'
import { useAppContext } from '../../App'
// import Searchbar from '../../components/Searchbar/Searchbar'
import './Circles.scss'
const Circles = () => {
    useEffect(() => {
        setBottomIsClose(false)
    }, [])
    const {handleLeftIsShowClick,setBottomIsClose}=useAppContext()
    return <div className="app-circles">
        <header className='app-circles__header'>
            <div className='app-left-show' onClick={handleLeftIsShowClick}>≡</div>
        </header>
        <main className='app-circles__main'>
        </main>
    </div>
}
export default Circles