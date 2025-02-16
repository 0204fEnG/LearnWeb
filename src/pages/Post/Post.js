import {  Link, useNavigate, useParams } from 'react-router-dom'
import './Post.scss'
import { useEffect, useState } from 'react'
import ChevronLeftIcon from '../../components/icons/ChevronLeftIcon'
import NineGrid from '../../components/NineGrid/NineGrid'
const Post = () => {
    const nav = useNavigate()
    const [isLeave,setIsLeave]=useState(false)
    const { postId } = useParams()
    const handleMaskClick = (event) => {
        // if (event.target !== event.currentTarget) {
        //     return
        // }
        // event.stopPropagation();
        setIsLeave(true)
        setTimeout(() => {
            setIsLeave(false)
            nav(-1)
        }, 300)
    }
    const imgs = [
        '/images/header/banner/1.png',
        '/images/header/banner/2.png',
        '/images/header/banner/3.png',
        '/images/header/banner/4.png',
        '/images/header/banner/5.png',
        '/images/header/banner/6.png',
        '/images/header/banner/5.png',
        '/images/header/banner/4.png',
        '/images/header/banner/3.png',
    ]
    return (
        <div className={`post-mask ${isLeave ? 'leave' : ''}`} onClick={handleMaskClick}>        
            <div onClick={ (event) => {
               event.stopPropagation(); // 阻止事件冒泡
           }} className={`post-container ${isLeave ? 'leave' : ''}`}>                
                <div className="header">
                    <div onClick={handleMaskClick} className='back-container'>
                        <ChevronLeftIcon className='back' /> 
                    </div>
                    <div className="author-info">
                        <Link to="/home" className="img-container">
                        <img src="/images/header/banner/4.png" alt="用户头像" className="avatar" />
                        </Link>
                        <Link to='/home'className='name-container'>
                            <span className="name">宇智波鼬</span>
                        </Link>
                    </div>
                       <div className="follow-container">
                            <button className='follow'>
                                关注
                            </button>
                        </div>
                </div>
                <div className="content-container">
                    <div className="article">
        &emsp;&emsp;鼬是一个天才，他富有智慧，理智，善于思考，7岁时就被三代火影猿飞日斩称赞能以火影的角度思考问题，因此鼬从小的思想也没有被宇智波一族和村子的界限所束缚。有些沉默寡言，不善交流，因此鼬的童年时期在同龄人和甚至比自己稍微大一点儿的人中，鼬的思想和成熟也使他显得有些孤立，由于4岁时经历了第三次忍界大战的惨烈，所以对于战争非常厌恶，他为了更加了解这个世界，不断的渴望力量和知识。
有自我牺牲精神，受止水的影响，认为忍者是为了实现目标而忍辱负重的人，因此他自愿成为了罪人而灭族，背负了整个木叶和佐助的仇恨与黑暗。鼬是个非常热爱村子的人，即使这个村子有着无数黑暗和矛盾，他也依旧以自己身为木叶的忍者而感到骄傲。为了村子和弟弟的安危，鼬选择灭族后隐藏真相成为S级叛忍并加入“晓”组织。
身为间谍的时期，一度对自己的选择感到深深的迷茫和矛盾，但还是认清了自我，了解到了一个人的力量有限，认为想要依靠自己去解决一切的自己是失败的，而要和伙伴们共同努力，做好自己应做的事情，他的这份思想深深的感染了一度想要靠自己拯救一切的鸣人，也正因如此，面对对自己的身份感到迷茫的药师兜，鼬伸出了援手拯救了他的心。
鼬深爱着自己的弟弟佐助，在佐助小时候的记忆中，鼬一直是个温柔、优秀、深爱自己的好哥哥，鼬为了守护村子而选择了灭族，但是只有佐助，鼬无论如何也无法下手，对佐助表示“无论你今后的路怎么走，我都一直深爱着你”。                        
                    </div>
                    <div className="img-container">
                        <NineGrid images={imgs}/>
                    </div>
                </div>
                <div className="comments-container">
                    <div className="comments-top">共3条评论</div>
                    <div className="comment-container">
                        <div className="comment-header">
                            <Link className="avatar-container"><img src='/images/header/banner/4.png' alt="" className="avatar" /></Link>
                            <div className="info-container">
                                <div className="name-container">
                                <Link className="name">SLZ</Link>
                                <div className="level">Lv4</div>
                                <div className="author">作者</div>                                    
                                </div>
                                <div className="time"><span className="publish-time">1月29日</span></div>
                            </div>
                        </div>
                        <div className="comment">我觉得一般，卵豪那天说完我去玩了玩，金银角强度是有的而且不低，但是和霸体的适配性没想象中的高，主要是这个b银角一个劈会打断自己的霸体那天两把都是因为这个情况白给了，我还是觉得带起手秘卷雷电 来去 散 真空波或者反手秘卷烈焰蛋 鬼灯笼都挺不错的，我自己在玩散和雷电金银角目前还在取舍，还是觉得给他带霸体有点不稳霸体紫狗普通人外星人活二或者三代雷四代雷都挺不错的，就是这个霸体金银角玩起来不舒服，玩肯定可以玩但是说最强霸体位不敢顺从</div>
                        <ul className="tools">
                            <li className="tool">点赞</li>
                            <li className="tool">反对</li>
                            <li className="tool">转发</li>
                            <li className="more">:</li>
                        </ul>
                        <div className="reply">
                            <div className="pre-reply-container">
                            <div className="pre-reply">
                                <span className='user-name'>24feng</span>
                                :首先，汤汁豪的金银角熟练度绝对不算特别高，污垢那一波葫芦之后七星剑的连招就可以看出来，七星剑丢了至少一半的伤害。其次是模拟器神力问题，绳子换人加七星剑确实可以吃掉满级霸体，但是这是建立在模拟器无延迟的情况下，手机稍微卡顿一下破不掉霸体不说包露大后摇的。最后是最后一波金银角赌大招，已经算是放手一搏了，对面没算准金银角大招时间，一般来说金银角大招后摇不算难抓的，纯狗运
                            </div>
                            <div className="pre-reply">
                                <i className='user-name'>24yd21ng</i>
                                不是下一个无限火力，他本来就是无限火力。。。但是金银角的机动性差，不像金氏能随随便便破通灵所以要是说最强霸体位还是说过头了的（拿霸体还是强的）
你要说真能算最强霸体位不是应该是紫狗长十郎么[笑哭]
                                </div>
                            </div>
                            <div className="reply-count">共 133 条回复&gt;</div>
                        </div>
                    </div>
                </div>
            </div>            
        </div>
    )
}
export default Post