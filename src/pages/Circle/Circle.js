import { useNavigate, useParams } from 'react-router-dom'
import './Circle.scss'
import { useState } from 'react'
const Circle = () => {
    const {circleName }=useParams()
    const [count, setCount] = useState(0)
    const nav=useNavigate()
    return (
        <div className="circle">
            圈子名字为:{circleName}
            <div onClick={() => setCount((prev) => prev + 1)}>{count}</div>
            <div onClick={()=>nav(-1)}>后退</div>
        </div>
    )
}
export default Circle