// utils/timeFormatter.js

const ONE_MINUTE = 60 * 1000;
const ONE_HOUR = 60 * ONE_MINUTE;
const ONE_DAY = 24 * ONE_HOUR;
const ONE_WEEK = 7 * ONE_DAY;

export const formatPublishTime = (publishTime) => {
  // 将输入时间转换为Date对象
  const publishDate = new Date(publishTime);
  const currentTime = new Date();

  // 检查时间是否有效
  if (isNaN(publishDate.getTime())) {
    return '无效时间';
  }

  // 计算时间差
  const timeDiff = currentTime - publishDate;

  // 获取年月日时分秒
  const publishYear = publishDate.getFullYear();
  const currentYear = currentTime.getFullYear();
  const publishMonth = publishDate.getMonth() + 1; // 月份从0开始
  const publishDay = publishDate.getDate();
  const currentMonth = currentTime.getMonth() + 1;
  const currentDay = currentTime.getDate();
  const publishHours = publishDate.getHours().toString().padStart(2, '0');
  const publishMinutes = publishDate.getMinutes().toString().padStart(2, '0');
  const publishSeconds = publishDate.getSeconds().toString().padStart(2, '0');

  // 判断是否是今天
  if (publishYear === currentYear && publishMonth === currentMonth && publishDay === currentDay) {
    return `${publishHours}:${publishMinutes}:${publishSeconds}`;
  }

  // 判断是否是昨天
  const yesterday = new Date();
  yesterday.setDate(currentDay - 1);
  if (publishYear === currentYear && publishMonth === currentMonth && publishDay === yesterday.getDate()) {
    return `昨天 ${publishHours}:${publishMinutes}:${publishSeconds}`;
  }

  // 判断是否是一周内
  if (timeDiff < ONE_WEEK) {
    // 计算相差的天数
    const diffDays = Math.floor(timeDiff / ONE_DAY);
    return `${diffDays}天前 ${publishHours}:${publishMinutes}:${publishSeconds}`;
  }

  // 判断是否是今年内
  if (publishYear === currentYear) {
    return `${publishMonth}-${publishDay} ${publishHours}:${publishMinutes}:${publishSeconds}`;
  }

  // 今年之前，显示完整时间
  const publishDateFormatted = publishDate.toISOString().split('T')[0];
  return `${publishDateFormatted} ${publishHours}:${publishMinutes}:${publishSeconds}`;
};