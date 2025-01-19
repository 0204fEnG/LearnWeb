import Navbar from '../../components/Navbar/Navbar'
import './Home.scss'
import { Outlet } from 'react-router-dom'
const Home = () => {
    const navLinks = [
        {
            to: 'recommend',
            name: '推荐'
        },
        {
            to: 'concern',
            name:'关注'
        }
    ]
    return <div className="app-home">
        <header className='app-home__header'>
            <Navbar navLinks={navLinks} />
        </header>
        <main className='app-home__main'>
            <Outlet/>
        </main>
    </div>
}
export default Home