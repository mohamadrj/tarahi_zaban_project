import React, { useState, useContext, useEffect } from 'react';
import EquipmentContext from '../../context/equipment/equipmentContext';

const EquipmentForm = () => {
  const equipmentContext = useContext(EquipmentContext);

  const {
    addEquipment,
    current,
    clearCurrent,
    updateEquipment,
  } = equipmentContext;

  useEffect(() => {
    if (current !== null) {
      setEquipment(current);
    } else {
      setEquipment({
        movid: '',
        camera: '',
        tripod: '',
        light: '',
      });
    }
  }, [equipmentContext, current]);

  const [equipment, setEquipment] = useState({
    movid: '',
    camera: '',
    tripod: '',
    light: '',
  });

  const { movid, camera, tripod, light } = equipment;

  const onChange = (e) =>
    setEquipment({ ...equipment, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (current === null) {
      addEquipment(equipment);
    } else {
      updateEquipment(equipment);
    }
    clearAll();
  };

  const clearAll = () => {
    clearCurrent();
  };

  return (
    <form onSubmit={onSubmit}>
      <h3 className='text-primary'>
        {current ? 'Edit Equipment' : 'Add Equipment'}
      </h3>
      <input
        type='text'
        name='movid'
        placeholder='Movie ID'
        value={movid}
        onChange={onChange}
      />
      <input
        type='text'
        name='camera'
        placeholder='camera'
        value={camera}
        onChange={onChange}
      />
      <input
        name='tripod'
        type='text'
        placeholder='tripod'
        value={tripod}
        onChange={onChange}
      />
      <input
        name='light'
        type='text'
        placeholder='light'
        value={light}
        onChange={onChange}
      />

      <div>
        <input
          type='submit'
          value={current ? 'Update Equipment' : 'Add Equipment'}
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

export default EquipmentForm;
