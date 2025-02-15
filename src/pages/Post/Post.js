import { useLocation, useNavigate, useParams } from 'react-router-dom'
import './Post.scss'
import { useEffect, useState } from 'react'
const Post = () => {
    // const location=useLocation()
    const nav = useNavigate()
    const [count, setCount] = useState(0)
    const [isLeave,setIsLeave]=useState(false)
    const { postId } = useParams()
    const handleMaskClick = (event) => {
        if (event.target !== event.currentTarget) {
    return;
    }
    else {
        setIsLeave(true)
            setTimeout(() => {
                setIsLeave(false)
                nav(-1)
            }, 300)
    }
    }
    useEffect(() => {
        console.log('yangshi')
    },[isLeave])
    return (
    <div className={`post-mask ${isLeave?'leave':''}`} onClick={handleMaskClick}>
        <div className={`post-container ${isLeave?'leave':''}`}>
        {/* <header className="Post-top"></header> */}
        <button onClick={() => setCount(count+1)}>{postId}增加</button>
                <button >{count}</button>
        </div>
    </div>)
}
export default Post