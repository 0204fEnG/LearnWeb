import { useState, useEffect, useRef } from 'react'
import { postReply } from '../../api/reply'
import './CommentInput.scss'
const CommentInput = ({
  inputPosition,
  postId,
  parentReplyId,       // 来自父级的一级评论ID（弹窗场景）
  onSuccess,           // 发送成功的回调
  replyToUser,  // 默认回复的用户
  onCancelReply        // 取消回复的回调
}) => {
  const [content, setContent] = useState('')
  const inputRef = useRef(null)

console.log(replyToUser)
  const handleSubmit = async () => {
      if (!content.trim()) return
    
    try {
        const response = await postReply({
            postId,
            content,
            parentReplyId: parentReplyId || null,
            replyToUserId: replyToUser?.id || null
        })
          console.log(response)
      onSuccess(response.comments[0])
      setContent('')
      inputRef.current.focus()
    } catch (error) {
      console.error('发送评论失败:', error)
    }
  }

  return (
    <div className={`comment-input-container ${inputPosition}`}>
      {replyToUser && (
        <div className="reply-hint">
          回复 @{replyToUser.username}
          <button className="cancel-reply" onClick={() => {
            onCancelReply?.()
          }}>×</button>
        </div>
      )}
      <textarea
        ref={inputRef}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="写下你的评论..."
        rows={2}
      />
      <button 
        className="submit-btn" 
        onClick={handleSubmit}
        disabled={!content.trim()}
      >
        发送
      </button>
    </div>
  )
}

export default CommentInput