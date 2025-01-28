import './BannerImage.scss'
const BannerImage = ({ targetImage=0,images}) => {
  const allImages = [images[images.length - 1], ...images, images[0]]
  return (
    <div className="banner-image-container" style={{ backgroundImage: `url(${images[targetImage]})` }} >
      <div className="blur"></div>
      { allImages.map((image, index) => <img src={image} key={index} className='banner-image' alt='轮播图'></img>)}
    </div>
  )
}
export default BannerImage