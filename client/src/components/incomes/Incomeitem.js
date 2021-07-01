import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import IncomeContext from '../../context/income/incomeContext';

const Incomeitem = ({ income }) => {
  const incomeContext = useContext(IncomeContext);
  const { deleteIncome, setCurrent, clearCurrent } = incomeContext;

  const { _id, num, total, spend, profit } = income;

  const onDelete = () => {
    deleteIncome(_id);
    clearCurrent();
  };
  return (
    <div className='card bg-light'>
      <h3 className='fas fa-file-alt text-primary text-left'>{num} </h3>
      <ul className='list'>
        {spend && (
          <li>
            {' '}
            <i className='fas fa-dollar-sign'></i> {total}
          </li>
        )}
      </ul>
      <ul className='list'>
        {spend && (
          <li>
            {' '}
            <i className='fas fa-minus'></i> {spend}
          </li>
        )}
      </ul>
      <ul className='list'>
        {profit && (
          <li>
            {' '}
            <i className='fas fa-plus'></i> {profit}
          </li>
        )}
      </ul>
      <p>
        <button
          className='btn btn-dark btn-sm'
          onClick={() => setCurrent(income)}
        >
          Edit
        </button>
        <button className='btn btn-danger btn-sm' onClick={onDelete}>
          Delete
        </button>
      </p>
    </div>
  );
};

Incomeitem.propTypes = {
  income: PropTypes.object.isRequired,
};

export default Incomeitem;
