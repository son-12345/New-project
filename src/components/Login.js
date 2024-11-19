import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Login.css"; // Thêm CSS vào file của bạn

function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const loginData = {
      name: name,
      password: password,
    };

    try {
      const response = await fetch("http://localhost:5139/api/logins/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      if (response.status === 200) {
        const data = await response.json();
        console.log(data); // Kiểm tra dữ liệu trả về từ API

        // Lưu thông tin người dùng vào localStorage
        localStorage.setItem("userId", data.userId);
        localStorage.setItem("user", JSON.stringify(data));
        localStorage.setItem("token", data.Token);
        localStorage.setItem("userName", data.name);
        // Hiển thị số dư balance sau khi đăng nhập thành công
        alert(`Đăng nhập thành công! Số dư của bạn là: ${data.balance}`);

        // Chuyển hướng đến trang người dùng sau khi đăng nhập thành công
        navigate("/user");
      } else {
        alert("Đăng nhập không thành công");
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Tên người dùng"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Mật khẩu"
        />
        <button type="submit">Đăng nhập</button>
      </form>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
}

export default Login;
