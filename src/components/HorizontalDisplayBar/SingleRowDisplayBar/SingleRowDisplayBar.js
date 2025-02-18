import { useNavigate } from 'react-router-dom'
import './SingleRowDisplayBar.scss'
import ChevronRightIcon from '../../icons/ChevronRightIcon'
const SingleRowDisplayBar = ({ title, cards,Icon }) => {
    const nav = useNavigate()
    return <div className='single-container' >
        <div className="single-top">
            <p className="title">{title}</p>
            <Icon className='icon'/>
        <button className='to'><ChevronRightIcon className='right-icon'/></button>
        </div>
        <div className='cards'>
            {cards.map((card, index) => (<div key={index} className='card'>
                <img src={card.avatar} alt="头像" className="avatar" onClick={()=>nav(card.path+card.name)}/>
                <span className="name" onClick={()=>nav(card.path+card.name)} >{card.name}</span>
            </div>))}
            <button className="card">查看更多</button>
        </div>
    </div>
}
export default SingleRowDisplayBar