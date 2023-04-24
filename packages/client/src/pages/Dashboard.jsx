import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getTransactions, reset } from '../features/transaction/slice';
import Summary from '../components/transactions/Summary';
import { TransactionForm } from '../components/transactions/Form';
import { TransactionItem } from '../components/transactions/Item';
import Spinner from '../components/Spinner';

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { transactions, isLoading, isError, message } = useSelector(
    (state) => state.transactions
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    if (!user) {
      navigate('/login');
    } else {
      dispatch(getTransactions());
    }
    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className='heading'>
        <h1>Olá {user && user.name}</h1>
        <p>Painel</p>
      </section>
      <TransactionForm />
      <div className='heading'>
        <p>Resumo</p>
      </div>
      <Summary transactions={transactions} />
      <section className='content'>
        {transactions.length > 0 ? (
          <div className='transactions'>
            {transactions.map((transaction) => (
              <TransactionItem
                key={transaction._id}
                transaction={transaction}
              />
            ))}
          </div>
        ) : (
          <h3>Parece que você ainda não adicionou nenhuma transação</h3>
        )}
      </section>
    </>
  );
};

export default Dashboard;
