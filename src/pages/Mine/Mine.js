import { useEffect } from 'react'
import './Mine.scss'
import { useAppContext } from '../../App'
const Mine = () => {
    useEffect(() => {
        setBottomIsClose(false)
    }, [])
    const {handleLeftIsShowClick,setBottomIsClose}=useAppContext()
    return <div className="app-mine">
        <header className='app-mine__header'>
            mine我的
        </header>
        <main className='app-mine__main'>
        </main>
    </div>
}
export default Mine