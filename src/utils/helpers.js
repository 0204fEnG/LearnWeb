import { useEffect, useState } from "react"
// 时间格式化
export const formatTime = (seconds) => {
  if (!seconds) return '00:00'
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = Math.floor(seconds % 60)
  return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`
}

// 全屏事件监听
export const useFullscreen = () => {
  const [isFullscreen, setIsFullscreen] = useState(false)

  useEffect(() => {
    const handler = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }
    
    document.addEventListener('fullscreenchange', handler)
    return () => document.removeEventListener('fullscreenchange', handler)
  }, [])

  return isFullscreen
}
// helpers.js 新增错误处理
export const safePlay = async (videoElement) => {
  try {
    if (videoElement.paused) {
      await videoElement.play()
      return true
    }
    return false
  } catch (error) {
    console.error('播放失败:', error)
    return false
  }
}