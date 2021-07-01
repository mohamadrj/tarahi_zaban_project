import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Incomes from '../incomes/Incomes';
import IncomeForm from '../incomes/IncomeForm';
import IncomeFilter from '../incomes/IncomeFilter';

import Equipments from '../equipments/Equipments';
import EquipmentForm from '../equipments/EquipmentForm';
import EquipmentFilter from '../equipments/EquipmentFilter';

import AuthContext from '../../context/auth/authContext';

const Provider = () => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    authContext.loaduser();
    // eslint-disable-next-line
  }, []);

  return (
    <div className='grid-2'>
      <div className='b'>
        <Link to='/hoseinahmadi'>
          <h3 className='badge badge-light text-underlined'>Home</h3>{' '}
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
          <h3 className='badge badge-dark text-underlined'>
            Manage Inventorys
          </h3>{' '}
        </Link>
        <Link to='/hoseinahmadi/orders'>
          <h3 className='badge badge-dark text-underlined'>Manage Orders</h3>{' '}
        </Link>
      </div>
    </div>
  );
};

export default Provider;
