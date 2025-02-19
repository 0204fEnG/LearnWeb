import './UserHome.scss'
import SingleRowDisplayBar from '../../../components/HorizontalDisplayBar/SingleRowDisplayBar/SingleRowDisplayBar'
import ChatDots from '../../../components/icons/ChatDots'
import PeopleHeart from '../../../components/icons/PeopleHeart'
const UserHome = () => {
    const circles = [
        {
            avatar:'/images/header/banner/1.png',
            name: '唐诗',
            path:'/circles/circle/'
        },
        {
            avatar:'/images/header/banner/2.png',
            name: '宋词',
            path:'/circles/circle/'
        },
        {
            avatar:'/images/header/banner/3.png',
            name: '元曲',
            path:'/circles/circle/'
        },
        {
            avatar:'/images/header/banner/4.png',
            name: '清唱本',
            path:'/circles/circle/'
        },
        {
            avatar:'/images/header/banner/5.png',
            name: '民小说',
            path:'/circles/circle/'
        },
        {
            avatar:'/images/header/banner/6.png',
            name: '明小说',
            path:'/circles/circle/'
        },
        {
            avatar:'/images/header/banner/3.png',
            name: '元曲',
            path:'/circles/circle/'
        },
        {
            avatar:'/images/header/banner/4.png',
            name: '清唱本',
            path:'/circles/circle/'
        },
        {
            avatar:'/images/header/banner/5.png',
            name: '民小说',
            path:'/circles/circle/'
        },
        {
            avatar:'/images/header/banner/6.png',
            name: '明小说',
            path:'/circles/circle/'
        },
    ]
    const peoples = [
{
            avatar:'/images/header/banner/1.png',
            name: '苏轼',
            path:'/user/'
        },
        {
            avatar:'/images/header/banner/2.png',
            name: '王安石',
            path:'/user/'
        },
        {
            avatar:'/images/header/banner/3.png',
            name: '曾巩',
            path:'/user/'
        },
        {
            avatar:'/images/header/banner/4.png',
            name: '李清照',
            path:'/user/'
        },
        {
            avatar:'/images/header/banner/5.png',
            name: '苏辙',
            path:'/user/'
        },
        {
            avatar:'/images/header/banner/6.png',
            name: '苏老泉',
            path:'/user/'
        },
        {
            avatar:'/images/header/banner/3.png',
            name: '杨慎',
            path:'/user/'
        },
        {
            avatar:'/images/header/banner/4.png',
            name: '柳永',
            path:'/user/'
        },
        {
            avatar:'/images/header/banner/5.png',
            name: '贺知章',
            path:'/user/'
        },
        {
            avatar:'/images/header/banner/6.png',
            name: '司马光',
            path:'/user/'
        },
        {
            avatar:'/images/header/banner/3.png',
            name: '杨慎',
            path:'/user/'
        },
        {
            avatar:'/images/header/banner/4.png',
            name: '柳永',
            path:'/user/'
        },
        {
            avatar:'/images/header/banner/5.png',
            name: '贺知章',
            path:'/user/'
        },
        {
            avatar:'/images/header/banner/6.png',
            name: '司马光',
            path:'/user/'
        }
    ]
    return <div className="user-home-container">
        <SingleRowDisplayBar title='他关注的人' cards={peoples} Icon={PeopleHeart}/>
        <SingleRowDisplayBar title='他关注的圈子' cards={circles} Icon={ChatDots}/>
    </div>
}
export default UserHome