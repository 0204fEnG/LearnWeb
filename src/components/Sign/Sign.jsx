// import { useState } from "react";
// import "./Sign.scss";

// const Sign = ({ isOpen, onClose }) => {
//   const [signType, setSignType] = useState("signIn");
//   const [formData, setFormData] = useState({
//     username: "",
//     password: "",
//     email: "",
//     confirmPassword: "",
//   });
//   const [errors, setErrors] = useState({});
//   const [loading, setLoading] = useState(false);

//   // 处理输入变更
//   const handleChangeForm = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//     setErrors({ ...errors, [e.target.name]: "" }); // 清除错误信息
//   };

//   // **单个输入框验证**
//   const validateField = (name, value) => {
//     let error = "";

//     switch (name) {
//       case "username":
//         if (!value.trim()) error = "用户名不能为空";
//         break;
//       case "password":
//         if (value.length < 12) {
//            error = "密码长度必须至少 12 位";
//          } else if (!/[A-Z]/.test(value)) {
//            error = "密码必须包含至少一个大写字母";
//          } else if (!/[a-z]/.test(value)) {
//            error = "密码必须包含至少一个小写字母";
//          }
//          break;
//       case "email":
//         if (!/^\S+@\S+\.\S+$/.test(value)) error = "邮箱格式不正确";
//         break;
//       case "confirmPassword":
//         if (value !== formData.password) error = "两次密码不一致";
//         break;
//       default:
//         break;
//     }

//     return error;
//   };

//   // **输入框失去焦点时触发验证**
//   const handleBlur = (e) => {
//     const { name, value } = e.target;
//     const error = validateField(name, value);
//     setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
//   };

//   // **提交表单**
//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         // 验证所有字段
//         let newErrors = {};
//         Object.keys(formData).forEach((key) => {
//             if (signType === "signIn" && (key === "email" || key === "confirmPassword")) return; // 登录时跳过邮箱和确认密码
//             const error = validateField(key, formData[key]);
//             if (error) newErrors[key] = error;
//         });

//         // 如果有错误，不提交
//         if (Object.keys(newErrors).length > 0) {
//             setErrors(newErrors);
//             return;
//         }

//         setLoading(true);
//         setTimeout(() => {
//             alert("提交成功！")
//             setLoading(false)
//         },3000);
//   };

//   return (
//     <div className="container" onClick={onClose}>
//       <div className="content" onClick={(e) => e.stopPropagation()}>
//         <header className="nav-container">
//           <nav
//             className={`nav ${signType === "signIn" ? "nav-click" : ""}`}
//             onClick={() => setSignType("signIn")}
//           >
//             登录
//           </nav>
//           <nav
//             className={`nav ${signType === "signUp" ? "nav-click" : ""}`}
//             onClick={() => setSignType("signUp")}
//           >
//             注册
//           </nav>
//         </header>
//         <form onSubmit={handleSubmit} className="form-container" noValidate>
//           {/* 用户名 */}
//           <div className="form-element">
//             <label className="label">用户名 :</label>
//             <input
//               className="element"
//               type="text"
//               name="username"
//               value={formData.username}
//               onChange={handleChangeForm}
//               onBlur={handleBlur}
//               required
//             />
//             {errors.username && <p className="error">{errors.username}</p >}
//           </div>

//           {/* 密码 */}
//           <div className="form-element">
//             <label className="label">密码 :</label>
//             <input
//               className="element"
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChangeForm}
//               onBlur={handleBlur}
//               required
//             />
//             {errors.password && <p className="error">{errors.password}</p >}
//           </div>

//           {/* 注册额外输入项 */}
//           {signType === "signUp" && (
//             <>
//               {/* 邮箱 */}
//               <div className="form-element">
//                 <label className="label">邮箱 :</label>
//                 <input
//                   className="element"
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChangeForm}
//                   onBlur={handleBlur}
//                   required
//                 />
//                 {errors.email && <p className="error">{errors.email}</p >}
//               </div>

//               {/* 确认密码 */}
//               <div className="form-element">
//                 <label className="label">确认密码 :</label>
//                 <input
//                   className="element"
//                   type="password"
//                   name="confirmPassword"
//                   value={formData.confirmPassword}
//                   onChange={handleChangeForm}
//                   onBlur={handleBlur}
//                   required
//                 />
//                 {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p >}
//               </div>
//             </>
//           )}

//           <button className="form-button" type="submit" disabled={loading}>
//             {loading ? "请稍等...212" : signType==='signIn'?'登录':'注册'}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Sign;

import { useState, useEffect } from "react";
import "./Sign.scss";

const Sign = ({ isOpen, onClose }) => {
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
    }, 250); // 设置防抖时间 500ms（可调整）
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
        e.preventDefault()
        if (signType === 'signIn' && errors['username'] === '' && errors['password'] === '') {
            console.log('登录中')
            return
        }
        if (signType === 'signUp' && errors['username'] === '' && errors['password'] === '' && errors['email'] === '' && errors['confirmPassword'] === '') {
            console.log('注册中')
            return
        }
  };

  return (
    <div className="container">
          <div className="content" onClick={(e) => e.stopPropagation()}>
              <div className="close" onClick={onClose}>×</div>
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