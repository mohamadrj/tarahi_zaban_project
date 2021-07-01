import React, { useContext, useRef, useEffect } from 'react';
import InventoryContext from '../../context/inventory/inventoryContext';

const InventoryFilter = () => {
  const inventoryContext = useContext(InventoryContext);

  const text = useRef('');

  const { filterInventorys, clearFilter, filtered } = inventoryContext;

  useEffect(() => {
    if (filtered === null) {
      text.current.value = '';
    }
  });

  const onChange = (e) => {
    if (text.current.value !== '') {
      filterInventorys(e.target.value);
    } else {
      clearFilter();
    }
  };

  return (
    <form>
      <input
        ref={text}
        type='text'
        placeholder='Filter Inventorys...'
        onChange={onChange}
      />
    </form>
  );
};
export default InventoryFilter;
