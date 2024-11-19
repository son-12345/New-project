import axios from "axios";

// Base URL của API backend
const API_BASE_URL = "http://localhost:5139/api"; // Cập nhật đúng URL backend của bạn

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// APIs liên quan đến User
export const getAllUsers = () => api.get("/logins");
export const getUserById = (id) => api.get(`/logins/${id}`);
export const createUser = (user) => api.post("http://localhost:5139/logins");
export const updateUser = (id, user) => api.put(`/logins/${id}`, user);
export const deleteUser = (id) => api.delete(`/logins/${id}`);

// APIs liên quan đến Account
export const getAccountById = (id) => api.get(`/accounts/${id}`);
export const createAccount = (account) => api.post("/accounts", account);
export const depositToAccount = (id, amount) =>
  api.post(`/accounts/${id}/deposit`, { amount });
export const updateAccount = (id, account) =>
  api.put(`/accounts/${id}`, account);
export const deleteAccount = (id) => api.delete(`/accounts/${id}`);

// APIs liên quan đến Transaction
export const getTransactionsByAccountId = (accountId) =>
  api.get(`/transactions/account/${accountId}`);
export const createTransaction = (transaction) =>
  api.post("/transactions", transaction);
export const updateTransaction = (id, transaction) =>
  api.put(`/transactions/${id}`, transaction);
export const deleteTransaction = (id) => api.delete(`/transactions/${id}`);

// APIs liên quan đến Deposit


// Lấy lịch sử giao dịch của tài khoản
export const getHistory = async (userId) => {
  const response = await axios.get(`http://localhost:5139/transactions/history/${userId}`);
  return response.data;
};

export const register = async (userData) => {
  const response = await axios.post(`http://localhost:5139/api/users/register`, userData);
  return response.data;
};

// Đăng nhập người dùng

