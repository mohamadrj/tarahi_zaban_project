import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

import TAllForms from '../forms/TAllForms';
import TAllFormForm from '../forms/TAllFormForm';
import FormFilter from '../forms/FormFilter';

import AuthContext from '../../context/auth/authContext';

const Editor2 = () => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    authContext.loaduser();
    // eslint-disable-next-line
  }, []);

  return (
    <div className='grid-2'>
      <div className='b'>
        <Link to='/rezasamavat/'>
          <h3 className='badge badge-dark  text-underlined'>Home</h3>{' '}
        </Link>
        <Link to='/rezasamavat/processes'>
          <h3 className='badge badge-light  text-underlined'>
            Manage Processes
          </h3>{' '}
        </Link>
        <Link to='/rezasamavat/expectations'>
          <h3 className='badge badge-dark  text-underlined'>
            Customer Expectations
          </h3>{' '}
        </Link>
        <Link to='/rezasamavat/samples'>
          <h3 className='badge badge-dark  text-underlined'>Sample Of Movie</h3>{' '}
        </Link>
      </div>
      <div>
        <TAllFormForm />
      </div>
      <div>
        <FormFilter />
        <TAllForms />
      </div>
    </div>
  );
};

export default Editor2;
