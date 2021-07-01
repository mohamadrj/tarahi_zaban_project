import React, { useContext, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import ContactContext from '../../context/contact/contactContext';
import IncomeContext from '../../context/income/incomeContext';
import FormContext from '../../context/form/formContext';

const Navbar = ({ title, icon }) => {
  const authContext = useContext(AuthContext);
  const contactContext = useContext(ContactContext);
  const incomeContext = useContext(IncomeContext);
  const formContext = useContext(FormContext);

  const { isAuthenticated, logout, user } = authContext;
  const { clearContacts } = contactContext;
  const { clearIncomes } = incomeContext;
  const { clearForms } = formContext;

  const onLogout = () => {
    logout();
    clearContacts();
    clearIncomes();
    clearForms();
  };

  const authLinks = (
    <Fragment>
      <li>Hello {user && user.name}</li>
      <li>
        <a href='#!' onClick={onLogout}>
          <i className='fas fa-sign-out-alt'></i>{' '}
          <span className='hide-sm'>Logout</span>
        </a>
      </li>
    </Fragment>
  );

  const guessLinks = (
    <Fragment>
      <li>
        <Link to='/register'>Register</Link>
      </li>
      <li>
        <Link to='/login'>Login</Link>
      </li>
    </Fragment>
  );

  return (
    <div className='navbar bg-primary'>
      <h2>
        <i className={icon} /> {title}
      </h2>
      <ul>{isAuthenticated ? authLinks : guessLinks}</ul>
    </div>
  );
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
};

Navbar.defaultProps = {
  title: 'Studio Sokout',
  icon: 'fas fa-video',
};

export default Navbar;
