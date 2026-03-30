import { Outlet } from 'react-router-dom';

const Layout01 = () => {
  return (
    <div style={{ padding: '40px', maxWidth: '400px', margin: '0 auto', border: '2px dashed red' }}>
      <h3>Layout01 区域</h3>
      {/* 子页面（Login或Register）会替换掉下面的 Outlet */}
      <Outlet /> 
    </div>
  );
};
export default Layout01;