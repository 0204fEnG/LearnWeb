import ChevronLeftIcon from '../icons/ChevronLeftIcon'
import './Title.scss'
import { useNavigate } from 'react-router-dom'
const Title = ({ title }) => {
    const nav=useNavigate()
    return <div className="title-container">
        <button className="back" onClick={()=>nav(-1)}><ChevronLeftIcon className='back-svg'/></button>
        <p className="title">{title}</p>
    </div>
}
export default Title