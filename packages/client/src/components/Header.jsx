import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  return (
    <header className='header'>
      <div className='logo'>
        <Link to='/'>Nome do App</Link>
      </div>
      <ul>
        <li>
          <Link to='/login'>
            <FaSignInAlt /> Login
          </Link>
        </li>
        <li>
          <Link to='/register'>
            <FaUser /> Cadastro
          </Link>
        </li>
        <li>
          <button className='btn'>
            <FaSignOutAlt />
          </button>
        </li>
      </ul>
    </header>
  );
};

export default Header;
