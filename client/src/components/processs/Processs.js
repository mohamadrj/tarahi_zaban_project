import React, { Fragment, useContext, useEffect } from 'react';
import ProcessContext from '../../context/process/processContext';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Processitem from './Processitem';
import Spinner from '../layout/Spinner';

const Processs = () => {
  const processContext = useContext(ProcessContext);

  const { processs, filtered, getProcesss, loading } = processContext;

  useEffect(() => {
    getProcesss();
    //eslint-disable-next-line
  }, []);

  if (processs !== null && processs.length === 0 && !loading) {
    return <h4>Please Add Process</h4>;
  }

  return (
    <Fragment>
      {processs !== null && !loading ? (
        <TransitionGroup>
          {filtered !== null
            ? filtered.map((process) => (
                <CSSTransition
                  key={process._id}
                  timeout={500}
                  classNames='item'
                >
                  <Processitem process={process} />
                </CSSTransition>
              ))
            : processs.map((process) => (
                <CSSTransition
                  key={process._id}
                  timeout={500}
                  classNames='item'
                >
                  <Processitem process={process} />
                </CSSTransition>
              ))}
        </TransitionGroup>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

export default Processs;
