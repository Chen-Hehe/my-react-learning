// 引入 observer
import { observer } from "mobx-react-lite"; 
import { useNavigate } from "react-router-dom";
import userStore from "../store/userStore";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    userStore.logout(); // 清除 token
    navigate("/login"); // 踢回登录页
  };

  return (
    <div style={{ background: '#1677ff', color: 'white', padding: '15px', display: 'flex', justifyContent: 'space-between' }}>
      <div>我是后台导航栏</div>
      <div>
        {/* 这里展示了 Mobx 里的 token，如果不加 observer，token 变了这里也不会更新！ */}
        <span style={{ marginRight: '15px' }}>当前Token: {userStore.token}</span>
        <button onClick={handleLogout}>退出登录</button>
      </div>
    </div>
  );
};

// 🌟 必须要用 observer 包裹组件导出！
export default observer(Navbar);