import React from 'react';
import { Route, Switch } from 'react-router';

import './styles/main.scss';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Error404 from './pages/404';

function App() {
  return (
    <Route>
      <Switch>
        <Route path="/login" component={Login}/>
        <PrivateRoute path="/">
          <Switch>
            <Route path="/" exact component={Home}/>
            <Route component={Error404}/>
          </Switch>
        </PrivateRoute>
      </Switch>
    </Route>
  );
}

export default App;
