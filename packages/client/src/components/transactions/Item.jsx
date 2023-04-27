import { /*FaPencilAlt*/ FaTrashAlt } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import {
  /*updateTransaction,*/
  deleteTransaction,
} from '../../features/transaction/slice';

const Item = ({ transaction }) => {
  const dispatch = useDispatch();

  return (
    <>
      <div className={`transaction ${transaction.isIncome ? 'isIncome' : ''}`}>
        <div>
          {new Date(transaction.date).toLocaleString('pt-br', {
            timeZone: 'UTC',
            dateStyle: 'short',
          })}
        </div>
        <h3>{transaction.title}</h3>
        <h2>R$ {transaction.value.toFixed(2)}</h2>
        <div className='options'>
          {/* <button onClick={() => dispatch(updateTransaction(transaction._id))}>
            <FaPencilAlt />
          </button> */}
          <button onClick={() => dispatch(deleteTransaction(transaction._id))}>
            <FaTrashAlt />
          </button>
        </div>
      </div>
    </>
  );
};

export { Item as TransactionItem };
