import './Tip.scss';
import { useEffect, useState } from 'react';

const Tip = ({ message, status }) => {
    // 使用 useState 钩子创建 backgroundColor 状态变量
    const [showClass,setShowClass]=useState('enter')
    // 在组件挂载时计算背景颜色// 依赖项数组中包含 color，当 color 变化时重新计算背景颜色
    useEffect(() => {
        setTimeout(() => {
          setShowClass('exit')  
        },1400)
    }, [])
    return <div className={`tip ${showClass} ${status}`} >
            {message}
        </div>
};

export default Tip;
