// src/router/index.jsx
import { createBrowserRouter, Navigate } from 'react-router-dom';
// 引入刚刚写好的 Store
import userStore from '../store/userStore'; 

import Layout01 from '../layouts/Layout01';
import Layout02 from '../layouts/Layout02';
import Login from '../pages/Login';
import Register from '../pages/Register';
import UserList from '../pages/UserList';

// 🌟 真正的路由守卫
const PrivateRoute = ({ children }) => {
  // 直接读取 mobx 中的计算属性 isLogin
  return userStore.isLogin ? children : <Navigate to="/login" />;
};

export const router = createBrowserRouter([
  /* ... 下面的路由配置保持不变 ... */
  // ================ 布局 1：登录、注册 ================
  {
    path: '/',
    element: <Layout01 />,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: '/', element: <Navigate to="/login" /> },
    ],
  },
  // ================ 布局 2：后台增删改查 ================
  {
    path: '/admin',
    element: (
      <PrivateRoute>
        <Layout02 />
      </PrivateRoute>
    ),
    children: [
      { path: 'user', element: <UserList /> },
      { path: '', element: <Navigate to="/admin/user" /> },
    ],
  },
]);