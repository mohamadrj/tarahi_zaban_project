import React, { Fragment, useContext, useEffect } from 'react';
import EquipmentContext from '../../context/equipment/equipmentContext';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Equipmentitem from './Equipmentitem';
import Spinner from '../layout/Spinner';

const Equipments = () => {
  const equipmentContext = useContext(EquipmentContext);

  const { equipments, filtered, getEquipments, loading } = equipmentContext;

  useEffect(() => {
    getEquipments();
    //eslint-disable-next-line
  }, []);

  if (equipments !== null && equipments.length === 0 && !loading) {
    return <h4>Please Add Equipment</h4>;
  }

  return (
    <Fragment>
      {equipments !== null && !loading ? (
        <TransitionGroup>
          {filtered !== null
            ? filtered.map((equipment) => (
                <CSSTransition
                  key={equipment._id}
                  timeout={500}
                  classNames='item'
                >
                  <Equipmentitem equipment={equipment} />
                </CSSTransition>
              ))
            : equipments.map((equipment) => (
                <CSSTransition
                  key={equipment._id}
                  timeout={500}
                  classNames='item'
                >
                  <Equipmentitem equipment={equipment} />
                </CSSTransition>
              ))}
        </TransitionGroup>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

export default Equipments;
