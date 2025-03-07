import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createCircle } from '../../../api/circle';

const CreateCircle = () => {
  // 状态管理
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [avatar, setAvatar] = useState(null); // 用于存储上传的头像文件
  const [loading, setLoading] = useState(false); // 用于显示加载状态
  const [error, setError] = useState(''); // 用于显示错误信息

  const navigate = useNavigate(); // 获取导航对象

  // 处理头像上传
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
    }
  };

  // 提交表单
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 验证必填字段
    if (!name) {
      setError('圈子名称是必填项');
      return;
    }

    // 设置加载状态
    setLoading(true);
    setError('');

    try {
      // 调用 API 创建圈子
      const response = await createCircle(name, description, avatar);

      // 处理成功响应
      console.log('圈子创建成功:', response);
      alert('圈子创建成功！');
    //   navigate('/circles'); // 跳转到圈子列表页面
    } catch (error) {
      // 处理错误响应
      console.error('创建圈子失败:', error);
      let errorMessage = '创建圈子失败';

      // 检查错误类型
      if (error.response) {
        // 后端返回的错误信息
        errorMessage = error.response.data.error || errorMessage;
      } else if (error.request) {
        // 请求已发送但未收到响应
        errorMessage = '网络错误，请稍后重试';
      } else {
        // 其他错误
        errorMessage = error.message || errorMessage;
      }

      setError(errorMessage);
    } finally {
      // 重置加载状态
      setLoading(false);
    }
  };

  return (
    <div className="create-circle-container">
      <h1>创建圈子</h1>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">圈子名称:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="请输入圈子名称"
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">圈子描述:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="请输入圈子描述"
          />
        </div>
        <div className="form-group">
          <label htmlFor="avatar">圈子头像:</label>
          <input
            type="file"
            id="avatar"
            accept="image/*"
            onChange={handleAvatarChange}
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? '创建中...' : '创建圈子'}
        </button>
      </form>
    </div>
  );
};

export default CreateCircle;