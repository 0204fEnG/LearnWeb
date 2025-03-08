import {useState,useRef,useEffect } from 'react'
import './FuncNavbar.scss'
const FuncNavbar = ({ handleItems}) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [currentWidth, setCurrentWidth] = useState(0)
  const [currentLeft, setCurrentLeft] = useState(0)
  const firstRef=useRef()
  useEffect(() => {
    if (firstRef.current.querySelector('.func-navbar__nav--active')) {
      setTimeout(()=>{setCurrentWidth(firstRef.current.querySelector('.func-navbar__nav--active').offsetWidth)},0)
    }
  },[])
    return (
        <nav className="func-navbar" ref={firstRef}>
        {
          handleItems.map((item, index) => (
            <button key={index}
              className={[currentIndex===index?'func-navbar__nav--active':'','func-navbar__nav'].join(' ')}
              onClick={
                (e) => {
                  e.stopPropagation()
                  setCurrentIndex(index)
                  setCurrentWidth(e.target?.offsetWidth)
                  setCurrentLeft(e.target?.offsetLeft)
                  e.target.scrollIntoView({ behavior: "smooth", inline: "center" });
                  item.handleFunc()
                }
              }
              >
              {item.name}
            </button>)
            )
        }
        <div className="scrollbar" style={{width:`${currentWidth}px`,transform:`translateX(${currentLeft}px)`}}></div>
        </nav>
    )
}
export default FuncNavbar