import './MineHome.scss'
import SingleRowDisplayBar from '../../../components/HorizontalDisplayBar/SingleRowDisplayBar/SingleRowDisplayBar'
import ChatDots from '../../../components/icons/ChatDots'
import PeopleHeart from '../../../components/icons/PeopleHeart'
const MineHome = () => {
    const circles = [
        {
            avatar:'/images/header/banner/6.png',
            name: '明小说',
            path:'/circles/circle/:'
        },
        {
            avatar:'/images/header/banner/6.png',
            name: '说文解字',
            path:'/circles/circle/:'
        },
        {
            avatar:'/images/header/banner/6.png',
            name: 'tansa',
            path:'/circles/circle/:'
        },
        {
            avatar:'/images/header/banner/6.png',
            name: '美食',
            path:'/circles/circle/:'
        },
        {
            avatar:'/images/header/banner/6.png',
            name: '明小说',
            path:'/circles/circle/:'
        },
        {
            avatar:'/images/header/banner/6.png',
            name: '美食',
            path:'/circles/circle/:'
        },
        {
            avatar:'/images/header/banner/6.png',
            name: '明小说',
            path:'/circles/circle/:'
        },
        {
            avatar:'/images/header/banner/6.png',
            name: '美食',
            path:'/circles/circle/:'
        },
        {
            avatar:'/images/header/banner/6.png',
            name: '明小说',
            path:'/circles/circle/:'
        },
        {
            avatar:'/images/header/banner/6.png',
            name: '美食',
            path:'/circles/circle/:'
        },
        {
            avatar:'/images/header/banner/6.png',
            name: '明小说',
            path:'/circles/circle/:'
        },
        {
            avatar:'/images/header/banner/6.png',
            name: '美食',
            path:'/circles/circle/:'
        },
        {
            avatar:'/images/header/banner/6.png',
            name: '明小说',
            path:'/circles/circle/:'
        },
        {
            avatar:'/images/header/banner/6.png',
            name: '美食',
            path:'/circles/circle/:'
        },
        {
            avatar:'/images/header/banner/6.png',
            name: '明小说',
            path:'/circles/circle/:'
        }
    ]
    const peoples = [
        {
            avatar:'/images/header/banner/1.png',
            name: '苏轼',
            path:'/user/:/user-home'
        },
    ]
    return <div className="mine-home-container">
        <SingleRowDisplayBar title='我关注的人' cards={peoples} Icon={PeopleHeart}/>
        <SingleRowDisplayBar title='我关注的圈子' cards={circles} Icon={ChatDots}/>
    </div>
}
export default MineHome