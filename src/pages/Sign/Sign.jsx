import { useEffect, useState } from "react";
import "./Sign.scss";
import { registerUser, loginUser } from "../../api/auth"; // 引入 API 方法
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../actions/userActions';
import Tip from "../../components/Tip/Tip";
import Title from "../../components/Title/Title";
const Sign = () => {
  const [tips, setTips] = useState([])
  const [tipClear,setTipClear]=useState(null)
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
  useEffect(() => {
    clearTimeout(tipClear)
    setTipClear(setTimeout(() => {
      setTips([])
    },2000))
  },[tips])
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
      const error=validateField(name, value);
      setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
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

      return error
  };

  // **提交表单**
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // 进行所有字段的验证
    const newError={}
    Object.keys(formData).forEach((field) => {
      if (signType === 'signIn' && (field === 'email' || field === 'confirmPassword')) {
        newError['email'] = ''
        newError['confirmPassword']=''
        return
      }
      newError[field]=validateField(field,formData[field])
    }); 
    // 检查是否有错误
    if (Object.values(newError).some((err) => err)) {
      setTips((prev) => [...prev, { message: '输入格式有错误', status:'red'}])
      setLoading(false);
      setErrors(newError)
      return;
    }
    try {
      switch (signType) {
        case "signUp": {
          const response = await registerUser(formData);
          // 假设 registerUser 函数返回的数据结构中包含了一个表示操作是否成功的字段，例如 success
          console.log("注册成功:",response)
            setTips((prev) => [...prev, { message: response.message, status:'green' }])
            setFormData({
              username: "",
              password: "",
              email: "",
              confirmPassword: "",
            });
            setSignType("signIn"); // 切换到登录模式
          break;
        }
        case "signIn": {
          const response = await loginUser({ username: formData.username, password: formData.password });
          console.log("登录成功:",response)
            setTips((prev) => [...prev, { message: response.message, status:'green' }])
          const { id, username, email, avatar, phone, preferences, bio } = response.user;
          const token=response.token
          dispatch(loginSuccess({ user: { id, username, email, avatar, phone, preferences, bio },token }));
            setTimeout(() => { navigate("/mine") }, 1000); // 跳转到用户主页
          break;
        }
        default:
          break;
      }
    } catch (error) {
      console.log("注册/登录失败:",error)
          // 这里捕获到的是 try 块中抛出的错误
          setTips((prev) => [...prev, { message: error.message || error, status:'red'}])
    }
        setLoading(false);
  };

  return (
    <div className="container">
      <Title title='登录/注册'/>
          <div className="content">
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
            <label htmlFor="username" className="label">😊</label>
            <input placeholder='请输入用户名'id='username' className={`element ${errors.username&&'element-error'}`} type="text" name="username" value={formData.username} onChange={handleChangeForm} required />
            {errors.username && <p className="error">{errors.username}</p >}
          </div>

          <div className="form-element">
            <label htmlFor="password" className="label">🔑</label>
            <input placeholder='请输入密码'id="password" className={`element ${errors.password&&'element-error'}`} type="password" name="password" value={formData.password} onChange={handleChangeForm} required />
            {errors.password && <p className="error">{errors.password}</p >}
          </div>

          {signType === "signUp" && (
            <>
              <div className="form-element">
                <label htmlFor="email" className="label">📧</label>
                <input placeholder='请输入邮箱'id='email' className={`element ${errors.email&&'element-error'}`} type="email" name="email" value={formData.email} onChange={handleChangeForm} required />
                {errors.email && <p className="error">{errors.email}</p >}
              </div>

              <div className="form-element">
                <label htmlFor="confirmPassword" className="label">🔐</label>
                <input placeholder='请再次输入密码'id='confirmPassword' className={`element ${errors.confirmPassword&&'element-error'}`} type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChangeForm} required />
                {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p >}
              </div>
            </>
          )}

          <button className="form-button" type="submit" disabled={loading}>
            {loading ? "请稍等..." : signType === "signIn" ? "登录" : "注册"}
          </button>
        </form>
      </div>
      {
        tips.map((tip) => <Tip message={tip.message} status={tip.status} />)
      }
    </div>
  );
};

export default Sign;