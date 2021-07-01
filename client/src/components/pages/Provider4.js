import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Inventorys from '../inventorys/Inventorys';
import InventoryForm from '../inventorys/InventoryForm';
import InventoryFilter from '../inventorys/InventoryFilter';

import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';

const Provider4 = () => {
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
        <Link to='/hoseinahmadi'>
          <h3 className='badge badge-dark text-underlined'>Home</h3>{' '}
        </Link>
        <Link to='/hoseinahmadi/equipments'>
          <h3 className='badge badge-dark text-underlined'>
            Manage Equipments
          </h3>{' '}
        </Link>
        <Link to='/hoseinahmadi/incomes'>
          <h3 className='badge badge-dark text-underlined'>Manage Incomes</h3>{' '}
        </Link>
        <Link to='/hoseinahmadi/inventorys'>
          <h3 className='badge badge-light text-underlined'>
            Manage Inventorys
          </h3>{' '}
        </Link>
        <Link to='/hoseinahmadi/orders'>
          <h3 className='badge badge-dark text-underlined'>Manage Orders</h3>{' '}
        </Link>
      </div>
      <div>
        <InventoryForm />
      </div>
      <div>
        <InventoryFilter />
        <Inventorys />
      </div>
      <div>
        <h3 className='text-primary'>Invoice attachment</h3>
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

export default Provider4;
