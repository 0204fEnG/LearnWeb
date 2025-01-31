import { useState } from 'react'
import Banner from '../../../components/Banner/Banner'
import './HomeRecommend.scss'
import { NavLink } from 'react-router-dom'
import SingleLineDisplayBar from'../../../components/HorizontalDisplayBar/SingleLineDisplayBar/SingleLineDisplayBar.js'
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
    const [columns, setColumns] = useState([]);
    return (
        <div className="home-recommend">
            <header className="home-recommend__header">
                <Banner bannerType={2} bannerData={imgUrl} />
                <SingleLineDisplayBar displayItems={displayItems } />
            </header>
            <main className="home-recommend__main">
                
            </main>
        </div>
    )
}
export default HomeRecommend