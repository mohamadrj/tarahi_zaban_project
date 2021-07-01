import React, { Fragment } from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import Home2 from './components/pages/Home2';
import Provider from './components/pages/Provider';
import Provider2 from './components/pages/Provider2';
import Provider3 from './components/pages/Provider3';
import Provider4 from './components/pages/Provider4';
import Provider5 from './components/pages/Provider5';

import Editor from './components/pages/Editor';
import Editor2 from './components/pages/Editor2';
import Editor3 from './components/pages/Editor3';
import Editor4 from './components/pages/Editor4';

import Leader from './components/pages/Leader';
import Leader2 from './components/pages/Leader2';

import About from './components/pages/About';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alerts from './components/layout/Alerts';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/routing/PrivateRoute';

import ContactState from './context/contact/ContactState';
import FormState from './context/form/FormState';
import IncomeState from './context/income/IncomeState';
import EquipmentState from './context/equipment/EquipmentState';
import InventoryState from './context/inventory/InventoryState';
import ProcessState from './context/process/ProcessState';
import UserState from './context/user/UserState';

import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';

import setAuthToken from './utils/setAuthToken';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <AuthState>
      <ContactState>
        <FormState>
          <IncomeState>
            <InventoryState>
              <EquipmentState>
                <ProcessState>
                  <UserState>
                    <AlertState>
                      <Router>
                        <Fragment>
                          <Navbar />
                          <div className='container'>
                            <Alerts />
                            <Switch>
                              <PrivateRoute exact path='/' component={Home} />
                              <PrivateRoute
                                exact
                                path='/hoseinahmadi'
                                component={Provider}
                              />
                              <PrivateRoute
                                exact
                                path='/hoseinahmadi/equipments'
                                component={Provider2}
                              />
                              <PrivateRoute
                                exact
                                path='/hoseinahmadi/incomes'
                                component={Provider3}
                              />
                              <PrivateRoute
                                exact
                                path='/hoseinahmadi/inventorys'
                                component={Provider4}
                              />
                              <PrivateRoute
                                exact
                                path='/hoseinahmadi/orders'
                                component={Provider5}
                              />
                              <PrivateRoute
                                exact
                                path='/rezasamavat'
                                component={Editor}
                              />
                              <PrivateRoute
                                exact
                                path='/rezasamavat/processes'
                                component={Editor2}
                              />
                              <PrivateRoute
                                exact
                                path='/rezasamavat/expectations'
                                component={Editor3}
                              />
                              <PrivateRoute
                                exact
                                path='/rezasamavat/samples'
                                component={Editor4}
                              />
                              <PrivateRoute
                                exact
                                path='/aliyavari/'
                                component={Leader}
                              />
                              <PrivateRoute
                                exact
                                path='/aliyavari/users'
                                component={Leader2}
                              />
                              <PrivateRoute
                                exact
                                path='/forms'
                                component={Home2}
                              />

                              <Route exact path='/about' component={About} />
                              <Route
                                exact
                                path='/register'
                                component={Register}
                              />
                              <Route exact path='/login' component={Login} />
                            </Switch>
                          </div>
                        </Fragment>
                      </Router>
                    </AlertState>
                  </UserState>
                </ProcessState>
              </EquipmentState>
            </InventoryState>
          </IncomeState>
        </FormState>
      </ContactState>
    </AuthState>
  );
};

export default App;
