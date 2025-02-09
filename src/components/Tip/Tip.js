import './Tip.scss';
import { useEffect, useState } from 'react';

const Tip = ({ message, color }) => {
    // 使用 useState 钩子创建 backgroundColor 状态变量
     const rgbToRgba=(rgb, alpha = 0.7) =>{
       // 匹配 rgb 值
       const match = rgb.match(/\d+/g);
       if (match) {
         const [r, g, b] = match;
         return `rgba(${r}, ${g}, ${b}, ${alpha})`;
       }
       return rgb;
     }
    const [showClass,setShowClass]=useState('enter')
    const backgroundColor = rgbToRgba(color)
    // 在组件挂载时计算背景颜色// 依赖项数组中包含 color，当 color 变化时重新计算背景颜色
    useEffect(() => {
        setTimeout(() => {
          setShowClass('exit')  
        },1400)
    }, [])
    return <div className={`tip ${showClass}`} style={{ border: `2px solid ${color}`, backgroundColor: backgroundColor }}>
            {message}
        </div>
};

export default Tip;
