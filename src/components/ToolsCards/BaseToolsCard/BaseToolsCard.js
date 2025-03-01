import './BaseToolsCard.scss'
const BaseToolsCard = ({ toolItems }) => {
    console.log('baseToolscard!')
    return (
        <div className="base-setting-container">
            {
                toolItems.map((tool, index) =>
                    <button className='setting' key={index} onClick={tool.handleFunc ? tool.handleFunc : ()=>{}}>
                        {tool.name}
                        {tool.component&&tool.component}
                    </button>
                )
            }
        </div>
    )
}
export default BaseToolsCard