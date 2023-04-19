const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    isIncome: {
      type: Boolean,
      required: true,
    },
    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Transaction', TransactionSchema);
