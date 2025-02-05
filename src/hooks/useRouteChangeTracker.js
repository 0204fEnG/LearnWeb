import { useEffect,useState } from 'react';
import { useHistory } from 'react-router-dom';

// 自定义钩子，用于监听路由变化
function useRouteChangeTracker() {
  const history = useHistory();
  const [navigationType, setNavigationType] = useState(''); // 初始状态

  useEffect(() => {
    // 监听路由变化
    const unlisten = history.listen((location, action) => {
      setNavigationType(action);
    });

    // 清理监听器
    return () => {
      unlisten();
    };
  }, [history]);

  return navigationType;
}
export default useRouteChangeTracker