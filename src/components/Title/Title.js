import './Title.scss'
import {useNavigate}from'react-router-dom'
const Title = ({ title }) => {
    const nav=useNavigate()
    return <div className="title-container">
        <button className="back" onClick={()=>nav(-1)}>&lt;</button>
        <p className="title">{title}</p>
    </div>
}
export default Title