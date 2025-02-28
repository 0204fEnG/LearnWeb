import { useState} from 'react'
import './ShortsComments.scss'
const ShortsComments = ({index}) => {
    const [count,setCount]=useState(0)
    return (
        <div className="comments-container">
            <button onClick={() => setCount((prev) => prev + 1)}>add</button>
            <p>{count}</p>
            当前:{index}
        </div>
    )
}
export default ShortsComments