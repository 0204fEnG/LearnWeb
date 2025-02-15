import { useEffect, useRef, useState } from 'react'
import Banner from '../../../components/Banner/Banner'
import './HomeRecommend.scss'
import SingleLineDisplayBar from'../../../components/HorizontalDisplayBar/SingleLineDisplayBar/SingleLineDisplayBar.js'
import LayoutContainer from '../../../components/ContentCard/LayoutContainer/LayoutContainer.js'
import Loading from '../../../components/Loading/Loading.js'
const HomeRecommend = () => {
    const videoUrl = '/videos/ban.mp4'
    const imgUrl = [
"/images/header/banner/春霖翠意.jpg",
"/images/header/banner/迭翠千里.jpg",
"/images/header/banner/冬夜小镇.jpg",
"/images/header/banner/星蕴蓝.jpg",
"/images/header/banner/诗野千里.jpg",
"/images/header/banner/星蕴金.jpg",
    ]
    const postItems = [
        {
        postId:1789323,
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
            'images/header/banner/1(1).jpeg',
            'images/header/banner/1(2).jpeg',
            'images/header/banner/1(3).jpeg',
            'images/header/banner/1(4).jpeg',
            'images/header/banner/1(5).jpeg',
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
        postId:1112323,
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
            'images/header/banner/1(1).jpeg',
            'images/header/banner/1(2).jpeg',
            'images/header/banner/1(3).jpeg',
            'images/header/banner/1(4).jpeg',
            'images/header/banner/1(5).jpeg',
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
        postId:132753443,
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
            'images/header/banner/1(1).jpeg',
            'images/header/banner/1(2).jpeg',
            'images/header/banner/1(3).jpeg',
            'images/header/banner/1(4).jpeg',
            'images/header/banner/1(5).jpeg',
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
        postId:1230923,
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
            'images/header/banner/1(1).jpeg',
            'images/header/banner/1(2).jpeg',
            'images/header/banner/1(3).jpeg',
            'images/header/banner/1(4).jpeg',
            'images/header/banner/1(5).jpeg',
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
        postId:132333,
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
            'images/header/banner/1(1).jpeg',
            'images/header/banner/1(2).jpeg',
            'images/header/banner/1(3).jpeg',
            'images/header/banner/1(4).jpeg',
            'images/header/banner/1(5).jpeg',
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
        postId:6551323,
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
            'images/header/banner/1(1).jpeg',
            'images/header/banner/1(2).jpeg',
            'images/header/banner/1(3).jpeg',
            'images/header/banner/1(4).jpeg',
            'images/header/banner/1(5).jpeg',
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
        postId:671323,
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
            'images/header/banner/1(1).jpeg',
            'images/header/banner/1(2).jpeg',
            'images/header/banner/1(3).jpeg',
            'images/header/banner/1(4).jpeg',
            'images/header/banner/1(5).jpeg',
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
        postId:124323,
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
            'images/header/banner/1(1).jpeg',
            'images/header/banner/1(2).jpeg',
            'images/header/banner/1(3).jpeg',
            'images/header/banner/1(4).jpeg',
            'images/header/banner/1(5).jpeg',
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
        postId:1320093,
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
            'images/header/banner/1(1).jpeg',
            'images/header/banner/1(2).jpeg',
            'images/header/banner/1(3).jpeg',
            'images/header/banner/1(4).jpeg',
            'images/header/banner/1(5).jpeg',
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
        postId:132363,
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
            'images/header/banner/1(1).jpeg',
            'images/header/banner/1(2).jpeg',
            'images/header/banner/1(3).jpeg',
            'images/header/banner/1(4).jpeg',
            'images/header/banner/1(5).jpeg',
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
        postId:16493,
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
            'images/header/banner/1(1).jpeg',
            'images/header/banner/1(2).jpeg',
            'images/header/banner/1(3).jpeg',
            'images/header/banner/1(4).jpeg',
            'images/header/banner/1(5).jpeg',
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
        postId:9333,
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
            'images/header/banner/1(1).jpeg',
            'images/header/banner/1(2).jpeg',
            'images/header/banner/1(3).jpeg',
            'images/header/banner/1(4).jpeg',
            'images/header/banner/1(5).jpeg',
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
        postId:17653,
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
            'images/header/banner/1(1).jpeg',
            'images/header/banner/1(2).jpeg',
            'images/header/banner/1(3).jpeg',
            'images/header/banner/1(4).jpeg',
            'images/header/banner/1(5).jpeg',
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
        postId:232,
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
            'images/header/banner/1(1).jpeg',
            'images/header/banner/1(2).jpeg',
            'images/header/banner/1(3).jpeg',
            'images/header/banner/1(4).jpeg',
            'images/header/banner/1(5).jpeg',
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
        </div>
    )
}
export default HomeRecommend