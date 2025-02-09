import { useState, useEffect } from "react";
import "./Sign.scss";
import { registerUser, loginUser } from "../../api/auth"; // 引入 API 方法
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../actions/userActions';
const Sign = () => {
  const [signType, setSignType] = useState("signIn");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [debounceTimer, setDebounceTimer] = useState(null); // 存储防抖计时器
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // **输入变更处理**
  const handleChangeForm = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // 清除旧的防抖计时器
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    // 设置新的防抖计时器
    const newTimer = setTimeout(() => {
        validateField(name, value);
    }, 500); // 设置防抖时间 ms（可调整）
    setDebounceTimer(newTimer);
  };

  // **单个输入框验证**
  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "username":
        if (!value.trim()) error = "用户名不能为空";
        break;
      case "password":
        if (value.length < 12) {
          error = "密码长度必须至少 12 位";
        } else if (!/[A-Z]/.test(value)) {
          error = "密码必须包含至少一个大写字母";
        } else if (!/[a-z]/.test(value)) {
          error = "密码必须包含至少一个小写字母";
        }
        break;
      case "email":
        if (!/^\S+@\S+\.\S+$/.test(value)) error = "邮箱格式不正确";
        break;
      case "confirmPassword":
        if (value !== formData.password) error = "两次密码不一致";
        break;
      default:
        break;
    }

      setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  // **提交表单**
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
   // 进行所有字段的验证
    Object.keys(formData).forEach((field) => validateField(field, formData[field])); 
    // 检查是否有错误
    if (Object.values(errors).some((err) => err)) {
      setLoading(false);
      return;
    }

    try {
      if (signType === "signUp") {
        // 进行注册
        const response = await registerUser(formData);
        console.log(response)
        
        setFormData({
         username: "",
         password: "",
         email: "",
         confirmPassword: "",
       })
      setSignType("signIn"); // 切换到登录模式
      } else {
        // // 进行登录
        const response = await loginUser({ username: formData.username, password: formData.password });
        console.log(response)
        const {id,username,email,token}=response.user
        dispatch(loginSuccess({ id, username, email, token }));
        navigate("/mine"); // 跳转到用户主页
      }
    } catch (error) {
      alert(error.message || "请求失败，请重试！");
    }

    setLoading(false);
  };

  return (
    <div className="container">
          <div className="content" onClick={(e) => e.stopPropagation()}>
        <header className="nav-container">
          <nav className={`nav ${signType === "signIn" ? "nav-click" : ""}`} onClick={() => setSignType("signIn")}>
            登录
          </nav>
          <nav className={`nav ${signType === "signUp" ? "nav-click" : ""}`} onClick={() => setSignType("signUp")}>
            注册
          </nav>
        </header>
        <form onSubmit={handleSubmit} className="form-container" noValidate>
          <div className="form-element">
            <label className="label">用户名 :</label>
            <input className={`element ${errors.username&&'element-error'}`} type="text" name="username" value={formData.username} onChange={handleChangeForm} required />
            {errors.username && <p className="error">{errors.username}</p >}
          </div>

          <div className="form-element">
            <label className="label">密码 :</label>
            <input className={`element ${errors.password&&'element-error'}`} type="password" name="password" value={formData.password} onChange={handleChangeForm} required />
            {errors.password && <p className="error">{errors.password}</p >}
          </div>

          {signType === "signUp" && (
            <>
              <div className="form-element">
                <label className="label">邮箱 :</label>
                <input className={`element ${errors.email&&'element-error'}`} type="email" name="email" value={formData.email} onChange={handleChangeForm} required />
                {errors.email && <p className="error">{errors.email}</p >}
              </div>

              <div className="form-element">
                <label className="label">确认密码 :</label>
                <input className={`element ${errors.confirmPassword&&'element-error'}`} type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChangeForm} required />
                {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p >}
              </div>
            </>
          )}

          <button className="form-button" type="submit" disabled={loading}>
            {loading ? "请稍等..." : signType === "signIn" ? "登录" : "注册"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Sign;