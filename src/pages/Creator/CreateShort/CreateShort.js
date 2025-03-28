// import React, { useState, useEffect, useRef, useCallback } from 'react';
// import { uploadShort } from '../../../api/short';
// import { getCircleList, searchCircles } from '../../../api/circle';
// import Loading from '../../../components/Loading/Loading';
// import { debounce } from "lodash"
// import './CreateShort.scss'
// const CreateShort = () => {
//   // 表单数据
//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     circleId: '',
//     circleName: '',
//     tags: []
//   });
  
//   // 圈子相关状态
//   const [circles, setCircles] = useState([]);
//   const [searchKeyword, setSearchKeyword] = useState('');
//   const [hasMore, setHasMore] = useState(true);
//   const [page, setPage] = useState(1);
//   const [loadingCircles, setLoadingCircles] = useState(false);
//   const [error, setError] = useState('');
//   const [showDropdown, setShowDropdown] = useState(false);
  
//   // 视频上传状态
//   const [videoFile, setVideoFile] = useState(null);
//   const [videoPreview, setVideoPreview] = useState('');
//   const [isUploading, setIsUploading] = useState(false);
  
//   // 话题标签状态
//   const [isTaggingEnabled, setIsTaggingEnabled] = useState(false);

//   // 使用Ref管理状态
//   const pageRef = useRef(page);
//   const keywordRef = useRef(searchKeyword);
//   const loadingRef = useRef(loadingCircles);
//   const hasMoreRef = useRef(hasMore);
//   const sentinelRef = useRef(null);
//   const observerRef = useRef(null);
//   const dropdownRef = useRef(null);
//   const videoUploadRef=useRef(null)
//   // 同步Ref与State
//   useEffect(() => {
//     pageRef.current = page;
//     keywordRef.current = searchKeyword;
//     loadingRef.current = loadingCircles;
//     hasMoreRef.current = hasMore;
//   }, [page, searchKeyword, loadingCircles, hasMore]);

//   // 获取圈子数据
//   const fetchCircles = useCallback(async () => {
//     console.log(loadingRef.current,hasMoreRef.current)
//     if (loadingRef.current || !hasMoreRef.current) return;

//     try {
//       setLoadingCircles(true);
//       setError('');

//       const params = {
//         page: pageRef.current,
//         limit: 10,
//         ...(keywordRef.current && { keyword: keywordRef.current })
//       };
// console.log("params:",params)
//       const response = keywordRef.current 
//         ? await searchCircles(params)
//         : await getCircleList(params);

//       const newCircles = response.circles || [];
//       console.log(newCircles)
//       setCircles(prev => 
//         pageRef.current === 1 ? newCircles : [...prev, ...newCircles]
//       );
//       setHasMore(newCircles.length >= 10);
//       setPage(prev => prev + 1);
//     } catch (err) {
//       setError('加载失败，请稍后重试');
//       console.error('加载错误:', err);
//     } finally {
//       setLoadingCircles(false);
//     }
//   }, []);

//   // 初始化IntersectionObserver
//   useEffect(() => {
//     observerRef.current = new IntersectionObserver(
//       entries => {
//         entries.forEach(entry => {
//           if (entry.isIntersecting && !loadingRef.current && hasMoreRef.current) {
//             fetchCircles();
//           }
//         });
//       },
//       { rootMargin: '100px' }
//     );

//     if (sentinelRef.current) {
//       observerRef.current.observe(sentinelRef.current);
//     }

//     return () => {
//       if (observerRef.current) {
//         observerRef.current.disconnect();
//       }
//     };
//   }, [fetchCircles]);

//   // 处理搜索关键词变化
//   useEffect(() => {
//       console.log("fetch")
//       setCircles([]);
//       setPage(1);
//       setHasMore(true);
//       fetchCircles();
//   }, [searchKeyword, fetchCircles]);

