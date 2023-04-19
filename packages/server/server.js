const path = require('path');
const express = require('express');
const app = express();
const dotenv = require('dotenv').config({ path: './config/.env' });
const connectBD = require('./config/db');
const userRoutes = require('./routes/user');
const transactionRoutes = require('./routes/transaction');
const PORT = process.env.PORT || 5000;

// Connect to DB
connectBD();

// Body Parsing
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Routes
app.use('/user', userRoutes);
app.use('/transaction', transactionRoutes);

app.listen(PORT, () => {
  console.log(`Server Started on Port ${PORT}`);
});
