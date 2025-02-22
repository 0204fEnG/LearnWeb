
import { createContext, useContext, useState, useEffect } from 'react';
import chroma from 'chroma-js';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [themeType, setThemeType] = useState(() => {
    return localStorage.getItem('themeType') || 'light';
  });
  const [customColor, setCustomColor] = useState(() => {
    return localStorage.getItem('customColor') || null;
  });

  const updateCustomColor = (color) => {
    const colorObj = chroma(color);
    const rgbColor = colorObj.css();
    setCustomColor(rgbColor);
  };
  const recoveryColor=() => {
    setCustomColor(null)
  }
  useEffect(() => {
    const applyTheme = () => {
      if (customColor) {
        document.body.className = `${themeType}-theme`;
        const color = chroma(customColor);
        
        document.body.style.setProperty('--active-color', color.css());
        document.body.style.setProperty('--active-color--opa', color.alpha(0.5).css());
        document.body.style.setProperty('--active-color--light', color.brighten(1.5).css());
      } else {
        document.body.style.removeProperty('--active-color');
        document.body.style.removeProperty('--active-color--opa');
        document.body.style.removeProperty('--active-color--light');
        document.body.className = `${themeType}-theme`;
      }
    };

    applyTheme();
    localStorage.setItem('themeType', themeType);
    if (customColor) {
      localStorage.setItem('customColor', customColor);
    }
    else {
      localStorage.removeItem('customColor')
    }
  }, [themeType, customColor]);

  return (
    <ThemeContext.Provider value={{ 
      themeType, 
      setThemeType,
      customColor,
      updateCustomColor,
      recoveryColor
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);