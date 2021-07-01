import React, { useContext, useRef, useEffect } from 'react';
import EquipmentContext from '../../context/equipment/equipmentContext';

const EquipmentFilter = () => {
  const equipmentContext = useContext(EquipmentContext);

  const text = useRef('');

  const { filterEquipments, clearFilter, filtered } = equipmentContext;

  useEffect(() => {
    if (filtered === null) {
      text.current.value = '';
    }
  });

  const onChange = (e) => {
    if (text.current.value !== '') {
      filterEquipments(e.target.value);
    } else {
      clearFilter();
    }
  };

  return (
    <form>
      <input
        ref={text}
        type='text'
        placeholder='Filter Equipments...'
        onChange={onChange}
      />
    </form>
  );
};
export default EquipmentFilter;
