import ChevronLeftIcon from '../icons/ChevronLeftIcon'
import './Title.scss'
import { useNavigate } from 'react-router-dom'
const Title = ({ title,stickyClass }) => {
    const nav=useNavigate()
    return <div className="title-container" style={stickyClass}>
        <button className="component-back-wrapper" onClick={()=>nav(-1)}><ChevronLeftIcon className='back-svg'/></button>
        <p className="component-title">{title}</p>
    </div>
}
export default Title