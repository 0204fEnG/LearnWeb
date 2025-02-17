import { useContext} from 'react'
import Searchbar from '../../components/Searchbar/Searchbar'
import './Message.scss'
import { AppContext } from '../../contexts/AppContext'
const Message = () => {
    const { handleLeftIsShowClick,setBottomIsShow}=useContext(AppContext)
    return <div className="app-message">
        <header className='app-message__header'>
            <div className="search-container">
                <Searchbar setBottomIsShow={setBottomIsShow}/>
            </div>
        </header>
        <main className='app-message__main'>
        </main>
    </div>
}
export default Message