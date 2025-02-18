import './MineHome.scss'
import SingleRowDisplayBar from '../../../components/HorizontalDisplayBar/SingleRowDisplayBar/SingleRowDisplayBar'
import ChatDots from '../../../components/icons/ChatDots'
const MineHome = () => {
    const temp = [
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
    return <div className="mine-home-container">
        <SingleRowDisplayBar title='我关注的圈子' cards={temp} Icon={ChatDots} />
    </div>
}
export default MineHome