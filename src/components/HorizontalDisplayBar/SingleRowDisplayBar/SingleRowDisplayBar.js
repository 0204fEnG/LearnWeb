import { useNavigate } from 'react-router-dom'
import './SingleRowDisplayBar.scss'
import { useRef, useState } from 'react'
const SingleRowDisplayBar = ({ title, cards }) => {
    const cardsRef = useRef(null)
    const handleToClick = () => {
        setToOpen(!toOpen)
        // if (cardsRef.current&&!toOpen) {
        //     cardsRef.current.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" })
        // }
    }
    const nav = useNavigate()
    const [toOpen,setToOpen]=useState(false)
    return <div className='single-container' ref={cardsRef}>
        <div className="single-top">
            <p className="title">{title}💬</p>
        <button className={`to ${toOpen?'toOpen':''}`} onClick={handleToClick}>&gt;</button>
        </div>
        <div className={`cards ${toOpen?'toOpen':''}`}>
            {cards.map((card, index) => (<div key={index} className={`card ${toOpen && 'toOpen'}`}>
                <img src={card.avatar} alt="头像" className="avatar" onClick={()=>nav(card.page+card.name)}/>
                <span className="name" onClick={()=>nav(card.page+card.name)} >{card.name}</span>
            </div>))}
        </div>
    </div>
}
export default SingleRowDisplayBar