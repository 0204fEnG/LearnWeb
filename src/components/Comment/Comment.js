import { Link } from "react-router-dom"
import Good from "../icons/Good"
import Reply from "../icons/Reply"
import ThreeDots from "../icons/ThreeDots"
import './Comment.scss'
const Comment = () => {
    return (
    <div className="comments-wrapper">
        <div className="comment-container">
            <div className="comment-header">
                <Link to={`/user/${1}/user-home`} className="avatar-container"><img src='/images/header/banner/4.png' alt="touxiang" className="avatar" /></Link>
                <div className="info-container">
                    <div className="name-container">
                        <Link to={`/user/${1}/user-home`} className="name">{1}</Link>
                    <span className="level">Lv4</span>
                    <span className="author">楼主</span>                                    
                    </div>
                    <div className="time"><span className="publish-time">1月29日</span></div>
                </div>
            </div>
            <div className="comment">自</div>
            <ul className="tools">
                <button className="tool"><Good className='svg-icon'/><div className="count">9923</div></button>
                <button className="tool"><Reply className='svg-icon'/><div className="count">23</div></button>
                <button className="more-container"><ThreeDots className='more-svg'/></button>
            </ul>
            <div className="reply">
                <div className="pre-reply-container">
                <div className="pre-reply">
                    <Link to='/user/24feng/user-home' className='user-name'>24feng: </Link>
                对面没算准金银角大招时间，一般来说金银角大招后摇不算难抓
                </div>
                <div className="pre-reply">
                    <Link to='/user/24yd21ng/user-home' className='user-name'>24yd21ng: </Link>
                    不是下一个无限火力，他
                    </div>
                </div>
                <button className="reply-count">共 133 条回复&gt;</button>
            </div>
        </div>                  
        </div>
    )
}
export default Comment