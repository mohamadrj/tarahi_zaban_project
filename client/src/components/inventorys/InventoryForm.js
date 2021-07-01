import React, { useState, useContext, useEffect } from 'react';
import InventoryContext from '../../context/inventory/inventoryContext';

const InventoryForm = () => {
  const inventoryContext = useContext(InventoryContext);

  const {
    addInventory,
    current,
    clearCurrent,
    updateInventory,
  } = inventoryContext;

  useEffect(() => {
    if (current !== null) {
      setInventory(current);
    } else {
      setInventory({
        equipment: 'camera',
        model: '',
        price: '',
        invento: 'available',
      });
    }
  }, [inventoryContext, current]);

  const [inventory, setInventory] = useState({
    equipment: '',
    model: '',
    price: '',
    invento: 'available',
  });

  const { equipment, model, price, invento } = inventory;

  const onChange = (e) =>
    setInventory({ ...inventory, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (current === null) {
      addInventory(inventory);
    } else {
      updateInventory(inventory);
    }
    clearAll();
  };

  const clearAll = () => {
    clearCurrent();
  };

  return (
    <form onSubmit={onSubmit}>
      <h3 className='text-primary'>
        {current ? 'Edit Inventory' : 'Add Inventory'}
      </h3>
      <h5>Equipment</h5>
      <input
        type='radio'
        name='equipment'
        value='camera'
        onChange={onChange}
        checked={equipment === 'camera'}
      />
      Camera{' '}
      <input
        type='radio'
        name='equipment'
        value='tripod'
        onChange={onChange}
        checked={equipment === 'tripod'}
      />
      Tripod{' '}
      <input
        type='radio'
        name='equipment'
        value='light'
        onChange={onChange}
        checked={equipment === 'light'}
      />
      Light
      <input
        type='text'
        name='model'
        placeholder='Model'
        value={model}
        onChange={onChange}
      />
      <input
        type='text'
        name='price'
        placeholder='Price'
        value={price}
        onChange={onChange}
      />
      <h5>Inventory</h5>
      <input
        type='radio'
        name='invento'
        value='available'
        onChange={onChange}
        checked={invento === 'available'}
      />
      Available{' '}
      <input
        type='radio'
        name='invento'
        value='unavailable'
        onChange={onChange}
        checked={invento === 'unavailable'}
      />
      UnAvailable
      <div>
        <input
          type='submit'
          value={current ? 'Update Inventory' : 'Add Inventory'}
          className='btn btn-primary btn-block'
        />
      </div>
      {current && (
        <div>
          <button className='btn btn-light btn-block' onClick={clearAll}>
            Clear All
          </button>
        </div>
      )}
    </form>
  );
};

export default InventoryForm;
