import './ConfirmDialog.scss'
const ConfirmDialog = ({message,type='',onCancel,onConfirm }) => {
    return(
    <div className='confirm-mask'>
    <div className="confirm-dialog">
         <p className={`confirm-message ${type}`}>{message}</p>
         <div className="execute-container">
        <button className='execute' onClick={onCancel}>取消</button>
        <button className='execute' onClick={onConfirm}>确定</button>
         </div>             
        </div>
    </div>)
    
}
export default ConfirmDialog