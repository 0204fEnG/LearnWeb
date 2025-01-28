import './BannerImage.scss'
import { useEffect, useRef, useState } from 'react'
const BannerImage = ({ images }) => {
  const [imageIndex, setImageIndex] = useState(1)
  const length=images.length
  // const [indexScroll,setIndexScroll]=useState()
  const imgDiv = useRef()
  const allImages = [images[images.length - 1], ...images, images[0]]
  const handleClickScroll = (index) => {
    const currentScrollWidth = imgDiv.current.offsetWidth
    imgDiv.current.scrollTo({
      left: currentScrollWidth * index,
      behavior:'smooth'
    })
  }
  useEffect(() => {
    const initScroll = () => {
      const currentScrollWidth = imgDiv.current.offsetWidth
          imgDiv.current.scrollTo({
            left: currentScrollWidth * imageIndex,
            behavior:'instant'
    })
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
    imgDiv.current.addEventListener('scrollsnapchange', handleImagesScrollEnd)
    window.addEventListener('resize',initScroll)
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