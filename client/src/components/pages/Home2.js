import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Forms from '../forms/Forms';
import FormForm from '../forms/FormForm';
import FormFilter from '../forms/FormFilter';
import AuthContext from '../../context/auth/authContext';

const Home2 = () => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    authContext.loaduser();
    // eslint-disable-next-line
  }, []);

  return (
    <div className='grid-2'>
      <div className='b'>
        <Link to='/'>
          <h3 className='badge badge-dark  text-underlined'>Home</h3>{' '}
        </Link>
        <Link to='/forms'>
          <h3 className='badge badge-light  text-underlined'>
            Fill Out The Form
          </h3>{' '}
        </Link>
      </div>
      <div>
        <FormForm />
      </div>
      <div>
        <FormFilter />
        <Forms />
      </div>
    </div>
  );
};

export default Home2;
