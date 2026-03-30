// src/pages/Login.jsx
import { useNavigate } from "react-router-dom";
import userStore from "../store/userStore";
// 引入我们刚刚配置好的 Axios 实例
import request from "../api/request"; 

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // 🚧 假设这是真实的后端接口请求
      // const res = await request.post("/login", { username: "admin", password: "123" });
      
      // 为了演示，我们模拟后端返回了数据
      console.log("正在发送请求...");
      const mockToken = "test-jwt-token-123456";
      
      userStore.login(mockToken);
      navigate("/admin/user");
      alert("登录成功");
    } catch (error) {
      console.error("登录失败", error);
    }
  };

  return (
    <div style={{ padding: '40px' }}>
      <h2>这是登录页</h2>
      <button onClick={handleLogin}>点我发送登录请求</button>
    </div>
  );
}