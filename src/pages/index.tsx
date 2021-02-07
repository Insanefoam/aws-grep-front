import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { Auth, Home } from './components';

function AppRouter() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/home" component={Home} />
        <Redirect from="/" to="/auth" />
      </Switch>
    </BrowserRouter>
  );
}

export default AppRouter;
