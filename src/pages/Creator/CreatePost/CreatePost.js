// // CreatePostPage.jsx
// import React, { useState, useEffect, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { getCircleList } from '../../../api/circle';
// import { createPost } from '../../../api/post';
// import './CreatePost.scss';
// const CreatePostPage = () => {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [circles, setCircles] = useState([]);
//   const [fileList, setFileList] = useState([]);
//   const [pagination, setPagination] = useState({
//     page: 1,
//     limit: 10,
//     hasMore: true
//   });
//   const [errors, setErrors] = useState({});
//   const [formData, setFormData] = useState({
//     title: '',
//     content: '',
//     circleId: ''
//   });
//   const selectRef = useRef(null);
//   const dropdownRef = useRef(null);
//   const [showDropdown, setShowDropdown] = useState(false);

//   // 无限滚动加载圈子
//   const loadMoreCircles = async () => {
//     if (!pagination.hasMore || loading) return;
    
//     try {
//       const { data } = await getCircleList({
//         page: pagination.page,
//         limit: pagination.limit
//       });
      
//       setCircles(prev => [...prev, ...data.circles]);
//       setPagination(prev => ({
//         ...prev,
//         page: prev.page + 1,
//         hasMore: data.circles.length >= prev.limit
//       }));
//     } catch (error) {
//       showMessage('error', '获取圈子列表失败');
//     }
//   };

//   // 初始化加载
//   useEffect(() => {
//     loadMoreCircles();
//   }, []);

//   // 自定义消息提示
//   const showMessage = (type, text) => {
//     const messageEl = document.createElement('div');
//     messageEl.className = `custom-message ${type}`;
//     messageEl.textContent = text;
//     document.body.appendChild(messageEl);
    
//     setTimeout(() => {
//       messageEl.remove();
//     }, 3000);
//   };

//   // 处理表单输入
//   const handleInput = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//     setErrors(prev => ({ ...prev, [name]: '' }));
//   };

//   // 处理文件上传
//   const handleFileUpload = (e) => {
//     const files = Array.from(e.target.files);
//     // 限制最多上传9张图片
//     if (files.length + fileList.length > 9) {
//       showMessage('error', '最多只能上传9张图片');
//       return;
//     }
//     setFileList(prev => [...prev, ...files]);
//   };

//   // 表单验证
//   const validateForm = () => {
//     const newErrors = {};
//     if (!formData.circleId) newErrors.circleId = '请选择圈子';
//     if (!formData.title.trim()) newErrors.title = '请输入标题';
//     if (formData.title.length > 50) newErrors.title = '标题不能超过50字';
//     if (!formData.content.trim()) newErrors.content = '请输入内容';
//     if (formData.content.length < 10) newErrors.content = '内容至少10个字';
    
//     // 检查图片数量
//     if (fileList.length > 9) {
//       newErrors.images = '最多只能上传9张图片';
//     }
    
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   // 提交表单
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;
    
//     setLoading(true);
//     try {
//         // 创建 FormData 对象
//       const subFormData = new FormData();
//       subFormData.append('title', formData.title);
//       subFormData.append('content', formData.content);
//       subFormData.append('circleId', formData.circleId);

//       // 添加图片文件，最多9张
//       const filesToAdd = fileList.slice(0, 9);
//       for (const file of filesToAdd) {
//         subFormData.append('image', file); // 文件字段名需要与后端一致
//       }

