import { useNavigate } from 'react-router-dom'
import './SingleRowDisplayBar.scss'
const SingleRowDisplayBar = ({ title, cards }) => {
    const nav = useNavigate()
    return <div className='single-container' >
        <div className="single-top">
            <p className="title">{title}💬</p>
        <button className='to'>&gt;</button>
        </div>
        <div className='cards'>
            {cards.map((card, index) => (<div key={index} className='card'>
                <img src={card.avatar} alt="头像" className="avatar" onClick={()=>nav(card.page+card.name)}/>
                <span className="name" onClick={()=>nav(card.page+card.name)} >{card.name}</span>
            </div>))}
        </div>
    </div>
}
export default SingleRowDisplayBar