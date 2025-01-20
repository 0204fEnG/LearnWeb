import Navbar from '../../components/Navbar/Navbar'
import Searchbar from '../../components/Searchbar/Searchbar'
import './Home.scss'
import { Outlet } from 'react-router-dom'
const Home = () => {
    const navs = [
        {
            name: '推荐'
        },
        {
            name:'关注'
        }
    ]
    return <div className="app-home">
        <header className='app-home__header'>
            <Searchbar/>
            {/* <Navbar navLinks={navLinks} /> */}
        </header>
        <main className='app-home__main'>
        </main>
    </div>
}
export default Home