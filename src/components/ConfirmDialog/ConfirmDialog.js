import './ConfirmDialog.scss'
const ConfirmDialog = ({message,onCancel, onConfirm }) => {
    return <div className='mask'>
    <div className="confirm-dialog">
        <p className='message'>{message}</p>
        <button className='execute cancel' onClick={onCancel}>取消</button>
        <button className='execute confirm' onClick={onConfirm}>确定</button>
        </div>
    </div>
    
}
export default ConfirmDialog