import { useContext} from 'react'
import Searchbar from '../../components/Searchbar/Searchbar'
import './Circles.scss'
import { AppContext } from '../../contexts/AppContext'
// import SingleRowDisplayBar from '../../components/HorizontalDisplayBar/SingleRowDisplayBar/SingleRowDisplayBar'
const Circles = () => {
    const { handleLeftIsShowClick,setBottomIsShow}=useContext(AppContext)
    return <div className="app-circles">
        <header className='app-circles__header'>
            <div className="search-container">
                <Searchbar setBottomIsShow={setBottomIsShow}/>
            </div>
        </header>
        <main className='app-circles__main'>
        </main>
    </div>
}
export default Circles