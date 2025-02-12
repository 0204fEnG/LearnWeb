import { useEffect, useRef } from 'react'
import './SectionNavbar.scss'
const SectionNavbar = ({sectionsName,onNavClick,scrollInstance}) => {
    const navs = sectionsName.map((sectionName, index) => (<li key={ index} className={['section-navbar__nav', Math.abs(scrollInstance - index)<=0.5? 'section-navbar__nav--active' : ''].join(' ')} onClick={() => onNavClick({index:index,isScroll:true})}>{sectionName}</li>))
    const scrollbar=useRef(null)
    useEffect(() => {
        scrollbar.current.style.transform=`translateX(${100*scrollInstance}%)`
    },[scrollInstance])
    return (
        <nav className="section-navbar">
            {navs}
            <div ref={ scrollbar} className="scrollbar"></div>
        </nav>
    )
}
export default SectionNavbar