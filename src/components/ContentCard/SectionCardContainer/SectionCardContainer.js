import { useEffect, useRef, useState } from 'react'
import './SectionCardContainer.scss'
import Loading from '../../Loading/Loading'
const SectionCardContainer = ({sectionsIsActive,sectionsFunc,onSectionActive,targetIndex,onSectionScroll}) => {
    const sections = sectionsFunc.map((sectionfunc, index) =>(
        <div className='section' key={index}>{sectionsIsActive[index]===true?sectionfunc():<Loading/>}</div>
        ))
    const divRef = useRef(null)
    // const [text, setText] = useState('无')
    // const [text2, setText2] = useState('false')
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
            const currentIndex=Math.floor(SectionCardContainerScrollLeft/SectionCardContainerWidth)
            onSectionActive({index:currentIndex,isScroll:false})
            // setText('snap')
            // setText2(`width:${SectionCardContainerWidth}left:${SectionCardContainerScrollLeft}index:${currentIndex}`)
        }
        const sectionScrollEnd = () => {
            const SectionCardContainerWidth = divRef.current.offsetWidth
            const SectionCardContainerScrollLeft = divRef.current.scrollLeft
            const currentIndex = Math.round(SectionCardContainerScrollLeft / SectionCardContainerWidth)
            onSectionActive({index:currentIndex,isScroll:false})
            // setText('end')
            // setText2(`width:${SectionCardContainerWidth}left:${SectionCardContainerScrollLeft}index:${currentIndex}`)
        }
        const sectionScrollCommonEnd = function () {
            let timer = null
            return () => {
                clearTimeout(timer)
                timer = setTimeout(() => {
                    const SectionCardContainerWidth = divRef.current.offsetWidth
                    const SectionCardContainerScrollLeft = divRef.current.scrollLeft
                    const currentIndex = Math.floor(SectionCardContainerScrollLeft / SectionCardContainerWidth)
                    onSectionActive({index:currentIndex,isScroll:false})
                    // setText('scroll')
                    // setText2(`width:${SectionCardContainerWidth}left:${SectionCardContainerScrollLeft}index:${currentIndex}`)
                },200)
            }
        }()
        const sectionScrolling = () => {
            const SectionCardContainerWidth = divRef.current.offsetWidth
            const SectionCardContainerScrollLeft = divRef.current.scrollLeft
            const currentSrollPercent = SectionCardContainerScrollLeft / SectionCardContainerWidth
            onSectionScroll(currentSrollPercent)
        }
        if ('onscrollsnapchange' in divRef.current) {
           // 浏览器支持 scrollsnap，所以我们可以使用 scrollsnapchange 事件
            divRef.current.addEventListener('scrollsnapchange',sectionScrollSnapChange)
        }
        else if ('onscrollend' in divRef.current) {
             divRef.current.addEventListener('scrollend',sectionScrollEnd)
        }
        else {
            divRef.current.addEventListener('scroll',sectionScrollCommonEnd)
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
            {/* <div className={['test', text].join(' ')}>{text}{text2 }</div> */}
            {sections}
        </div>
    )
}
export default SectionCardContainer