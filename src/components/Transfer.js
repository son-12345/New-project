import React, { useState } from "react";
import "../css/Transfer.css"; // Bạn có thể tạo file CSS này tùy chỉnh giao diện
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function Transfer() {
  const senderId = localStorage.getItem("userId"); // Lấy userId từ localStorage
  const [receiverId, setReceiverId] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false); // Thêm trạng thái đang xử lý
  const navigate = useNavigate(); // Dùng để điều hướng

  const handleTransfer = async (e) => {
    e.preventDefault();

    // Kiểm tra số tiền chuyển hợp lệ
    if (isNaN(amount) || parseFloat(amount) <= 0) {
      setMessage("Số tiền phải là một số hợp lệ và lớn hơn 0.");
      return;
    }

    if (!senderId) {
      setMessage("Bạn cần đăng nhập để thực hiện giao dịch.");
      return;
    }

    // Bắt đầu xử lý chuyển tiền
    setIsProcessing(true);

    try {
      const response = await fetch(`http://localhost:5139/api/transfers/${senderId}/transfer/${receiverId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: parseFloat(amount), // Chuyển đổi amount thành số thực
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data); // Kiểm tra dữ liệu trả về từ API

        alert(`Chuyển tiền thành công! Số dư còn lại: ${data.senderNewBalance}`);
        // Điều hướng sau khi thành công
        navigate("/user");
      } else {
        const error = await response.text();
        setMessage(`Lỗi: ${error}`);
      }
    } catch (error) {
      setMessage("Có lỗi xảy ra trong quá trình chuyển tiền.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="transfer-container">
      <h1>Chuyển tiền</h1>
      <form onSubmit={handleTransfer}>
        <label>
          Mã người nhận:
          <input
            type="text"
            value={receiverId}
            onChange={(e) => setReceiverId(e.target.value)}
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
        <button type="submit" disabled={isProcessing}>
          {isProcessing ? "Đang xử lý..." : "Chuyển tiền"}
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Transfer;
