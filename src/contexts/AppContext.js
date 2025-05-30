import { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [leftIsShow, setLeftIsShow] = useState(false);
  const [bottomIsShow, setBottomIsShow] = useState(true);
  const handleLeftIsShowClick = () => {
    setLeftIsShow(!leftIsShow); // 简化布尔值切换逻辑
  };
  return (
    <AppContext.Provider value={{ leftIsShow, bottomIsShow, handleLeftIsShowClick, setBottomIsShow}}>
      {children}
    </AppContext.Provider>
  );
};
