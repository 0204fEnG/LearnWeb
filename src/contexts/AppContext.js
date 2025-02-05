// contexts/ThemeContext.js
import { createContext, useState} from 'react';

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
    const [leftIsShow, setLeftIsShow] = useState(false)
    const [bottomIsShow, setBottomIsShow] = useState(true)
    const handleLeftIsShowClick = () => {
    setLeftIsShow(leftIsShow===true?false:true)
  }
  return (
    <AppContext.Provider value={{leftIsShow,bottomIsShow,handleLeftIsShowClick,setBottomIsShow}}>
      {children}
    </AppContext.Provider>
  );
};