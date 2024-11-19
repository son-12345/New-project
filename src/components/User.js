import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/User.css";

function User() {
  const [userData, setUserData] = useState({ name: "" });
  const [showSettings, setShowSettings] = useState(false); // Trạng thái hiển thị menu cài đặt
  const navigate = useNavigate();

  useEffect(() => {
    // Lấy dữ liệu người dùng từ API hoặc localStorage
    const savedUserName = localStorage.getItem("userName"); // Kiểm tra xem tên người dùng có trong localStorage không

    if (savedUserName) {
      setUserData({ name: savedUserName }); // Sử dụng tên từ localStorage
    } else {
      fetch("http://localhost:5139/api/users/profile?username=")
        .then((response) => response.json())
        .then((data) => {
          setUserData(data); // Cập nhật state với dữ liệu từ API
          localStorage.setItem("userName", data.name); // Lưu lại tên người dùng
        })
        .catch((error) => console.error("Error fetching user data:", error));
    }
  }, []);

  const handleLogout = () => {
    // Xử lý đăng xuất (xóa token, điều hướng về trang đăng nhập)
    localStorage.removeItem("token"); // Xóa token lưu trong localStorage
    localStorage.removeItem("userName"); // Xóa tên người dùng khỏi localStorage
    navigate("/login"); // Điều hướng về trang đăng nhập
  };

  return (
    <div className="home-container">
      <div className="user-profile">
        <div className="user-avatar">
          {/* Hiển thị tên người dùng */}
          <span>{userData.name || "Người dùng"}</span>
        </div>
        <div className="settings-container">
          <button
            className="settings-btn"
            onClick={() => setShowSettings(!showSettings)}
          >
            ⚙️ Cài đặt
          </button>
          {showSettings && (
            <div className="settings-dropdown">
              <button onClick={handleLogout}>Đăng xuất</button>
            </div>
          )}
        </div>
      </div>

      <h1>Welcome to ATMBank</h1>
      <p>Quản lý tài khoản ngân hàng của bạn một cách dễ dàng và an toàn.</p>

      <div className="features">
        <h2>Các tính năng của bạn:</h2>
        <ul>
          <li>
            <Link to="/deposit" className="btn">
              💳 Nạp tiền nhanh chóng
            </Link>
            <Link to="/transfer" className="btn">
              💸 Chuyển tiền dễ dàng
            </Link>
            <Link to="/history" className="btn">
              📜 Theo dõi lịch sử giao dịch
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default User;
