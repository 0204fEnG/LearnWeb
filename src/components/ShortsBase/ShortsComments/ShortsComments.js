import { useEffect, useState} from 'react'
import './ShortsComments.scss'
import Comment from '../../Comment/Comment'
import SortTop from '../../SortTop/SortTop'
const ShortsComments = ({ index }) => {
    const [sortIndex,setSortIndex]=useState(0)//0 热度 1 最新
    const sortItems = [
        {
            name: '按热度',
            handleFunc:() => {
                setSortIndex(0)
            }
        },
        {
            name: '按时间',
            handleFunc:() => {
                setSortIndex(1)
            }
        }
    ]
    return (
        <div className="shorts-comments-box">
            <Comment commentHeaderTop={{top:'0px'}}/>
        </div>
    )
}
export default ShortsComments