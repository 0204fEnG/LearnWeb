import { useEffect, useRef, useState } from 'react'
import './SectionCardContainer.scss'
import Loading from '../../Loading/Loading'
const SectionCardContainer = ({ sectionsIsActive, sectionsFunc, onSectionActive, targetIndex, onSectionScroll }) => {
    const [sections,setSections]=useState([])
    useEffect(() => {
        const newSections = sectionsFunc.map((sectionfunc, index) => (
            <div className='section' key={index}>{sectionsIsActive[index] === true ? sectionfunc() : <Loading />}</div>
        ))
        setSections(newSections)
    },[sectionsIsActive,sectionsFunc])
    const divRef = useRef(null)
    useEffect(() => {
        const targetIndexChange = () => {
            if (targetIndex.isScroll) {
                const SectionCardContainerWidth = divRef.current.offsetWidth
                divRef.current.scrollTo({
                    left: SectionCardContainerWidth * targetIndex.index,
                    behavior: 'smooth'
                })
            }
        }
        targetIndexChange()
    }, [targetIndex])
    useEffect(() => {       
        const sectionScrollSnapChange = () => {
            const SectionCardContainerWidth = divRef.current.offsetWidth
            const SectionCardContainerScrollLeft = divRef.current.scrollLeft
            const currentIndex=Math.round(SectionCardContainerScrollLeft/SectionCardContainerWidth)
            onSectionActive({ index: currentIndex, isScroll: false })
        }
        const sectionScrollEnd = () => {
            const SectionCardContainerWidth = divRef.current.offsetWidth
            const SectionCardContainerScrollLeft = divRef.current.scrollLeft
            const currentIndex = Math.round(SectionCardContainerScrollLeft / SectionCardContainerWidth)
            onSectionActive({ index: currentIndex, isScroll: false })
        }
        const sectionScrollCommonEnd = function () {
            let timer = null
            return () => {
                clearTimeout(timer)
                timer = setTimeout(() => {
                    const SectionCardContainerWidth = divRef.current.offsetWidth
                    const SectionCardContainerScrollLeft = divRef.current.scrollLeft
                    const currentIndex = Math.floor(SectionCardContainerScrollLeft / SectionCardContainerWidth)
                    onSectionActive({ index: currentIndex, isScroll: false })
                },200)
            }
        }()
        const sectionScrolling = () => {
            const SectionCardContainerWidth = divRef.current.offsetWidth
            const SectionCardContainerScrollLeft = divRef.current.scrollLeft
            const currentSrollPercent = SectionCardContainerScrollLeft / SectionCardContainerWidth
            onSectionScroll(currentSrollPercent)
        }
        switch (true) {
        case 'onscrollsnapchange' in divRef.current:
          // 浏览器支持 scrollsnap，所以我们可以使用 scrollsnapchange 事件
          divRef.current.addEventListener('scrollsnapchange', sectionScrollSnapChange);
          break;
        case 'onscrollend' in divRef.current:
          // 浏览器支持 scrollend 事件
          divRef.current.addEventListener('scrollend', sectionScrollEnd);
          break;
        default:
          // 使用通用的 scroll 事件
          divRef.current.addEventListener('scroll', sectionScrollCommonEnd);
          break;
        }
        divRef.current.addEventListener('scroll', sectionScrolling)
        return () => {
            if (divRef.current) {
                divRef.current.removeEventListener('scrollsnapchange', sectionScrollSnapChange)
                divRef.current.removeEventListener('scrollend', sectionScrollEnd)
                divRef.current.removeEventListener('scroll',sectionScrollCommonEnd)
                divRef.current.removeEventListener('scroll', sectionScrolling)
            }
        }
    },[])
    return (
        <div className="section-card-container" ref={divRef}>
            {sections}
        </div>
    )
}
export default SectionCardContainer