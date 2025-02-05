import { useEffect,useState } from 'react';
import { useLocation } from 'react-router-dom';
// 自定义钩子，用于监听路由变化
function useAnimationClassName() {
    const routes = {
    "/":0,
    "/circles":0,
    "/circles/circle":1,
    "/shorts":0,
    "/mine":0
    }
    function filterPath(path) {
    // 定义允许保留的内容
    const allowedWords = ["circles", "circle", "shorts", "mine"];
    // 将路径按斜杠分割成数组
    const parts = path.split('/');
    // 用于存储处理后符合要求的部分
    const filteredParts = [];

    for (let i = 0; i < parts.length; i++) {
        const part = parts[i];
        // 如果当前部分为空字符串或者在允许保留的内容列表中，则保留
        if (part === '' || allowedWords.includes(part)) {
            filteredParts.push(part);
        }
    }
    // 将处理后的数组用斜杠拼接回字符串
    return filteredParts.join('/');
    }
    const location=useLocation()
    const [oldPath, setOldPath] = useState(null);
    const [animationClass, setAnimationClass] = useState('page-left');
    useEffect(() => {
        if (oldPath === null) {
            // 首次加载时，保存当前路径
            const currentPath = filterPath(location.pathname)
            setOldPath(currentPath);
        } else {
            // 路由变化时，先保存旧路径，再更新旧路径为当前路径
            const currentPath = filterPath(location.pathname)
            if (routes[currentPath] > routes[oldPath]) {
                console.log('新:'+routes[currentPath]+' 旧:'+routes[oldPath])
                setAnimationClass('page-right')
            }
            else if(routes[currentPath] < routes[oldPath]){
                console.log('新:'+routes[currentPath]+' 旧:'+routes[oldPath])
                setAnimationClass('page-left')
            }
            setOldPath(currentPath);
        }
    }, [location]);
  return animationClass
}
export default useAnimationClassName