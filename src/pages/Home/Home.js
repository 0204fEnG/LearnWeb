import './Home.scss'
const Home = () => {
    const homeNavs = [
        {
            name: '推荐'
        },
        {
            name:'关注'
        }
    ]
      const bannerDate = [
    '/images/header/banner/unlock_wallpaper_1.jpg',
    '/images/header/banner/unlock_wallpaper_2.jpg',
    '/images/header/banner/unlock_wallpaper_3.jpg',
    '/images/header/banner/unlock_wallpaper_4.jpg',
    '/images/header/banner/unlock_wallpaper_5.jpg',
    '/images/header/banner/unlock_wallpaper_6.jpg',
    '/images/header/banner/unlock_wallpaper_7.jpg',
    '/images/header/banner/unlock_wallpaper_8.jpg'
    ]
    const imgs = bannerDate.map((img, index) => (<img key={index} src={img} style={{width:'230px',height:'auto',objectFit:'contain'}} />))
    return <div className="app-home">
        <header className='app-home__header'>
            Home！
        </header>
        <main className='app-home__main'>
            {imgs}
        </main>
    </div>
}
export default Home