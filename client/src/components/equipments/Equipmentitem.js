import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import EquipmentContext from '../../context/equipment/equipmentContext';

const Equipmentitem = ({ equipment }) => {
  const equipmentContext = useContext(EquipmentContext);
  const { deleteEquipment, setCurrent, clearCurrent } = equipmentContext;

  const { _id, movid, camera, tripod, light } = equipment;

  const onDelete = () => {
    deleteEquipment(_id);
    clearCurrent();
  };
  return (
    <div className='card bg-light'>
      <h3 className='fas fa-file-alt text-primary text-left'>{movid} </h3>
      <ul className='list'>
        {camera && (
          <li>
            {' '}
            <i className='fas fa-camera'></i> {camera}
          </li>
        )}
      </ul>
      <ul className='list'>
        {tripod && (
          <li>
            {' '}
            <i className='fab fa-autoprefixer'></i> {tripod}
          </li>
        )}
      </ul>
      <ul className='list'>
        {light && (
          <li>
            {' '}
            <i className='fas fa-lightbulb'></i> {light}
          </li>
        )}
      </ul>
      <p>
        <button
          className='btn btn-dark btn-sm'
          onClick={() => setCurrent(equipment)}
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

Equipmentitem.propTypes = {
  equipment: PropTypes.object.isRequired,
};

export default Equipmentitem;
