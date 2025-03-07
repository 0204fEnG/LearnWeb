import { useState } from 'react'
import './Posts.scss'
import LayoutContainer from '../../../components/ContentCard/LayoutContainer/LayoutContainer'
import { Outlet } from 'react-router-dom'
import SortTop from '../../../components/SortTop/SortTop'
const CirclePosts = () => {
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
       const [postItems,setPostItems] = useState([    
        {
        postId:1,
        userAvator: '/images/header/banner/小小陈.png',
        userName: 'feng',
        publishTime: '1小时前',
        title: '赤壁赋',
        tags: [
            {
                name: '苏轼',
                index:0
        },
            {
                name: '宋词',
                index:10
            }
        ],
        content: '壬戌之秋，七月既望，苏子与客泛舟游于赤壁之下。清风徐来，水波不兴。举酒属客，诵明月之诗，歌窈窕之章。少焉，月出于东山之上，徘徊于斗牛之间。白露横江，水光接天。纵一苇之所如，凌万顷之茫然。浩浩乎如冯虚御风，而不知其所止；飘飘乎如遗世独立，羽化而登仙。',
            imgs: [
            'http://192.168.188.8:3100/uploads/avatar/user/1.png'
        ],
        circle: {
            avator: '/images/header/banner/小小陈.png',
            name:'苏东坡'
        },
        popularComment: {
            like: 2025,
            name: 'slz',
            comment:'一健三连了hhh'
        },
        interactiveData: {
            like: 200,
            reply: 64,
            retweet:20
        }
        },     
        {
        postId:2,
        userAvator: '/images/header/banner/小小陈.png',
        userName: 'feng',
        publishTime: '1小时前',
        title: '赤壁赋',
        tags: [
            {
                name: '苏轼',
                index:0
        },
            {
                name: '宋词',
                index:10
            }
        ],
        content: '壬戌之秋，七月既望，苏子与客泛舟游于赤壁之下。清风徐来，水波不兴。举酒属客，诵明月之诗，歌窈窕之章。少焉，月出于东山之上，徘徊于斗牛之间。白露横江，水光接天。纵一苇之所如，凌万顷之茫然。浩浩乎如冯虚御风，而不知其所止；飘飘乎如遗世独立，羽化而登仙。',
            imgs: [
            'http://192.168.188.8:3100/uploads/avatar/user/1.png',
            'http://192.168.188.8:3100/uploads/avatar/user/2.png',
            'http://192.168.188.8:3100/uploads/avatar/user/6.png'
        ],
        circle: {
            avator: '/images/header/banner/小小陈.png',
            name:'苏东坡'
        },
        popularComment: {
            like: 2025,
            name: 'slz',
            comment:'一健三连了hhh'
        },
        interactiveData: {
            like: 200,
            reply: 64,
            retweet:20
        }
        },     
        {
        postId:3,
        userAvator: '/images/header/banner/小小陈.png',
        userName: 'feng',
        publishTime: '1小时前',
        title: '赤壁赋',
        tags: [
            {
                name: '苏轼',
                index:0
        },
            {
                name: '宋词',
                index:10
            }
        ],
        content: '壬戌之秋，七月既望，苏子与客泛舟游于赤壁之下。清风徐来，水波不兴。举酒属客，诵明月之诗，歌窈窕之章。少焉，月出于东山之上，徘徊于斗牛之间。白露横江，水光接天。纵一苇之所如，凌万顷之茫然。浩浩乎如冯虚御风，而不知其所止；飘飘乎如遗世独立，羽化而登仙。',
            imgs: [
            'http://192.168.188.8:3100/uploads/avatar/user/1.png',
            'http://192.168.188.8:3100/uploads/avatar/user/3.png',
            'http://192.168.188.8:3100/uploads/avatar/user/4.png',
            'http://192.168.188.8:3100/uploads/avatar/user/5.png',
            'http://192.168.188.8:3100/uploads/avatar/user/6.png'
        ],
        circle: {
            avator: '/images/header/banner/小小陈.png',
            name:'苏东坡'
        },
        popularComment: {
            like: 2025,
            name: 'slz',
            comment:'一健三连了hhh'
        },
        interactiveData: {
            like: 200,
            reply: 64,
            retweet:20
        }
        },     
        {
        postId:4,
        userAvator: '/images/header/banner/小小陈.png',
        userName: 'feng',
        publishTime: '1小时前',
        title: '赤壁赋',
        tags: [
            {
                name: '苏轼',
                index:0
        },
            {
                name: '宋词',
                index:10
            }
        ],
        content: '壬戌之秋，七月既望，苏子与客泛舟游于赤壁之下。清风徐来，水波不兴。举酒属客，诵明月之诗，歌窈窕之章。少焉，月出于东山之上，徘徊于斗牛之间。白露横江，水光接天。纵一苇之所如，凌万顷之茫然。浩浩乎如冯虚御风，而不知其所止；飘飘乎如遗世独立，羽化而登仙。',
            imgs: [
            'http://192.168.188.8:3100/uploads/avatar/user/1.png',
            'http://192.168.188.8:3100/uploads/avatar/user/6.png'
        ],
        circle: {
            avator: '/images/header/banner/小小陈.png',
            name:'苏东坡'
        },
        popularComment: {
            like: 2025,
            name: 'slz',
            comment:'一健三连了hhh'
        },
        interactiveData: {
            like: 200,
            reply: 64,
            retweet:20
        }
        },     
        {
        postId:5,
        userAvator: '/images/header/banner/小小陈.png',
        userName: 'feng',
        publishTime: '1小时前',
        title: '赤壁赋',
        tags: [
            {
                name: '苏轼',
                index:0
        },
            {
                name: '宋词',
                index:10
            }
        ],
        content: '壬戌之秋，七月既望，苏子与客泛舟游于赤壁之下。清风徐来，水波不兴。举酒属客，诵明月之诗，歌窈窕之章。少焉，月出于东山之上，徘徊于斗牛之间。白露横江，水光接天。纵一苇之所如，凌万顷之茫然。浩浩乎如冯虚御风，而不知其所止；飘飘乎如遗世独立，羽化而登仙。',
            imgs: [
            'http://192.168.188.8:3100/uploads/avatar/user/3.png',
            'http://192.168.188.8:3100/uploads/avatar/user/4.png',
            'http://192.168.188.8:3100/uploads/avatar/user/5.png',
            'http://192.168.188.8:3100/uploads/avatar/user/6.png'
        ],
        circle: {
            avator: '/images/header/banner/小小陈.png',
            name:'苏东坡'
        },
        popularComment: {
            like: 2025,
            name: 'slz',
            comment:'一健三连了hhh'
        },
        interactiveData: {
            like: 200,
            reply: 64,
            retweet:20
        }
        },     
        {
        postId:6,
        userAvator: '/images/header/banner/小小陈.png',
        userName: 'feng',
        publishTime: '1小时前',
        title: '赤壁赋',
        tags: [
            {
                name: '苏轼',
                index:0
        },
            {
                name: '宋词',
                index:10
            }
        ],
        content: '壬戌之秋，七月既望，苏子与客泛舟游于赤壁之下。清风徐来，水波不兴。举酒属客，诵明月之诗，歌窈窕之章。少焉，月出于东山之上，徘徊于斗牛之间。白露横江，水光接天。纵一苇之所如，凌万顷之茫然。浩浩乎如冯虚御风，而不知其所止；飘飘乎如遗世独立，羽化而登仙。',
            imgs: [
            'http://192.168.188.8:3100/uploads/avatar/user/1.png',
            'http://192.168.188.8:3100/uploads/avatar/user/2.png',
            'http://192.168.188.8:3100/uploads/avatar/user/3.png',
            'http://192.168.188.8:3100/uploads/avatar/user/4.png',
            'http://192.168.188.8:3100/uploads/avatar/user/5.png',
            'http://192.168.188.8:3100/uploads/avatar/user/6.png'
        ],
        circle: {
            avator: '/images/header/banner/小小陈.png',
            name:'苏东坡'
        },
        popularComment: {
            like: 2025,
            name: 'slz',
            comment:'一健三连了hhh'
        },
        interactiveData: {
            like: 200,
            reply: 64,
            retweet:20
        }
        },     
    ])
    return (<div className="circle-posts-container">
        <SortTop sortIndex={sortIndex} sortItems={sortItems} stickyTop='post-sticky-top'/>
        <LayoutContainer items={postItems} />
        <Outlet/>
    </div>)
}
export default CirclePosts