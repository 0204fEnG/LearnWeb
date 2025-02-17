import { Suspense, useEffect, useRef, useState,useMemo } from 'react'
import './SectionCardContainer.scss'
import Loading from '../../Loading/Loading'
const SectionCardContainer = ({ abs=false,sectionsIsActive, sectionsFunc, onSectionActive, targetIndex, onSectionScroll }) => {

   const [loadedComponents, setLoadedComponents] = useState([]);
  const sections = useMemo(() => {
  return sectionsFunc.map((sectionfunc, index) => {
    const isLoaded = loadedComponents[index];
    return (
      <div className='section' key={index}>
        {isLoaded ? sectionfunc : (sectionsIsActive[index] ? sectionfunc : <Loading />)}
      </div>
    );
  });
}, [sectionsFunc, sectionsIsActive, loadedComponents]);
useEffect(() => {
  setLoadedComponents(prev => {
    const newLoaded = [...prev];
    sectionsIsActive.forEach((isActive, index) => {
      if (isActive && !prev[index]) {
        newLoaded[index] = true;
      }
    });
    return newLoaded;
  });
}, [sectionsIsActive]); // 依赖项仅需 sectionsIsActive

//       const [sections, setSections] = useState([])
//     const [loadedComponents, setLoadedComponents] = useState([]); // 记录已加载的组件
// useEffect(() => {
//     const newSections = sectionsFunc.map((sectionfunc, index) => {
//       // 如果组件已经加载过，直接使用已加载的组件
//       if (loadedComponents[index]) {
//         return (
//           <div className='section' key={index}>
//             {sectionfunc}
//           </div>
//         );
//       }
//       // 如果组件未加载过，根据 sectionsIsActive 决定是否加载
//       return (
//         <div className='section' key={index}>
//           {sectionsIsActive[index] ? sectionfunc : <Loading />}
//         </div>
//       );
//     });
//     setSections(newSections);
//   }, [sectionsIsActive, sectionsFunc, loadedComponents]);

//   useEffect(() => {
//     // 当某个选项卡的内容加载完成后，标记为已加载
//     const newLoadedComponents = [...loadedComponents];
//     sectionsIsActive.forEach((isActive, index) => {
//       if (isActive && !loadedComponents[index]) {
//         newLoadedComponents[index] = true;
//       }
//     });
//     setLoadedComponents(newLoadedComponents);
//     }, [sectionsIsActive]);
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
            const currentIndex = Math.round(SectionCardContainerScrollLeft / SectionCardContainerWidth)
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
        <div className='section-card-container' ref={divRef}>
            {sections}
        </div>
    )
}
export default SectionCardContainer