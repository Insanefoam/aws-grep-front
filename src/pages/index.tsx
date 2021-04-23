import { useAuthenticated } from 'hooks';
import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { Auth, Home } from './components';

function AppRouter() {
  const isAuthenticated = useAuthenticated();

  return (
    <BrowserRouter>
      <Switch>
        {isAuthenticated ? (
          <React.Fragment>
            <Route path="/home" component={Home} />
            <Redirect from="/" to="/home" />
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Route path="/auth" component={Auth} />
            <Redirect from="/" to="/auth" />
          </React.Fragment>
        )}
      </Switch>
    </BrowserRouter>
  );
}

export default AppRouter;
