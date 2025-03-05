import SliderButton from '../Button/SliderButton/SliderButton'
import './SortTop.scss'
const SortTop = ({stickyTop,sortIndex,sortItems}) => {
return (
        <div className={`sort-top-wrapper ${stickyTop}`}>
            排序规则
            <SliderButton buttonItems={sortItems} currentIndex={sortIndex} />
        </div>
)
}
export default SortTop