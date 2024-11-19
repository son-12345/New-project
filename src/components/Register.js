import React, { useState } from 'react';
import axios from 'axios';
import { redirect } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newUser = {
      name,
      password,
    };

    try {
      const response = await axios.post('http://localhost:5139/api/registers/register', newUser);
      console.log(response)
      if (response.status === 200) {
        alert(response.data);
        navigate('/login');
      } else {
        alert('Đăng kí không thành công');

      }
      // Thành công
    } catch (error) {
      setMessage('Có lỗi xảy ra khi đăng ký người dùng');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Tên người dùng"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="password"
        placeholder="Mật khẩu"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Đăng ký</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default RegisterForm;
