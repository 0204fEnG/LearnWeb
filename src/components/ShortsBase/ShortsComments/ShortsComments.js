import { useEffect, useState} from 'react'
import './ShortsComments.scss'
import Comment from '../../Comment/Comment'
import ChevronTop from '../../icons/ChevronTop'
const ShortsComments = ({ index }) => {
    return (
        <div className="shorts-comments-box">
            <div className="temp-top"><ChevronTop className='top-icon'/></div>
            <Comment/>
        </div>
    )
}
export default ShortsComments