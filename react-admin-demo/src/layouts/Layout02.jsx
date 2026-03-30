import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Layout02 = () => {
  return (
    <div style={{ border: '2px dashed green', minHeight: '100vh' }}>
      {/* 公共导航栏永远在上面 */}
      <Navbar /> 
      <div style={{ padding: '20px' }}>
        <h3>Layout02 区域</h3>
        {/* 子页面（UserList等）会替换掉下面的 Outlet */}
        <Outlet /> 
      </div>
    </div>
  );
};
export default Layout02;