//   // 点击外部关闭下拉框
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setShowDropdown(false);
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   // 处理视频选择
//   const handleVideoChange = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     // 验证文件类型
//     if (!file.type.includes('video/')) {
//       setError('请选择有效的视频文件');
//       return;
//     }

//     // 验证文件大小 (限制100MB)
//     if (file.size > 100 * 1024 * 1024) {
//       setError('视频文件不能超过100MB');
//       return;
//     }

//     setVideoFile(file);
//     setVideoPreview(URL.createObjectURL(file));
//     setError('');
//   };

//   // 解析话题标签
//   const parseTags = (content) => {
//     const tags = [];
//     let processed = '';
//     let currentIndex = 0;
//     const regex = /#([^#\s]+)#/g;
//     let match;

//     while ((match = regex.exec(content)) !== null) {
//       const tag = match[1];
//       const start = match.index;
//       const end = regex.lastIndex;
      
//       tags.push({
//         name: tag,
//         index: currentIndex + start
//       });
      
//       processed += content.slice(currentIndex, start) + tag;
//       currentIndex = end;
//     }
//     processed += content.slice(currentIndex);
    
//     return { processed, tags };
//   };

//   // 处理描述输入
//   const handleDescriptionChange = (e) => {
//     const value = e.target.value;
//     if (isTaggingEnabled) {
//       const { processed, tags } = parseTags(value);
//       setFormData(prev => ({
//         ...prev,
//         description: processed,
//         tags
//       }));
//     } else {
//       setFormData(prev => ({ ...prev, description: value }));
//     }
//   };

//   // 提交表单
//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     // 验证表单
//     if (!formData.title.trim()) {
//       setError('请输入视频标题');
//       return;
//     }
    
//     if (!videoFile) {
//       setError('请选择视频文件');
//       return;
//     }
    
//     if (!formData.circleId) {
//       setError('请选择圈子');
//       return;
//     }

//     try {
//       setIsUploading(true);
//       setError('');

//       const form = new FormData();
//       form.append('title', formData.title);
//       form.append('description', formData.description);
//       form.append('circleId', formData.circleId);
//       form.append('tags', JSON.stringify(formData.tags));
//       form.append('video', videoFile);

//       await uploadShort(form);
      
//       // 上传成功后的处理
//       setFormData({
//         title: '',
//         description: '',
//         circleId: '',
//         circleName: '',
//         tags: []
//       });
//       setVideoFile(null);
//       setVideoPreview('');
//       setError('上传成功！');
//     } catch (err) {
//       setError(err.message || '上传失败，请稍后重试');
//       console.error('上传错误:', err);
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   // 渲染圈子列表项
//   const renderCircleItem = (circle) => (
//     <div
//       key={circle._id}
//       className="circle-item"
//       onClick={() => {
//         setFormData(prev => ({
//           ...prev,
//           circleId: circle._id,
//           circleName: circle.name
//         }));
//         setShowDropdown(false);
//       }}
//     >
//       <div className="circle-info">
//         <h4>{circle.name}</h4>
//         <p className="description">{circle.description}</p>
//         <div className="stats">
//           <span>👥 {circle.memberCount || 0}</span>
//           <span>📝 {circle.postCount || 0}</span>
//         </div>
//       </div>
//       {circle._id === formData.circleId && (
//         <div className="selected-indicator">✓</div>
//       )}
//     </div>
//   );

//   return (
//     <div className="short-upload-container">
//       <h2>发布短视频</h2>
      
//       {error && (
//         <div className={`error-message ${error.includes('成功') ? 'success' : ''}`}>
//           {error}
//         </div>
//       )}

//       <form onSubmit={handleSubmit}>
//         {/* 视频上传区域 */}
// <div className="upload-section">
//   <div className="video-upload-area">
//     <input
//       ref={videoUploadRef}
//       id="video-upload"
//       type="file"
//       accept="video/*"
//       onChange={handleVideoChange}
//       required
//       style={{ display: 'none' }}
//     />
    
