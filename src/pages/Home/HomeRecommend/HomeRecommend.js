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
    const items = [
        {
            id: 1,
            name: 'a',
            src:'/images/header/banner/1 (7).jpeg'
        },
        {
            id: 2,
            name: 'b',
            src:'/images/header/banner/1 (1).jpeg'
        },
        {
            id: 3,
            name: 'c',
            src:'/images/header/banner/1 (2).jpeg'
        },
        {
            id: 4,
            name: 'd',
            src:'/images/header/banner/1 (3).jpeg'
        },
        {
            id: 5,
            name: 'e',
            src:'/images/header/banner/1 (4).jpeg'
        },
        {
            id: 6,
            name:'f',
            src:'/images/header/banner/1 (5).jpeg'
        },
        {
            id: 7,
            name: 'g',
            src:'/images/header/banner/1 (6).jpeg'
            
        },
        {
            id: 8,
           name: 'h',
           src:'/images/header/banner/1 (8).jpeg'
        },
        {
            id: 9,
           name: 'i',
           src:'/images/header/banner/1 (9).jpeg'
        }
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
                <LayoutContainer items={items} />
            </main>
        </div>
    )
}
export default HomeRecommend