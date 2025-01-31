import { useEffect } from 'react'
import './Shorts.scss'
import { useAppContext } from '../../App'
const Shorts = () => {
    const {handleLeftIsShowClick}=useAppContext()
    return <div className="app-shorts">
        <header className='app-shorts__header'>
            shorts
        </header>
        <main className='app-shorts__main'>
        </main>
    </div>
}
export default Shorts