//     {videoPreview ? (
//       <div className="video-preview">
//         <video src={videoPreview} controls />
//         <button 
//           type="button" 
//           className="change-video-btn"
//           onClick={() => videoUploadRef.current?.click()}
//         >
//           更换视频
//         </button>
//       </div>
//     ) : (
//       <label 
//         className="upload-placeholder"
//         htmlFor="video-upload"
//       >
//         <div className="upload-icon">+</div>
//         <p>点击上传视频</p>
//         <p className="hint">支持MP4、MOV等格式，最大100MB</p>
//       </label>
//     )}
//   </div>
// </div>

//         {/* 标题输入 */}
//         <div className="form-group">
//           <label>视频标题</label>
//           <input
//             type="text"
//             value={formData.title}
//             onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
//             placeholder="请输入视频标题"
//             maxLength="50"
//             required
//           />
//         </div>

//         {/* 圈子选择 */}
//         <div className="form-group" ref={dropdownRef}>
//           <label>选择圈子</label>
//           <div className="circle-selector">
//             <input
//               type="text"
//               placeholder="搜索或选择圈子..."
//               value={showDropdown ? searchKeyword : formData.circleName || searchKeyword}
//               onChange={(e) => {
//                 setSearchKeyword(e.target.value);
//                 if (!showDropdown) setShowDropdown(true);
//               }}
//               onFocus={() => setShowDropdown(true)}
//             />
            
//             {showDropdown && (
//               <div className="circle-dropdown">
//                 <div className="circle-list">
//                   {circles.length > 0 ? (
//                     circles.map(renderCircleItem)
//                   ) : (
//                     !loadingCircles && <div className="no-results">未找到相关圈子</div>
//                   )}
                  
//                   {/* 哨兵元素 */}
//                   <div ref={sentinelRef} className="sentinel" />

//                   {loadingCircles && (
//                     <div className="loading-indicator">
//                       <Loading />
//                     </div>
//                   )}

//                   {!hasMore && circles.length > 0 && (
//                     <div className="no-more-data">没有更多圈子了</div>
//                   )}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* 描述和话题标签 */}
//         <div className="form-group">
//           <div className="description-header">
//             <label>视频描述</label>
//             <button
//               type="button"
//               className={`tag-toggle ${isTaggingEnabled ? 'active' : ''}`}
//               onClick={() => setIsTaggingEnabled(!isTaggingEnabled)}
//             >
//               {isTaggingEnabled ? '关闭话题功能' : '开启话题功能'}
//             </button>
//           </div>
          
//           <textarea
//             value={formData.description}
//             onChange={handleDescriptionChange}
//             placeholder={
//               isTaggingEnabled 
//                 ? '使用#话题#格式添加标签，例如：#旅行# #美食#' 
//                 : '请输入视频描述'
//             }
//             rows="4"
//           />
          
//           {isTaggingEnabled && formData.tags.length > 0 && (
//             <div className="tags-preview">
//               {formData.tags.map((tag, index) => (
//                 <span key={index} className="tag">
//                   #{tag.name}
//                 </span>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* 提交按钮 */}
//         <button 
//           type="submit" 
//           className="submit-btn"
//           disabled={isUploading}
//         >
//           {isUploading ? '上传中...' : '发布短视频'}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default CreateShort;


import React, { useState, useEffect, useRef, useCallback } from 'react';
import { uploadShort } from '../../../api/short';
import { getCircleList, searchCircles } from '../../../api/circle';
import Loading from '../../../components/Loading/Loading';
import { debounce } from "lodash";
import './CreateShort.scss';

