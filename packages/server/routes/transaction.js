const express = require('express');
const router = express.Router();
const {
  getTransactions,
  setTransaction,
  updateTransaction,
  deleteTransaction,
} = require('../controllers/transaction');
const { protect } = require('../middleware/auth');

router.get('/', protect, getTransactions);
router.post('/', protect, setTransaction);
router.put('/:id', protect, updateTransaction);
router.put('/:id/delete', protect, deleteTransaction);

module.exports = router;
