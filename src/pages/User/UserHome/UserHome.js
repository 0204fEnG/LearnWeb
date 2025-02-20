import './UserHome.scss'
import SingleRowDisplayBar from '../../../components/HorizontalDisplayBar/SingleRowDisplayBar/SingleRowDisplayBar'
import ChatDots from '../../../components/icons/ChatDots'
import PeopleHeart from '../../../components/icons/PeopleHeart'
import { useEffect } from 'react'
const UserHome = () => {
    useEffect(() => {
        console.log('userhome!')
    },[])
    const circles = [
        {
            avatar:'/images/header/banner/4.png',
            name: '清唱本',
            path:'/circles/circle/:'
        },
        {
            avatar:'/images/header/banner/5.png',
            name: '民小说',
            path:'/circles/circle/:'
        },
        {
            avatar:'/images/header/banner/6.png',
            name: '明小说',
            path:'/circles/circle/:'
        },
        {
            avatar:'/images/header/banner/3.png',
            name: '元曲',
            path:'/circles/circle/:'
        },
        {
            avatar:'/images/header/banner/4.png',
            name: '清唱本',
            path:'/circles/circle/:'
        },
        {
            avatar:'/images/header/banner/5.png',
            name: '民小说',
            path:'/circles/circle/:'
        },
        {
            avatar:'/images/header/banner/6.png',
            name: '明小说',
            path:'/circles/circle/:'
        },
    ]
    const peoples = [
        {
            avatar:'/images/header/banner/6.png',
            name: '司马光',
            path:'/user/:/user-home'
        }
    ]
    return <div className="user-home-container">
        <SingleRowDisplayBar title='他关注的人' cards={peoples} Icon={PeopleHeart}/>
        <SingleRowDisplayBar title='他关注的圈子' cards={circles} Icon={ChatDots}/>
    </div>
}
export default UserHome