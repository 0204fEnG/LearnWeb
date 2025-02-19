import Banner from '../../../components/Banner/Banner'
import './HomeRecommend.scss'
import SingleLineDisplayBar from'../../../components/HorizontalDisplayBar/SingleLineDisplayBar/SingleLineDisplayBar.js'
import LayoutContainer from '../../../components/ContentCard/LayoutContainer/LayoutContainer.js'
import { Outlet } from 'react-router-dom'
import { useEffect } from 'react'
const HomeRecommend = () => {
    // const videoUrl = '/videos/ban.mp4'
    const imgUrl = [
        "/images/header/banner/1.png",
        "/images/header/banner/2.png",
        "/images/header/banner/3.png",
        "/images/header/banner/4.png",
        "/images/header/banner/5.png",
        "/images/header/banner/6.png",
    ]
    const postItems = [    
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
            'http://192.168.178.8:3100/uploads/avatar/user/1.png'
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
            'http://192.168.178.8:3100/uploads/avatar/user/1.png',
            'http://192.168.178.8:3100/uploads/avatar/user/2.png',
            'http://192.168.178.8:3100/uploads/avatar/user/6.png'
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
            'http://192.168.178.8:3100/uploads/avatar/user/1.png',
            'http://192.168.178.8:3100/uploads/avatar/user/3.png',
            'http://192.168.178.8:3100/uploads/avatar/user/4.png',
            'http://192.168.178.8:3100/uploads/avatar/user/5.png',
            'http://192.168.178.8:3100/uploads/avatar/user/6.png'
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
            'http://192.168.178.8:3100/uploads/avatar/user/1.png',
            'http://192.168.178.8:3100/uploads/avatar/user/6.png'
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
            'http://192.168.178.8:3100/uploads/avatar/user/3.png',
            'http://192.168.178.8:3100/uploads/avatar/user/4.png',
            'http://192.168.178.8:3100/uploads/avatar/user/5.png',
            'http://192.168.178.8:3100/uploads/avatar/user/6.png'
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
            'http://192.168.178.8:3100/uploads/avatar/user/1.png',
            'http://192.168.178.8:3100/uploads/avatar/user/2.png',
            'http://192.168.178.8:3100/uploads/avatar/user/3.png',
            'http://192.168.178.8:3100/uploads/avatar/user/4.png',
            'http://192.168.178.8:3100/uploads/avatar/user/5.png',
            'http://192.168.178.8:3100/uploads/avatar/user/6.png'
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
    ]
           const displayItems = [
        {
            name:'a'
        },
        {
            name:'b'
        },
        {
            name:'c'
        },
        {
            name:'d'
        },
        {
            name:'e'
        },
        {
            name:'f'
        },
        {
            name:'g'
        },
        {
            name:'h'
        }
    ]
    return (
        <div className="home-recommend">
            <header className="home-recommend__header">
                <Banner bannerType={2} bannerData={imgUrl} />
                <SingleLineDisplayBar displayItems={displayItems} />
            </header>
            <main className="home-recommend__main" >
                <LayoutContainer items={postItems} />
            </main>
            <Outlet/>
        </div>
    )
}
export default HomeRecommend