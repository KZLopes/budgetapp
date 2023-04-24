import axios from 'axios';

const API_URL = '/transaction/';

// Create Transaction
const createTransaction = async (transactionData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, transactionData, config);

  return response.data;
};

// Get Transactions
const getTransactions = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);

  return response.data;
};

// Update Transactions
const updateTransaction = async (id, transactionData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(API_URL + id, transactionData, config);

  return response.data;
};

// Delete Transactions
const deleteTransaction = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(API_URL + id + '/delete', id, config);

  return response.data;
};

const transactionService = {
  createTransaction,
  getTransactions,
  updateTransaction,
  deleteTransaction,
};

export default transactionService;
