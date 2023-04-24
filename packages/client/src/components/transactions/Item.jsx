import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import {
  updateTransaction,
  deleteTransaction,
} from '../../features/transaction/slice';

const Item = ({ transaction }) => {
  const dispatch = useDispatch();

  return (
    <>
      <div className={`transaction ${transaction.isIncome ? 'isIncome' : ''}`}>
        {/* <div>{new Date(transaction.createdAt).toLocaleString('pt-br')}</div> */}
        <h2>{transaction.title}</h2>
        <div className='options'>
          <button onClick={() => dispatch(updateTransaction(transaction._id))}>
            <FaPencilAlt />
          </button>
          <button onClick={() => dispatch(deleteTransaction(transaction._id))}>
            <FaTrashAlt />
          </button>
        </div>
      </div>
    </>
  );
};

export { Item as TransactionItem };
