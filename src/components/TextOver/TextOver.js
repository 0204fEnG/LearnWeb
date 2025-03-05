import { useId } from 'react';
import styles from './TextOver.module.scss';

const TextOver = ({ text ,textColor}) => {
  const id = useId();

  return (
    <div className={styles.textWrapper}>
      <input 
        id={`${id}-exp`} 
        className={styles.exp} 
        type="checkbox" 
      />
      <div className={styles.text} style={{color:`${textColor}`}}>
        <label 
          className={styles.btn} 
          htmlFor={`${id}-exp`} 
          role="button" // 增强语义
          tabIndex={0} // 支持键盘操作
        ></label>
        {text}
      </div>
    </div>
  );
};

export default TextOver;