//       await createPost(subFormData);
//       showMessage('success', '帖子发布成功');
//     } catch (error) {
//         console.log(error)
//       showMessage('error', error || '发布失败');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // 点击外部关闭下拉
//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (selectRef.current && !selectRef.current.contains(e.target)) {
//         setShowDropdown(false);
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   return (
//     <div className="create-post-container">
//       <h2>发布新帖子</h2>
//       <form onSubmit={handleSubmit}>
//         {/* 圈子选择 */}
//         <div className="form-group" ref={selectRef}>
//           <label>选择圈子</label>
//           <div
//             className="custom-select"
//             onClick={() => setShowDropdown(!showDropdown)}
//           >
//             {formData.circleId
//               ? circles.find(c => c._id === formData.circleId)?.name
//               : '请选择圈子'}
//           </div>
//           {errors.circleId && <div className="error">{errors.circleId}</div>}
          
//           <div
//             className={`dropdown ${showDropdown ? 'show' : ''}`}
//             ref={dropdownRef}
//           >
//             <div className="dropdown-list">
//               {circles.map(circle => (
//                 <div
//                   key={circle._id}
//                   className="dropdown-item"
//                   onClick={() => {
//                     setFormData(prev => ({ ...prev, circleId: circle._id }));
//                     setShowDropdown(false);
//                   }}
//                 >
//                   {circle.name}
//                 </div>
//               ))}
//               {pagination.hasMore && (
//                 <div
//                   className="load-more"
//                   onClick={loadMoreCircles}
//                 >
//                   加载更多...
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* 标题输入 */}
//         <div className="form-group">
//           <label>标题</label>
//           <input
//             type="text"
//             name="title"
//             value={formData.title}
//             onChange={handleInput}
//             className={errors.title ? 'error' : ''}
//           />
//           {errors.title && <div className="error">{errors.title}</div>}
//         </div>

//         {/* 内容输入 */}
//         <div className="form-group">
//           <label>内容</label>
//           <textarea
//             name="content"
//             value={formData.content}
//             onChange={handleInput}
//             rows="6"
//             className={errors.content ? 'error' : ''}
//           />
//           {errors.content && <div className="error">{errors.content}</div>}
//         </div>

//         {/* 文件上传 */}
//         <div className="form-group">
//           <label>上传图片</label>
//           <input
//             type="file"
//             multiple
//             onChange={handleFileUpload}
//             accept="image/*"
//             style={{ display: 'none' }}
//             id="file-upload"
//           />
//           <label htmlFor="file-upload" className="custom-upload-btn">
//             选择图片
//           </label>
//           <div className="file-list">
//             {fileList.map((file, index) => (
//               <div key={index} className="file-item">
//                 <span>{file.name}</span>
//                 <span className="status-dot success" />
//               </div>
//             ))}
//             {errors.images && <div className="error">{errors.images}</div>}
//           </div>
//         </div>

//         {/* 提交按钮 */}
//         <button
//           type="submit"
//           className="submit-btn"
//           disabled={loading}
//         >
//           {loading ? '发布中...' : '立即发布'}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default CreatePostPage;

// CreatePostPage.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCircleList } from '../../../api/circle';
import { createPost } from '../../../api/post';
import './CreatePost.scss';

const CreatePostPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [circles, setCircles] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    hasMore: true
  });
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    circleId: ''
  });
  const [isTaggingEnabled, setIsTaggingEnabled] = useState(false);
  const [tags, setTags] = useState([]);
  const selectRef = useRef(null);
  const dropdownRef = useRef(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const loadMoreCircles = async () => {
    if (!pagination.hasMore || loading) return;
    try {
      const { circles } = await getCircleList({
        page: pagination.page,
        limit: pagination.limit
      });
      setCircles(prev => [...prev, ...circles]);
      setPagination(prev => ({
        ...prev,
        page: prev.page + 1,
        hasMore: circles.length >= prev.limit
      }));
    } catch (error) {
      showMessage('error', '获取圈子列表失败');
    }
  };

  useEffect(() => {
    loadMoreCircles();
  }, []);

  const showMessage = (type, text) => {
    const messageEl = document.createElement('div');
    messageEl.className = `custom-message ${type}`;
    messageEl.textContent = text;
    document.body.appendChild(messageEl);
    setTimeout(() => {
      messageEl.remove();
    }, 3000);
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setErrors(prev => ({ ...prev, [name]: '' }));
    if (name === 'content' && isTaggingEnabled) {
      const parsed = parseContent(value);
      setTags(parsed.tags);
    }
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + fileList.length > 9) {
      showMessage('error', '最多只能上传9张图片');
      return;
    }
    setFileList(prev => [...prev, ...files]);
  };

  const parseContent = (content) => {
    let processedContent = '';
    const tags = [];
    let currentPos = 0;
    const regex = /#([^#]+)#/g;
    let match;

    while ((match = regex.exec(content)) !== null) {
      const start = match.index;
      const end = regex.lastIndex;
      const tagName = match[1];
      processedContent += content.substring(currentPos, start);
      tags.push({
        name: tagName,
        index: processedContent.length
      });
      currentPos = end;
    }
    processedContent += content.substring(currentPos);
    return { processedContent, tags };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let finalContent = formData.content;
    let finalTags = [];
    if (isTaggingEnabled) {
      const parsed = parseContent(formData.content);
      finalContent = parsed.processedContent;
      finalTags = parsed.tags;
    }

    const newErrors = {};
    if (!formData.circleId) newErrors.circleId = '请选择圈子';
    if (!formData.title.trim()) newErrors.title = '请输入标题';
    if (formData.title.length > 50) newErrors.title = '标题不能超过50字';
    if (!finalContent.trim()) newErrors.content = '请输入内容';
    if (finalContent.length < 10) newErrors.content = '内容至少10个字';
    if (fileList.length > 9) newErrors.images = '最多只能上传9张图片';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      const subFormData = new FormData();
      subFormData.append('title', formData.title);
      subFormData.append('content', finalContent);
      subFormData.append('circleId', formData.circleId);
      subFormData.append('tags', JSON.stringify(finalTags));

      const filesToAdd = fileList.slice(0, 9);
      for (const file of filesToAdd) {
        subFormData.append('image', file);
      }

      await createPost(subFormData);
      showMessage('success', '帖子发布成功');
    } catch (error) {
      showMessage('error', error.message || '发布失败');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (selectRef.current && !selectRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="create-post-container">
      <h1>发布新帖子</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <button
            type="button"
            onClick={() => setIsTaggingEnabled(!isTaggingEnabled)}
            className={`tag-toggle-btn ${isTaggingEnabled ? 'active' : ''}`}
          >
            {isTaggingEnabled ? '关闭话题功能' : '开启话题功能'}
          </button>
        </div>

        {isTaggingEnabled && (
          <div className="tags-preview">
            <label>已添加话题标签:</label>
            <div className="tags-list">
              {tags.map((tag, index) => (
                <span key={index} className="tag-item">
                  #{tag.name}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="form-group" ref={selectRef}>
          <label>选择圈子</label>
          <div
            className="custom-select"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            {formData.circleId
              ? circles.find(c => c._id === formData.circleId)?.name
              : '请选择圈子'}
          </div>
          {errors.circleId && <div className="error">{errors.circleId}</div>}
          
          <div
            className={`dropdown ${showDropdown ? 'show' : ''}`}
            ref={dropdownRef}
          >
            <div className="dropdown-list">
              {circles.map(circle => (
                <div
                  key={circle._id}
                  className="dropdown-item"
                  onClick={() => {
                    setFormData(prev => ({ ...prev, circleId: circle._id }));
                    setShowDropdown(false);
                  }}
                >
                  {circle.name}
                </div>
              ))}
              {pagination.hasMore && (
                <div
                  className="load-more"
                  onClick={loadMoreCircles}
                >
                  加载更多...
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="form-group">
          <label>标题</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInput}
            className={errors.title ? 'error' : ''}
            placeholder="请输入帖子标题"
          />
          {errors.title && <div className="error">{errors.title}</div>}
        </div>

        <div className="form-group">
          <label>内容{isTaggingEnabled && '（使用#标签#格式添加话题）'}</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleInput}
            rows="6"
            className={errors.content ? 'error' : ''}
            placeholder={isTaggingEnabled ? '例如：#苏轼#你的内容...#宋词#' : "请输入帖子内容"}
          />
          {errors.content && <div className="error">{errors.content}</div>}
        </div>

        <div className="form-group">
          <label>上传图片</label>
          <input
            type="file"
            multiple
            onChange={handleFileUpload}
            accept="image/*"
            style={{ display: 'none' }}
            id="file-upload"
          />
          <label htmlFor="file-upload" className="custom-upload-btn">
            选择图片
          </label>
          <div className="file-list">
            {fileList.map((file, index) => (
              <div key={index} className="file-item">
                <span>{file.name}</span>
                <span className="status-dot success" />
              </div>
            ))}
            {errors.images && <div className="error">{errors.images}</div>}
          </div>
        </div>

        <button
          type="submit"
          className="submit-btn"
          disabled={loading}
        >
          {loading ? '发布中...' : '立即发布'}
        </button>
      </form>
    </div>
  );
};

export default CreatePostPage;