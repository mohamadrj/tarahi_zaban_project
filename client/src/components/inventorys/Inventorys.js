import React, { Fragment, useContext, useEffect } from 'react';
import InventoryContext from '../../context/inventory/inventoryContext';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Inventoryitem from './Inventoryitem';
import Spinner from '../layout/Spinner';

const Inventorys = () => {
  const inventoryContext = useContext(InventoryContext);

  const { inventorys, filtered, getInventorys, loading } = inventoryContext;

  useEffect(() => {
    getInventorys();
    //eslint-disable-next-line
  }, []);

  if (inventorys !== null && inventorys.length === 0 && !loading) {
    return <h4>Please Add Inventory</h4>;
  }

  return (
    <Fragment>
      {inventorys !== null && !loading ? (
        <TransitionGroup>
          {filtered !== null
            ? filtered.map((inventory) => (
                <CSSTransition
                  key={inventory._id}
                  timeout={500}
                  classNames='item'
                >
                  <Inventoryitem inventory={inventory} />
                </CSSTransition>
              ))
            : inventorys.map((inventory) => (
                <CSSTransition
                  key={inventory._id}
                  timeout={500}
                  classNames='item'
                >
                  <Inventoryitem inventory={inventory} />
                </CSSTransition>
              ))}
        </TransitionGroup>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

export default Inventorys;
