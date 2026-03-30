import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import "./App.css"; // 如果不需要默认样式，这行也可以删掉

function App() {
  // 把我们配置好的 router 实例交给 RouterProvider 提供给整个应用
  return <RouterProvider router={router} />;
}

export default App;