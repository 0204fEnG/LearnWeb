import './SectionNavbar.scss'
const SectionNavbar = ({ sectionsName,targetIndex }) => {
    const navs = sectionsName.map((sectionName, index) => (<li className={['section-navbar__nav',targetIndex===index?'section-navbar__nav--active':''].join(' ')}>{sectionName}</li>))
    return (
        <nav className="section-navbar">
            {navs}
        </nav>
    )
}
export default SectionNavbar