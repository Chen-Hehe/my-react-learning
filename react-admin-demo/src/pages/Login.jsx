import { useState } from "react";
import { useNavigate } from "react-router-dom";
import userStore from "../store/userStore";
// 引入刚刚配好的 axios
import request from "../api/request"; 

export default function Login() {
  const navigate = useNavigate();
  
  // 1. 定义账号和密码的状态，初始值为空字符串
  const [username, setUsername] = useState(""); 
  const [password, setPassword] = useState(""); 

  const handleLogin = async () => {
    console.log("准备发送给后端的账号:", username, "密码:", password);
    // 模拟登录成功逻辑...
    const mockToken = "test-jwt-token-123456";
    userStore.login(mockToken);
    navigate("/admin/user");
  };

  return (
    <div style={{ padding: '40px' }}>
      <h2>这是登录页</h2>
      
      {/* 账号输入框 */}
      <div>
        <input 
          placeholder="账号" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
        />
      </div>

      {/* 密码输入框 */}
      <div style={{ margin: "10px 0" }}>
        <input 
          placeholder="密码" 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
      </div>

      <button onClick={handleLogin}>登录</button>
    </div>
  );
}