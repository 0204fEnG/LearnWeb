import { useEffect, useRef } from 'react'
import './SectionCardContainer.scss'
const SectionCardContainer = ({sectionsIsActive,sectionsFunc,onSectionSure,targetIndex,onSectionScroll}) => {
    const sections = sectionsFunc.map((sectionfunc, index) =>(
        <div className={['section',sectionsIsActive[index]===false?'section--noActive':''].join(' ')} key={index}>{sectionsIsActive[index]===true?sectionfunc():''}</div>
        ))
    const divRef=useRef(null)
    useEffect(() => {
        const targetIndexChange = () => {
        const SectionCardContainerWidth = divRef.current.offsetWidth
        divRef.current.scrollTo({
            left: SectionCardContainerWidth * targetIndex,
            behavior:'smooth'
        })
        }
        targetIndexChange()
    }, [targetIndex])
    useEffect(() => {
        const sectionScrollEnd = () => {
            const SectionCardContainerWidth = divRef.current.offsetWidth
            const SectionCardContainerScrollLeft = divRef.current.scrollLeft
            const currentIndex=Math.round(SectionCardContainerScrollLeft/SectionCardContainerWidth)
            onSectionSure(currentIndex)
        }
        const sectionScrollChange = () => {
            const SectionCardContainerWidth = divRef.current.offsetWidth
            const SectionCardContainerScrollLeft = divRef.current.scrollLeft
            const currentSrollPercent = SectionCardContainerScrollLeft / SectionCardContainerWidth
            onSectionScroll(currentSrollPercent)
        }
        divRef.current.addEventListener('scrollsnapchange',sectionScrollEnd)
        divRef.current.addEventListener('scroll', sectionScrollChange)
    },[])
    return (
        <div className="section-card-container" ref={divRef}>
            {sections}
        </div>
    )
}
export default SectionCardContainer