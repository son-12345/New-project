import React from "react";
import { Link } from "react-router-dom";
import "../css/Home.css"; // Tùy chọn thêm CSS để cải thiện giao diện

function Home() {
  return (
    <div className="home-container">
      <h1>Welcome to ATMBank</h1>
      <p>Quản lý tài khoản ngân hàng của bạn một cách dễ dàng và an toàn.</p>
      <div className="home-links">
        <Link to="/login" className="btn">Đăng nhập</Link>
        <Link to="/register" className="btn">Đăng ký</Link>
      </div>
      <div className="features">
        <h2>Các tính năng nổi bật:</h2>
        <ul>
          <li>💳 Nạp tiền nhanh chóng</li>
          <li>💸 Chuyển tiền dễ dàng</li>
          <li>📜 Theo dõi lịch sử giao dịch</li>
        </ul>
      </div>
    </div>
  );
}

export default Home;
