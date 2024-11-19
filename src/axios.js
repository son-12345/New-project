import axios from "axios";

// Tạo một instance của Axios với cấu hình mặc định
const api = axios.create({
  baseURL: "http://localhost:5139/api", // Địa chỉ backend của bạn
  headers: {
    "Content-Type": "application/json", // Định dạng dữ liệu yêu cầu
  },
});

// Thêm Interceptor để xử lý token (nếu cần)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Giả sử bạn lưu JWT trong localStorage
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`; // Gửi token trong header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
