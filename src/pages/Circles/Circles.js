import { useContext} from 'react'
// import Searchbar from '../../components/Searchbar/Searchbar'
import './Circles.scss'
import { AppContext } from '../../contexts/AppContext'
// import { useOutletContext } from 'react-router-dom'
const Circles = () => {
    const { handleLeftIsShowClick}=useContext(AppContext)
    return <div className="app-circles">
        <header className='app-circles__header'>
            <div className='app-left-show' onClick={handleLeftIsShowClick}>≡</div>
        </header>
        <main className='app-circles__main'>
        </main>
    </div>
}
export default Circles