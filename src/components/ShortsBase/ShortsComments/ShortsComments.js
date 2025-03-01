import { useEffect, useState} from 'react'
import './ShortsComments.scss'
const ShortsComments = ({ index }) => {
    const [count, setCount] = useState(0)
    useEffect(() => {
        console.log('重新挂载:',index)
    },[])
    console.log('重新渲染:',index)
    return (
        <div className="comments-container">
            <button onClick={() => setCount((prev) => prev + 1)}>add</button>
            <p>{count}</p>
            当前:{index}
        </div>
    )
}
export default ShortsComments