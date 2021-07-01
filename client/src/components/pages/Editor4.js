import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

import AlertContext from '../../context/alert/alertContext';

import AuthContext from '../../context/auth/authContext';

const Editor4 = () => {
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);

  const { setAlert } = alertContext;

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
          <h3 className='badge badge-dark  text-underlined'>
            Manage Processes
          </h3>{' '}
        </Link>
        <Link to='/rezasamavat/expectations'>
          <h3 className='badge badge-dark  text-underlined'>
            Customer Expectations
          </h3>{' '}
        </Link>
        <Link to='/rezasamavat/samples'>
          <h3 className='badge badge-light  text-underlined'>
            Sample Of Movie
          </h3>{' '}
        </Link>
      </div>
      <div>
        <h3 className='text-primary'>Add Sample movie</h3>
        <input type='file' />
        <input
          onClick={() => setAlert('The Multer for Upload Crashed', 'danger')}
          type='submit'
          value='Add'
          className='btn btn-primary btn-block'
        />
      </div>
    </div>
  );
};

export default Editor4;
