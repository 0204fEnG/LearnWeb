import {  Link, useNavigate, useParams } from 'react-router-dom'
import './Post.scss'
import { useEffect, useState } from 'react'
import ChevronLeftIcon from '../../components/icons/ChevronLeftIcon'
const Post = () => {
    const nav = useNavigate()
    const [isLeave,setIsLeave]=useState(false)
    const { postId } = useParams()
    const handleMaskClick = (event) => {
        event.stopPropagation();
        setIsLeave(true)
        setTimeout(() => {
            setIsLeave(false)
            nav(-1)
        }, 300)
    }
    return (
        <div className={`post-mask ${isLeave ? 'leave' : ''}`} onClick={handleMaskClick}>        
            <div className={`post-container ${isLeave ? 'leave' : ''}`}>                
                <div className="header">
                    <div onClick={handleMaskClick} className='back-container'>
                        <ChevronLeftIcon className='back' /> 
                    </div>
                    <div className="author-info">
                        <Link to="/home" className="img-container">
                        <img src="/images/header/banner/4.png" alt="用户头像" className="avatar" />
                        </Link>
                        <Link to='/home'className='name-container'>
                            <span className="name">宇智波鼬</span>
                        </Link>
                    </div>
                       <div className="follow-container">
                            <button className='follow'>
                                关注
                            </button>
                        </div>
                </div>
                <div className="content-container"></div>
                <div className="comments-container"></div>
            </div>            
        </div>
    )
}
export default Post