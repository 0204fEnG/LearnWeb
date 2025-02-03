import { useNavigate } from 'react-router-dom';
import './PostCard.scss'
const PostCard = () => {
      const navigate = useNavigate()

  const handleTagClick = (path) => {
    // 使用 navigate 导航到新路由
    navigate(path);
  };
    const postItem = {
        userAvator: '/images/header/banner/小小陈.png',
        userName: 'feng',
        publishTime: '1小时前',
        title: '赤壁赋',
        tags: [
            {
                name: '苏轼',
                index:0
        },
            {
                name: '宋词',
                index:10
            }
        ],
        content: '壬戌之秋，七月既望，苏子与客泛舟游于赤壁之下。清风徐来，水波不兴。举酒属客，诵明月之诗，歌窈窕之章。少焉，月出于东山之上，徘徊于斗牛之间。白露横江，水光接天。纵一苇之所如，凌万顷之茫然。浩浩乎如冯虚御风，而不知其所止；飘飘乎如遗世独立，羽化而登仙。',
        imgs: [
            '/images/header/banner/1(1).jpeg',
            '/images/header/banner/1(2).jpeg',
            '/images/header/banner/1(3).jpeg',
            '/images/header/banner/1(4).jpeg',
            '/images/header/banner/1(5).jpeg',
            '/images/header/banner/1(6).jpeg',
            '/images/header/banner/1(7).jpeg',
            '/images/header/banner/1(8).jpeg',
        ]
    }
    return <article className="post-card">
        <div className="post-header">
            <img className="user-avator" src={postItem.userAvator } />
            <div className="user-info">
                <div className="user-name">{postItem.userName }</div>
                <div className="publish-time">{postItem.publishTime }</div>
            </div>
        </div>
        <div className="post-title">{postItem.title }</div>
        <div className="post-content">{postItem.content}</div>
        <div className={['post-img', postItem.imgs.length === 1 ? 'first' : ''].join(' ')}>
            {postItem.imgs.map((img,index)=>
                <img className={['img', postItem.imgs.length === 1 ? 'first' : ''].join(' ')} key={ index} src={img} alt="帖子的图片" />)
            }
        </div>
        <div className="post-circle">

        </div>
        <div className="popular-comment"></div>
        <div className="post-interactive-data"></div>
    </article>
}
export default PostCard