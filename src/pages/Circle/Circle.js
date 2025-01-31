import { useParams } from 'react-router-dom'
import './Circle.scss'
import { useEffect } from 'react'
const Circle = () => {
    const {circleName}=useParams()
    return (
        <div className="circle">
            圈子名字为:{circleName}
        </div>
    )
}
export default Circle