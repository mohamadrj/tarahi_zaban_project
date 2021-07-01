import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Users from '../users/Users';
import UserForm from '../users/UserForm';
import UserFilter from '../users/UserFilter';

import AuthContext from '../../context/auth/authContext';

const Leader2 = () => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    authContext.loaduser();
    // eslint-disable-next-line
  }, []);

  return (
    <div className='grid-2'>
      <div className='b'>
        <Link to='/aliyavari/'>
          <h3 className='badge badge-dark  text-underlined'>Home</h3>{' '}
        </Link>
        <Link to='/aliyavari/users'>
          <h3 className='badge badge-light  text-underlined'>Manage Users</h3>{' '}
        </Link>
      </div>
      <div>
        <UserForm />
      </div>
      <div>
        <UserFilter />
        <Users />
      </div>
    </div>
  );
};

export default Leader2;
