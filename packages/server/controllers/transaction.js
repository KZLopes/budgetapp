const asyncHandler = require('express-async-handler');
const Transaction = require('../models/Transaction');

module.exports = {
  // Get all Active User Transactions
  getTransactions: asyncHandler(async (req, res) => {
    const transactions = await Transaction.find({
      user: req.user.id,
      isActive: true,
    });

    res.status(200).json(transactions);
  }),

  // Add Transaction
  setTransaction: asyncHandler(async (req, res, next) => {
    try {
      const { title, value } = req.body;

      if (!title || value) {
        res.status(400);
        throw new Error('Preencha Todos os Campos');
      }

      const transaction = await Transaction.create({
        title: title,
        value: value,
        user: req.user.id,
        isIncome: value >= 0 ? true : false,
      });

      if (transaction) {
        res.status(200).json(transaction);
      } else {
        res.status(400);
        throw new Error('Algo deu Errado');
      }
    } catch (error) {
      return next(err);
    }
  }),

  // Update Transaction
  updateTransaction: asyncHandler(async (req, res, next) => {
    try {
      const transaction = await Transaction.findById(req.params.id);
      const { title, user, value } = transaction;

      if (!transaction) {
        res.status(400);
        throw new Error('Transação Não Encontrada');
      }
      // Check User`s Existence
      if (!req.user) {
        res.status(400);
        throw new Error('Usuário Não Encontrado');
      }
      // Logged User Owns Transaction
      if (user.toString() !== req.user.id) {
        res.status(400);
        throw new Error('Usuário Não Autorizado');
      }
      // Update
      const updatedTransaction = await Transaction.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            title: title,
            value: value,
            isIncome: value >= 0 ? true : false,
          },
        },
        { new: true }
      );

      res.status(200).json(updatedTransaction);
    } catch (error) {
      return next(error);
    }
  }),

  // "Delete" Transaction
  deleteTransaction: asyncHandler(async (req, res, next) => {
    try {
      const transaction = await Transaction.findById(req.params.id);
      const { user } = transaction;

      if (!transaction) {
        res.status(400);
        throw new Error('Transação Não Encontrada');
      }
      // Check User`s Existence
      if (!req.user) {
        res.status(400);
        throw new Error('Usuário Não Encontrado');
      }
      // Logged User Owns Transaction
      if (user.toString() !== req.user.id) {
        res.status(400);
        throw new Error('Usuário Não Autorizado');
      }
      // "Delete"
      const updatedTransaction = await Transaction.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            isActive: false,
          },
        },
        { new: true }
      );
      res.status(200).json(updatedTransaction);
    } catch (error) {
      return next(err);
    }
  }),
};
