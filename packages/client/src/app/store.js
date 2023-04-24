import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/slice';
import transactionReducer from '../features/transaction/slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    transactions: transactionReducer,
  },
});
