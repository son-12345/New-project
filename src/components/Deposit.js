import React, { useState } from "react";
import "../css/Deposit.css"; // Tùy chỉnh CSS
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function DepositPage() {
  const [userId, setUserId] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  
  // Khởi tạo useNavigate
  const navigate = useNavigate();

  const handleDeposit = async (e) => {
    e.preventDefault();

    // Kiểm tra xem amount có phải là một số hợp lệ hay không
    if (isNaN(amount) || parseFloat(amount) <= 0) {
      setMessage("Số tiền phải là một số hợp lệ và lớn hơn 0.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5139/api/deposits/${userId}/deposit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: parseFloat(amount) }), // Chuyển đổi amount thành số thực
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log(data); // Kiểm tra dữ liệu trả về từ API

        alert(`Nạp tiền thành công! Số dư mới: ${data.newBalance}`);
        
        // Sau khi nạp tiền thành công, điều hướng người dùng về trang chủ (hoặc trang khác)
        navigate('/user'); // Điều hướng về trang /user (hoặc trang chủ bạn muốn)
      } else {
        const error = await response.text();
        setMessage(`Lỗi: ${error}`);
      }
    } catch (error) {
      setMessage("Có lỗi xảy ra trong quá trình nạp tiền.");
    }
  };

  return (
    <div className="deposit-container">
      <h1>Nạp tiền</h1>
      <form onSubmit={handleDeposit}>
        <label>
          Mã người dùng:
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
          />
        </label>
        <label>
          Số tiền:
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </label>
        <button type="submit">Nạp tiền</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default DepositPage;
