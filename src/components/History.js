import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/History.css"

function TransactionHistory() {
  const [transactions, setTransactions] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      navigate("/login"); // Nếu không có userId, chuyển hướng đến trang đăng nhập
    } else {
      // Lấy lịch sử giao dịch từ API
      fetch(`http://localhost:5139/api/transfers/history/${userId}`)
        .then((response) => response.json())
        .then((data) => {
          if (data && data.length > 0) {
            setTransactions(data);
          } else {
            setMessage("Không có giao dịch nào.");
          }
        })
        .catch((error) => {
          setMessage("Có lỗi xảy ra khi tải lịch sử giao dịch.");
        });
    }
  }, [navigate]);

  return (
    <div>
      <h1>Lịch sử giao dịch</h1>
      {message && <p>{message}</p>}
      {transactions.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>ID Giao Dịch</th>
              <th>Người Gửi</th>
              <th>Người Nhận</th>
              <th>Số Tiền</th>
              <th>Ngày</th>
              <th>Trạng Thái</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.transferId}>
                <td>{transaction.transferId}</td>
                <td>{transaction.senderId}</td>
                <td>{transaction.receiverId}</td>
                <td>{transaction.amount}</td>
                <td>{new Date(transaction.transferDate).toLocaleString()}</td>
                <td>{transaction.isSuccessful ? "Thành công" : "Thất bại"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default TransactionHistory;
