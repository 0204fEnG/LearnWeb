import { useState ,useRef,useEffect,useCallback} from 'react'
import ShortsBase from '../../../components/ShortsBase/ShortsBase.js'
import './ShortsRecommend.scss'
import { getShortList } from '../../../api/short.js'
const ShortsRecommend = () => {
    const [videoItems, setVideoItems] = useState([])
      const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(false)
      // 使用Ref解决闭包问题
  const pageRef = useRef(page)
  const loadingRef = useRef(loading)
  const hasMoreRef = useRef(hasMore)

  // 观察器相关Ref
  const sentinelRef = useRef(null)
  const observerRef = useRef(null)

  // 同步Ref与State
  useEffect(() => {
    pageRef.current = page
    loadingRef.current = loading
    hasMoreRef.current = hasMore
  }, [page, loading, hasMore])
    
     // 获取短视频数据
  const fetchShortVideos = useCallback(async () => {
    if (loadingRef.current || !hasMoreRef.current) return

    setLoading(true)
    try {
      const data  = await getShortList({
        page: pageRef.current,
        limit: 10,
        sortBy: 'likes',
        sortOrder: -1
      })

      // 更新视频列表
      setVideoItems(prev => 
        pageRef.current === 1 ? data.shorts : [...prev, ...data.shorts]
      )

      // 更新是否有更多数据
      setHasMore(data.shorts.length === 10)

      // 更新页码
      setPage(prev => prev + 1)
    } catch (error) {
      console.error('获取短视频列表失败:', error)
    } finally {
      setLoading(false)
    }
  }, [])
      // 初始加载数据
  useEffect(() => {
    fetchShortVideos()
  }, [fetchShortVideos])
    return (
        <div className="shorts-recommend">
            <ShortsBase videoItems={videoItems}/>
        </div>
    )
}
export default ShortsRecommend