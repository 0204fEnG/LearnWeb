import { useEffect, useState } from 'react'
import SingleRowDisplayBar from '../../../components/HorizontalDisplayBar/SingleRowDisplayBar/SingleRowDisplayBar'
import ChatDots from '../../../components/icons/ChatDots'
import Group from '../../../components/icons/Group'
import Visted from '../../../components/icons/Visted'
import './CirclesRecommend.scss'
import { getHotSearch } from '../../../api/circle'
import ChevronRightIcon from '../../../components/icons/ChevronRightIcon'
import Globel from '../../../components/icons/Globel'
const CirclesRecommend = () => {
    const [hotSearchData,setHotSearchData]=useState([])
    const fetchHotSearchData = async () => {
        try {
            const response = await getHotSearch()
            setHotSearchData(response.searchs)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchHotSearchData()
    },[])
    const followedCircles = [
        {
            avatar: '/images/header/banner/6.png',
            name: '明小说',
            path: '/circles/circle/:'
        },
        {
            avatar: '/images/header/banner/6.png',
            name: '说文解字',
            path: '/circles/circle/:'
        },
        {
            avatar: '/images/header/banner/6.png',
            name: 'tansa',
            path: '/circles/circle/:'
        },
        {
            avatar: '/images/header/banner/6.png',
            name: '美食',
            path: '/circles/circle/:'
        },
        {
            avatar: '/images/header/banner/6.png',
            name: '明小说',
            path: '/circles/circle/:'
        },
        {
            avatar: '/images/header/banner/6.png',
            name: '美食',
            path: '/circles/circle/:'
        },
        {
            avatar: '/images/header/banner/6.png',
            name: '明小说',
            path: '/circles/circle/:'
        },
        {
            avatar: '/images/header/banner/6.png',
            name: '美食',
            path: '/circles/circle/:'
        },
        {
            avatar: '/images/header/banner/6.png',
            name: '明小说',
            path: '/circles/circle/:'
        },
        {
            avatar: '/images/header/banner/6.png',
            name: '美食',
            path: '/circles/circle/:'
        },
        {
            avatar: '/images/header/banner/6.png',
            name: '明小说',
            path: '/circles/circle/:'
        },
        {
            avatar: '/images/header/banner/6.png',
            name: '美食',
            path: '/circles/circle/:'
        },
        {
            avatar: '/images/header/banner/6.png',
            name: '明小说',
            path: '/circles/circle/:'
        },
        {
            avatar: '/images/header/banner/6.png',
            name: '美食',
            path: '/circles/circle/:'
        },
        {
            avatar: '/images/header/banner/6.png',
            name: '明小说',
            path: '/circles/circle/:'
        }
    ]
    const visitedCircles = [
        {
            avatar: '/images/header/banner/6.png',
            name: '明小说',
            path: '/circles/circle/:'
        },
        {
            avatar: '/images/header/banner/6.png',
            name: '说文解字',
            path: '/circles/circle/:'
        },
        {
            avatar: '/images/header/banner/6.png',
            name: 'tansa',
            path: '/circles/circle/:'
        },
        {
            avatar: '/images/header/banner/6.png',
            name: '美食',
            path: '/circles/circle/:'
        },
        {
            avatar: '/images/header/banner/6.png',
            name: '明小说',
            path: '/circles/circle/:'
        },
        {
            avatar: '/images/header/banner/6.png',
            name: '美食',
            path: '/circles/circle/:'
        },
        {
            avatar: '/images/header/banner/6.png',
            name: '明小说',
            path: '/circles/circle/:'
        },
        {
            avatar: '/images/header/banner/6.png',
            name: '美食',
            path: '/circles/circle/:'
        },
        {
            avatar: '/images/header/banner/6.png',
            name: '明小说',
            path: '/circles/circle/:'
        }
    ]
    const seeks = [
        {
            seekAvatar: '/images/header/banner/1.png',
            seekName: '天堂鸡汤',
            description: '治愈一切不开心',
        },
        {
            seekAvatar: '/images/header/banner/1.png',
            seekName: '天堂鸡汤',
            description: '治愈一切不开心',
        },
        {
            seekAvatar: '/images/header/banner/1.png',
            seekName: '天堂鸡汤',
            description: '治愈一切不开心',
        },
        {
            seekAvatar: '/images/header/banner/1.png',
            seekName: '天堂鸡汤',
            description: '治愈一切不开心',
        },
        {
            seekAvatar: '/images/header/banner/1.png',
            seekName: '天堂鸡汤',
            description: '治愈一切不开心',
        },
        {
            seekAvatar: '/images/header/banner/1.png',
            seekName: '天堂鸡汤',
            description: '治愈一切不开心',
        },
        {
            seekAvatar: '/images/header/banner/1.png',
            seekName: '天堂鸡汤',
            description: '治愈一切不开心',
        },
        {
            seekAvatar: '/images/header/banner/1.png',
            seekName: '天堂鸡汤',
            description: '治愈一切不开心',
        },
        {
            seekAvatar: '/images/header/banner/1.png',
            seekName: '天堂鸡汤',
            description: '治愈一切不开心',
        },
        {
            seekAvatar: '/images/header/banner/1.png',
            seekName: '天堂鸡汤',
            description: '治愈一切不开心',
        },
        {
            seekAvatar: '/images/header/banner/1.png',
            seekName: '天堂鸡汤',
            description: '治愈一切不开心',
        }
    ]
    return (
        <div className="circles-recommend">
            <div className="hot-topics-wrapper">
                <div className="hot-title">话题热议<ChatDots className='hot-icon' /></div>
                <div className="hot-topics"> 
                    {
                        hotSearchData.map((searchItem, index) =>
                            <div className='hot-topic' key={index}>
                                <span className={`
                                rank 
                                    ${searchItem.rank === 0 ? 'rank-1' :
                                    searchItem.rank === 1 ? 'rank-2' :
                                    searchItem.rank === 2 ? 'rank-3' :
                                    ''}
                                `}><span>{searchItem.rank+1}</span></span>
                                <span className="word">{searchItem.word}</span>
                                {searchItem.label_name&&(
                                    <div className="label" style={{ backgroundImage: `URL(${searchItem.icon})` }}></div>)
                                }
                                <span className="num">{searchItem.num }</span>
                            </div>
                        )
                    }
                </div>
            </div>
            <div className="frequently-visited-circles">
                <SingleRowDisplayBar title='我常去的圈子' cards={visitedCircles} Icon={Visted} />
            </div>
            <div className="followed-circles">
                <SingleRowDisplayBar title='我关注的圈子' cards={followedCircles} Icon={Group} />
            </div>
            <div className="seek-circles">
                <div className="seek-top">
                    <div className="title">发现圈子</div>
                    <Globel className='icon'/>
                    <button className="to">
                        <ChevronRightIcon className='right-icon'/>
                    </button>
                </div>
                <div className="seeks">
                    {
                        seeks.map((seek, index) =>
                            <div className='seek'>
                                <img src={seek.seekAvatar} alt="" className="seek-avatar" />
                                <div className="seek-info">
                                    <button className="seek-name">{seek.seekName}</button>
                                    <div className="seek-description">{seek.description }</div>
                                </div>
                                <button className="to">
                                <ChevronRightIcon className='right-icon'/>
                                </button>
                        </div>)
                    }
                </div>
            </div>
        </div>
)
}    
export default CirclesRecommend