import { useParams } from 'react-router-dom'
import './Circle.scss'
import { useAppContext } from '../../App'
import { useEffect } from 'react'
const Circle = () => {
    useEffect(() => {
        setBottomIsClose(true)
    },[])
    const { setBottomIsClose } = useAppContext()
    const {circleName}=useParams()
    return (
        <div className="circle">
            圈子名字为:{circleName}
        </div>
    )
}
export default Circle