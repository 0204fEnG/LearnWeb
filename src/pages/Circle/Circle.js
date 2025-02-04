import { useNavigate, useParams } from 'react-router-dom'
import './Circle.scss'
import { useEffect, useState } from 'react'
const Circle = () => {
    const [count, setCount] = useState(0)
    const nav=useNavigate()
    const { circleName } = useParams()
        useEffect(() => {
        console.log('circle挂载！')
        return () => {
            console.log('circle退出！')
        }
    },[])
    return (
        <div className="circle">
            圈子名字为:{circleName}
            <div onClick={() => setCount((prev) => prev + 1)}>{count}</div>
            <div onClick={()=>nav(-1)}>后退</div>
        </div>
    )
}
export default Circle