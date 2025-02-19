import { useNavigate } from 'react-router-dom'
import './SingleRowDisplayBar.scss'
import ChevronRightIcon from '../../icons/ChevronRightIcon'
const SingleRowDisplayBar = ({ title, cards,Icon,morePath}) => {
    const nav = useNavigate()
    const replacePlaceholder=(name, path)=> {
  // 使用正则表达式替换路径中的冒号
  return path.replace(/:/g, name);
    }
    const handleNavClick = (name,path) => {
        const toPath = replacePlaceholder(name, path)
        nav(toPath)
    }
    return <div className='single-container' >
        <div className="single-top">
            <p className="title">{title}</p>
            <Icon className='icon'/>
        <button className='to'><ChevronRightIcon className='right-icon'/></button>
        </div>
        <div className='cards'>
            {cards.map((card, index) => (<div key={index} className='card'>
                <img src={card.avatar} alt="头像" className="avatar" onClick={()=>handleNavClick(card.name,card.path)}/>
                <span className="name" onClick={()=>handleNavClick(card.name,card.path)} >{card.name}</span>
            </div>))}
            <button className="card more">查看更多</button>
        </div>
    </div>
}
export default SingleRowDisplayBar