import React, { useEffect, useRef } from "react";
import './Searchbar.scss'
import { useAppContext} from "../../App";
const Searchbar = () => {
  const { setBottomIsShow } = useAppContext()
  const inputRef=useRef(null)
 // 判断设备类型
  useEffect(() => {
  const judgeDeviceType = function () {
  let ua = window.navigator.userAgent.toLocaleLowerCase();
  let isIOS = /iphone|ipad|ipod/.test(ua);
  let isAndroid = /android/.test(ua);

  return {
    isIOS: isIOS,
    isAndroid: isAndroid
  }
}()
const iosKeybordShow=function () {
  setBottomIsShow(false)
  if (inputRef) {
    inputRef.current.value = 'IOS 键盘弹起啦！'
  }
      // IOS 键盘弹起后操作
    }
  const iosKeybordHidden = () => {
  setBottomIsShow(true)
  if (inputRef) {
    inputRef.current.value = 'IOS 键盘收起啦！'
  }
      // IOS 键盘收起后操作
}
const androidKeybordShow=function () {
  setBottomIsShow(false)
  if (inputRef) {
    inputRef.current.value = 'Android 键盘弹起啦！'
  }
      // IOS 键盘弹起后操作
}
const androidKeybordHidden=function () {
  setBottomIsShow(true)
  if (inputRef) {
    inputRef.current.value = 'Android 键盘收起啦！'
  }
      // IOS 键盘弹起后操作
}

    // const handleAndroidKeybordResize = function () {
    //   let timer = null
    //   var originHeight = document.documentElement.clientHeight || document.body.clientHeight;
    //   return () => {
    //     if (timer) {
    //       clearTimeout(timer)
    //     }
    //     timer = setTimeout(() => {
    //       var resizeHeight = document.documentElement.clientHeight || document.body.clientHeight;
    //       if (originHeight < resizeHeight) {
    //         setBottomIsShow(true)
    //         if (inputRef) {
    //           inputRef.current.value = 'Android 键盘收起啦！'
    //         }
    //         // Android 键盘收起后操作
    //       }
    //       else {
    //         setBottomIsShow(false)
    //         if (inputRef) {
    //           inputRef.current.value = 'Android 键盘弹起啦！'
    //         }
    //       }
    //       originHeight = resizeHeight;
    //     }
    //       , 100)
    //   }
    // }()
// 监听输入框的软键盘弹起和收起事件
function listenKeybord() {
  if (judgeDeviceType.isIOS) {
    // IOS 键盘弹起：IOS 和 Android 输入框获取焦点键盘弹起
    if (inputRef.current) {
      inputRef.current.addEventListener('focus', iosKeybordShow, false)
      // IOS 键盘收起：IOS 点击输入框以外区域或点击收起按钮，输入框都会失去焦点，键盘会收起，
      inputRef.current.addEventListener('blur', iosKeybordHidden, false)
    }
  }
  // Andriod 键盘收起：Andriod 键盘弹起或收起页面高度会发生变化，以此为依据获知键盘收起
  if (judgeDeviceType.isAndroid) {
    if (inputRef.current) {
      inputRef.current.addEventListener('focus',androidKeybordShow,false)
      inputRef.current.addEventListener('blur',androidKeybordHidden,false)
      // window.addEventListener('resize', handleAndroidKeybordResize, false)
    }
  }
}
    listenKeybord()
    return () => {
      if (inputRef.current) {
        inputRef.current.removeEventListener('focus', iosKeybordShow, false)
        inputRef.current.removeEventListener('blur', iosKeybordHidden, false)
        // window.removeEventListener('resize', handleAndroidKeybordResize, false)
        inputRef.current.removeEventListener('focus', androidKeybordShow, false)
        inputRef.current.removeEventListener('blur',androidKeybordHidden,false)
      }
    }
},[])

  return (
    <div className='searchbar-container'>
      <div className="searchbar-box">
        <input className="search-input"ref={inputRef}/>
        </div>
      <div className="searchbar-button">
        <button className="search-button">
          🔍︎
        </button>
        </div>
      </div>
  );
};
export default Searchbar;