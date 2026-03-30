import { useEffect, useState } from "react";
// 引入我们刚刚配置好的 Axios 拦截器实例
import request from "../api/request"; 

const UserList = () => {
  // ====================== 1. 搜索条件状态 (受控组件) ======================
  const [searchParams, setSearchParams] = useState({
    username: "", // 搜索用户名
    status: "",   // 搜索状态
  });

  // ====================== 2. 分页状态 ======================
  const [pagination, setPagination] = useState({
    pageNum: 1,   // 当前页
    pageSize: 10, // 每页条数
    total: 0,     // 总条数
  });

  // ====================== 3. 列表与加载状态 ======================
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  // ====================== 4. 获取列表数据（核心方法） ======================
  const getList = async () => {
    setLoading(true);
    try {
      // 发送请求：自动携带查询条件 + 分页参数
      const res = await request.get("/user/list", {
        params: {
          ...searchParams,
          pageNum: pagination.pageNum,
          pageSize: pagination.pageSize,
        },
      });
      // 假设后台返回格式：{ rows: [], total: 100 }
      // 更新列表和总条数
      setList(res.rows || []);
      setPagination((prev) => ({
        ...prev,
        total: res.total || 0,
      }));
    } catch (err) {
      console.error("获取列表失败", err);
    } finally {
      setLoading(false);
    }
  };

  // ====================== 5. 搜索与重置逻辑 ======================
  // 搜索：重置页码为1，触发 useEffect
  const handleSearch = () => {
    setPagination((prev) => ({ ...prev, pageNum: 1 }));
    // 注意：这里的 getList() 也可以省略，完全依靠 useEffect 监听 pageNum 变化来触发
    getList(); 
  };

  // 重置：清空搜索条件并重置页码为1
  const handleReset = () => {
    setSearchParams({ username: "", status: "" });
    setPagination((prev) => ({ ...prev, pageNum: 1 }));
    getList();
  };

  // ====================== 6. 分页操作逻辑 ======================
  const handlePageChange = (pageNum, pageSize) => {
    setPagination((prev) => ({ ...prev, pageNum, pageSize }));
  };

  // ====================== 7. 生命周期与监听 (替代 mounted 和 watch) ======================
  useEffect(() => {
    getList();
  }, [pagination.pageNum, pagination.pageSize]); // 依赖数组：只要这两个值变了，就重新请求

  return (
    <div style={{ padding: "20px" }}>
      <h2>用户管理（查询 + 分页 + CRUD）</h2>

      {/* ====================== 查询表单区 ====================== */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "20px",
          padding: "15px",
          border: "1px solid #eee",
          borderRadius: "4px",
        }}
      >
        {/* 受控组件：输入框 */}
        <input
          placeholder="用户名"
          value={searchParams.username}
          onChange={(e) =>
            setSearchParams({ ...searchParams, username: e.target.value })
          }
        />
        {/* 受控组件：下拉框 */}
        <select
          value={searchParams.status}
          onChange={(e) =>
            setSearchParams({ ...searchParams, status: e.target.value })
          }
        >
          <option value="">全部状态</option>
          <option value="1">正常</option>
          <option value="0">禁用</option>
        </select>
        <button onClick={handleSearch} disabled={loading}>
          查询
        </button>
        <button onClick={handleReset} disabled={loading}>
          重置
        </button>
      </div>

      {/* ====================== 操作按钮区 ====================== */}
      <div style={{ marginBottom: "15px" }}>
        <button onClick={() => alert("打开新增弹窗")}>新增用户</button>
      </div>

      {/* ====================== 数据列表区 ====================== */}
      <div style={{ position: "relative" }}>
        {/* 条件渲染：加载动画 */}
        {loading && <div style={{ position: "absolute", top: "20px" }}>加载中...</div>}
        
        <table border="1" cellPadding="8" width="100%" style={{ borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>用户名</th>
              <th>状态</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {/* 列表渲染：使用 map 替代 v-for */}
            {list.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.username}</td>
                {/* 三元运算符替代 v-if */}
                <td>{item.status === 1 ? "正常" : "禁用"}</td>
                <td>
                  <button onClick={() => alert("编辑：" + item.id)}>编辑</button>
                  <button
                    style={{ marginLeft: "5px" }}
                    onClick={() => alert("删除：" + item.id)}
                  >
                    删除
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ====================== 分页控制区 ====================== */}
      <div
        style={{
          marginTop: "20px",
          display: "flex",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        <button
          disabled={pagination.pageNum === 1 || loading}
          onClick={() => handlePageChange(pagination.pageNum - 1, pagination.pageSize)}
        >
          上一页
        </button>
        <span>
          第 {pagination.pageNum} 页 / 共{" "}
          {Math.ceil(pagination.total / pagination.pageSize)} 页
        </span>
        <span>总条数：{pagination.total}</span>
        <button
          disabled={
            pagination.pageNum >= Math.ceil(pagination.total / pagination.pageSize) || loading
          }
          onClick={() => handlePageChange(pagination.pageNum + 1, pagination.pageSize)}
        >
          下一页
        </button>
        <select
          value={pagination.pageSize}
          onChange={(e) => handlePageChange(1, Number(e.target.value))}
        >
          <option value={10}>10条/页</option>
          <option value={20}>20条/页</option>
          <option value={50}>50条/页</option>
        </select>
      </div>
    </div>
  );
};

export default UserList;