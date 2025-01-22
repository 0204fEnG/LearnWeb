import './SectionCardContainer.scss'
const SectionCardContainer = ({ sectionsFunc }) => {
    const sections=sectionsFunc.map((sectionfunc)=>sectionfunc())
    return (
        <div className="section-card-container">
            {sections}
        </div>
    )
}
export default SectionCardContainer