import './SliderButton.scss'
const SliderButton = ({ buttonItems, currentIndex }) => {
    console.log('sliderbutton!')
    return (
        <div className="slider-button-container">
            {
                buttonItems.map((item, index) =>
                    <button className='button-item' key={index} onClick={item.handleFunc}>
                        <div className={`button-name${index===currentIndex?' button--active':''}`}>
                            {item.name}
                    </div>
                    </button>)
            }
            <div className="slider-bar" style={{transform:`translateX(${currentIndex*100}%)`}}></div>
        </div>
    )
}
export default SliderButton