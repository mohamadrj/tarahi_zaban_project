import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import InventoryContext from '../../context/inventory/inventoryContext';

const Inventoryitem = ({ inventory }) => {
  const inventoryContext = useContext(InventoryContext);
  const { deleteInventory, setCurrent, clearCurrent } = inventoryContext;

  const { _id, equipment, model, price, invento } = inventory;

  const onDelete = () => {
    deleteInventory(_id);
    clearCurrent();
  };
  return (
    <div className='card bg-light'>
      <h3 className='text-primary text-left'>
        <i className='fas fa-briefcase'></i> {equipment} <span>{model}</span>
        <span
          style={{ float: 'right' }}
          className={
            'badge ' +
            (invento === 'unavailable' ? 'badge-danger' : 'badge-success')
          }
        >
          {invento}
        </span>
      </h3>
      <ul className='list'>
        {price && (
          <li>
            {' '}
            <i className='fas fa-dollar-sign'></i> {price}
          </li>
        )}
      </ul>
      <p>
        <button
          className='btn btn-dark btn-sm'
          onClick={() => setCurrent(inventory)}
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

Inventoryitem.propTypes = {
  inventory: PropTypes.object.isRequired,
};

export default Inventoryitem;
