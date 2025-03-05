import { useState } from 'react'
import ShortsBase from '../../../components/ShortsBase/ShortsBase.js'
import './ShortsRecommend.scss'
const ShortsRecommend = () => {
        const [videoItems, setVideoItems] = useState([
        {
            videoId:28212,
            userAvatar: '/images/header/banner/1.png',
            userName:'user1',
            title: '视频1',
            videoUrl: '/videos/3.mp4',
            description: '测试专用简介1测试专用简介1测试专用简介1测试专用简介1测试专用简介1测试专用简介1测试专用简介1测试专用简介1测试专用简介1测试专用简介1测试专用简介1测试专用简介1测试专用简介1测试专用简介1测试专用简介1测试专用简介1测试专用简介1测试专用简介1测试专用简介1测试专用简介1测试专用简介1测试专用简介1测试专用简介1测试专用简介1测试专用简介1测试专用简介1测试专用简介1测试专用简介1测试专用简介1测试专用简介1测试专用简介1',
            publishTime: '5天前 18:57',
            likes: 450,
            comments: 30210,
            favorites: 2230,
            circleAvatar: '/images/header/banner/1.png',
            circleName:'火影忍者'
        },
        {
            videoId:2103,
            userAvatar: '/images/header/banner/2.png',
            userName:'user2',
            title: '视频2',
            videoUrl: '/videos/7.mp4',
            description: '测试专用简介2测试专用简介1测试专用简介1测试专用简介1测试专用简介1测试专用简介1测试专用简介1测试专用简介1测试专用简介1测试专用简介1测试专用简介1测试专用简介1测试专用简介1测试专用简介1',
            publishTime: '2024年10月24日 09:05',
            likes: 415,
            comments: 3210,
            favorites: 230,
            circleAvatar: '/images/header/banner/1.png',
            circleName:'火影忍者'
        },
        {
            videoId:29221,
            userAvatar: '/images/header/banner/3.png',
            userName:'user3',
            title: '视频3',
            videoUrl: '/videos/6.mp4',
            description: '测试专用简介3',
            publishTime: '2024年12月24日 18:05',
            likes: 145,
            comments: 3002,
            favorites: 230,
            circleAvatar: '/images/header/banner/1.png',
            circleName:'火影忍者'
        },
        {
            videoId:2154,
            userAvatar: '/images/header/banner/4.png',
            userName:'user4',
            title: '视频4',
            videoUrl: '/videos/5.mp4',
            description: '测试专用简介4',
            publishTime: '1月1日 23:05',
            likes: 235,
            comments: 3040,
            favorites: 2330,
            circleAvatar: '/images/header/banner/1.png',
            circleName:'火影忍者'
        },
        {
            videoId:292,
            userAvatar: '/images/header/banner/5.png',
            userName:'user5',
            title: '视频5',
            videoUrl: '/videos/4.mp4',
            description: '测试专用简介5',
            publishTime: '2024年5月1日 14:05',
            likes: 2145,
            comments: 3001,
            favorites: 2320,
            circleAvatar: '/images/header/banner/1.png',
            circleName:'火影忍者'
        },
        {
            videoId:210093,
            userAvatar: '/images/header/banner/6.png',
            userName:'user6',
            title: '视频6',
            videoUrl: '/videos/3.mp4',
            description: '简介好啊好啊11111111111傻傻3231 11',
            publishTime: '2月3日 00:05',
            likes: 4215,
            comments: 31200,
            favorites: 2310,
            circleAvatar: '/images/header/banner/1.png',
            circleName:'火影忍者'
        },
        {
            videoId:2113,
            userAvatar: '/images/header/banner/5.png',
            userName:'user7',
            title: '视频7',
            videoUrl: '/videos/2.mp4',
            description: '测试专用简介7',
            publishTime: '3月1日 14:05',
            likes: 4785,
            comments: 3070,
            favorites: 23560,
            circleAvatar: '/images/header/banner/1.png',
            circleName:'火影忍者'
        },
        {
            videoId:2131313,
            userAvatar: '/images/header/banner/4.png',
            userName:'user8',
            title: '视频8',
            videoUrl: '/videos/1.mp4',
            description: '测试专用简介8',
            publishTime: '3天前 13:56',
            likes: 425,
            comments: 12300,
            favorites: 5230,
            circleAvatar: '/images/header/banner/1.png',
            circleName:'火影忍者'
        },
    ])
    return (
        <div className="shorts-recommend">
            <ShortsBase videoItems={videoItems}/>
        </div>
    )
}
export default ShortsRecommend