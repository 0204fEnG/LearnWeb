import './BannerImage.scss'
import { useEffect, useRef, useState } from 'react'
const BannerImage = ({ images }) => {
  const [imageIndex, setImageIndex] = useState(1)
  const length=images.length
  // const [indexScroll,setIndexScroll]=useState()
  const imgDiv = useRef()
  const allImages = [images[images.length - 1], ...images, images[0]]
  const autoScrollInterval = useRef(null);
  const currentIndex = useRef(imageIndex)
  useEffect(() => {
    currentIndex.current=imageIndex
  },[imageIndex])
  const handleClickScroll = (index) => {
    const currentScrollWidth = imgDiv.current.offsetWidth
    imgDiv.current.scrollTo({
      left: currentScrollWidth * index,
      behavior:'smooth'
    })
  }
    const startAutoScroll = () => {
      autoScrollInterval.current = setInterval(() => {
      handleClickScroll(currentIndex.current+1)
    }, 3000); // 3 秒自动滚动
  };
    const resetAutoScroll = () => {
    clearInterval(autoScrollInterval.current); // 清除之前的定时器
    startAutoScroll(); // 重新启动自动滚动
  };
  useEffect(() => {
    const initScroll = () => {
      const currentScrollWidth = imgDiv.current.offsetWidth
          imgDiv.current.scrollTo({
            left: currentScrollWidth * imageIndex,
            behavior:'instant'
    })
    }
    const handleImagesScroll = () => {
      resetAutoScroll()
    }
    const handleImagesScrollEnd = () => {
      const currentScrollWidth = imgDiv.current.offsetWidth
      const currentScrollLeft = imgDiv.current.scrollLeft
      const currentIndex = Math.round(currentScrollLeft / currentScrollWidth)
      if (currentIndex === 0) {
        imgDiv.current.scrollTo({
          left: currentScrollWidth * length,
            behavior: 'instant'
        })
      }
      else if (currentIndex === length + 1) {
        imgDiv.current.scrollTo({
          left: currentScrollWidth,
          behavior:'instant'
        })
      }
      else {
        setImageIndex(currentIndex)
      }
    }
    initScroll()
    if (imgDiv.current) {
      imgDiv.current.addEventListener('scrollsnapchange', handleImagesScrollEnd)
      imgDiv.current.addEventListener('scroll', handleImagesScroll)
    }

    startAutoScroll();
    return () => {
      if (imgDiv.current) {
        imgDiv.current.removeEventListener('scrollsnapchange', handleImagesScrollEnd)
        imgDiv.current.removeEventListener('scroll', handleImagesScroll)
      } 
      clearInterval(autoScrollInterval.current)
    }
    // window.addEventListener('resize',initScroll)
  },[])
  return (
    <div className="banner-image-container" style={{ backgroundImage: `url(${allImages[imageIndex]})` }} >
      <div className="blur" ref={imgDiv}>
        {allImages.map((image, index) => <img src={image} key={index} className='banner-image' alt='轮播图'></img>)}
      </div>
      <div className="changeIndex prev" onClick={()=>handleClickScroll(imageIndex-1)}>&lt;</div>
      <div className="changeIndex next" onClick={() =>handleClickScroll(imageIndex+1)}>&gt;</div>
      <div className="imageIndexs">
        {images.map((_,index) => <div className={['imageIndex', index + 1 === imageIndex? 'current' : ''].join(' ')} key={index} onClick={()=>handleClickScroll(index+1)}></div>)}
      </div>
    </div>
  )
}
export default BannerImage