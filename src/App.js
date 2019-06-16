import React from 'react';
import { Route, Switch } from 'react-router';

import './styles/main.scss';

import Home from './pages/Home';
import Error404 from './pages/404';

function App() {
  return (
    <Route>
      <Switch>
        <Route path="/" exact component={Home}/>
        <Route component={Error404}/>
      </Switch>
    </Route>
  );
}

export default App;