const CreateShort = () => {
  // 表单数据
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    circleId: '',
    circleName: '',
  });
  
  // 话题标签相关状态
  const [isTaggingEnabled, setIsTaggingEnabled] = useState(false);
  const [tags, setTags] = useState([]);
  
  // 其他状态保持不变...
  const [circles, setCircles] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [loadingCircles, setLoadingCircles] = useState(false);
  const [error, setError] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [videoFile, setVideoFile] = useState(null);
  const [videoPreview, setVideoPreview] = useState('');
  const [isUploading, setIsUploading] = useState(false);


  const pageRef = useRef(page);
  const keywordRef = useRef(searchKeyword);
  const loadingRef = useRef(loadingCircles);
  const hasMoreRef = useRef(hasMore);
  const sentinelRef = useRef(null);
  const observerRef = useRef(null);
  const dropdownRef = useRef(null);
  const videoUploadRef=useRef(null)
  // 解析话题标签（与帖子发布保持一致）
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
  // 处理视频选择
   // 获取圈子数据
  const fetchCircles = useCallback(async () => {
    console.log(loadingRef.current,hasMoreRef.current)
    if (loadingRef.current || !hasMoreRef.current) return;

    try {
      setLoadingCircles(true);
      setError('');

      const params = {
        page: pageRef.current,
        limit: 10,
        ...(keywordRef.current && { keyword: keywordRef.current })
      };
console.log("params:",params)
      const response = keywordRef.current 
        ? await searchCircles(params)
        : await getCircleList(params);

      const newCircles = response.circles || [];
      console.log(newCircles)
      setCircles(prev => 
        pageRef.current === 1 ? newCircles : [...prev, ...newCircles]
      );
      setHasMore(newCircles.length >= 10);
      setPage(prev => prev + 1);
    } catch (err) {
      setError('加载失败，请稍后重试');
      console.error('加载错误:', err);
    } finally {
      setLoadingCircles(false);
    }
  }, []);

  // 初始化IntersectionObserver
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !loadingRef.current && hasMoreRef.current) {
            fetchCircles();
          }
        });
      },
      { rootMargin: '100px' }
    );

    if (sentinelRef.current) {
      observerRef.current.observe(sentinelRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [fetchCircles]);

  // 处理搜索关键词变化
  useEffect(() => {
      console.log("fetch")
      setCircles([]);
      setPage(1);
      setHasMore(true);
      fetchCircles();
  }, [searchKeyword, fetchCircles]);

  // 点击外部关闭下拉框
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // 验证文件类型
    if (!file.type.includes('video/')) {
      setError('请选择有效的视频文件');
      return;
    }

    // 验证文件大小 (限制100MB)
    if (file.size > 100 * 1024 * 1024) {
      setError('视频文件不能超过100MB');
      return;
    }

    setVideoFile(file);
    setVideoPreview(URL.createObjectURL(file));
    setError('');
  };
  // 处理描述输入
  const handleDescriptionChange = (e) => {
    const { value } = e.target;
    setFormData(prev => ({
      ...prev,
      description: value
    }));
    
    if (isTaggingEnabled) {
      const parsed = parseContent(value);
      setTags(parsed.tags);
    }
  };

  // 提交表单
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    let finalDescription = formData.description;
    let finalTags = [];
    
    if (isTaggingEnabled) {
      const parsed = parseContent(formData.description);
      finalDescription = parsed.processedContent;
      finalTags = parsed.tags;
    }

    // 验证表单
    if (!formData.title.trim()) {
      setError('请输入视频标题');
      return;
    }
    
    if (!videoFile) {
      setError('请选择视频文件');
      return;
    }
    
    if (!formData.circleId) {
      setError('请选择圈子');
      return;
    }

    try {
      setIsUploading(true);
      setError('');

      const form = new FormData();
      form.append('title', formData.title);
      form.append('description', finalDescription);
      form.append('circleId', formData.circleId);
      form.append('tags', JSON.stringify(finalTags));
      form.append('video', videoFile);

      await uploadShort(form);
      
      // 上传成功后的处理
      setFormData({
        title: '',
        description: '',
        circleId: '',
        circleName: '',
      });
      setTags([]);
      setVideoFile(null);
      setVideoPreview('');
      setError('上传成功！');
    } catch (err) {
      setError(err.message || '上传失败，请稍后重试');
      console.error('上传错误:', err);
    } finally {
      setIsUploading(false);
    }
  };

  // 渲染方法保持不变...
    const renderCircleItem = (circle) => (
    <div
      key={circle._id}
      className="circle-item"
      onClick={() => {
        setFormData(prev => ({
          ...prev,
          circleId: circle._id,
          circleName: circle.name
        }));
        setShowDropdown(false);
      }}
    >
      <div className="circle-info">
        <h4>{circle.name}</h4>
        <p className="description">{circle.description}</p>
        <div className="stats">
          <span>👥 {circle.memberCount || 0}</span>
          <span>📝 {circle.postCount || 0}</span>
        </div>
      </div>
      {circle._id === formData.circleId && (
        <div className="selected-indicator">✓</div>
      )}
    </div>
  );
  return (
    <div className="short-upload-container">
      <h2>发布短视频</h2>
      
      {error && (
        <div className={`error-message ${error.includes('成功') ? 'success' : ''}`}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* 视频上传区域保持不变... */}
        
        {/* 标题输入保持不变... */}

        {/* 圈子选择保持不变... */}
        <div className="upload-section">
  <div className="video-upload-area">
    <input
      ref={videoUploadRef}
      id="video-upload"
      type="file"
      accept="video/*"
      onChange={handleVideoChange}
      required
      style={{ display: 'none' }}
    />
    
    {videoPreview ? (
      <div className="video-preview">
        <video src={videoPreview} controls />
        <button 
          type="button" 
          className="change-video-btn"
          onClick={() => videoUploadRef.current?.click()}
        >
          更换视频
        </button>
      </div>
    ) : (
      <label 
        className="upload-placeholder"
        htmlFor="video-upload"
      >
        <div className="upload-icon">+</div>
        <p>点击上传视频</p>
        <p className="hint">支持MP4、MOV等格式，最大100MB</p>
      </label>
    )}
  </div>
</div>

        {/* 标题输入 */}
        <div className="form-group">
          <label>视频标题</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            placeholder="请输入视频标题"
            maxLength="50"
            required
          />
        </div>

        {/* 圈子选择 */}
        <div className="form-group" ref={dropdownRef}>
          <label>选择圈子</label>
          <div className="circle-selector">
            <input
              type="text"
              placeholder="搜索或选择圈子..."
              value={showDropdown ? searchKeyword : formData.circleName || searchKeyword}
              onChange={(e) => {
                setSearchKeyword(e.target.value);
                if (!showDropdown) setShowDropdown(true);
              }}
              onFocus={() => setShowDropdown(true)}
            />
            
            {showDropdown && (
              <div className="circle-dropdown">
                <div className="circle-list">
                  {circles.length > 0 ? (
                    circles.map(renderCircleItem)
                  ) : (
                    !loadingCircles && <div className="no-results">未找到相关圈子</div>
                  )}
                  
                  {/* 哨兵元素 */}
                  <div ref={sentinelRef} className="sentinel" />

                  {loadingCircles && (
                    <div className="loading-indicator">
                      <Loading />
                    </div>
                  )}

                  {!hasMore && circles.length > 0 && (
                    <div className="no-more-data">没有更多圈子了</div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
        {/* 修改后的描述和话题标签部分 */}
        <div className="form-group">
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

          <label>视频描述{isTaggingEnabled && '（使用#标签#格式添加话题）'}</label>
          <textarea
            value={formData.description}
            onChange={handleDescriptionChange}
            placeholder={
              isTaggingEnabled 
                ? '例如：#旅行#你的视频描述...#风景#' 
                : '请输入视频描述'
            }
            rows="4"
          />
        </div>

        {/* 提交按钮保持不变... */}
            <button 
          type="submit" 
          className="submit-btn"
          disabled={isUploading}
        >
          {isUploading ? '上传中...' : '发布短视频'}
        </button>
      </form>
    </div>
  );
};

export default CreateShort;