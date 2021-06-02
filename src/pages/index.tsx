import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { Auth, Bucket, Home, ObjectPage } from './components';

function AppRouter() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/home" component={Home} />
        <Route
          path="/bucket/:name/object/:objectName"
          exact
          component={ObjectPage}
        />
        <Route path="/bucket/:name" exact component={Bucket} />
        <Route path="/auth" component={Auth} />
        <Redirect path="/" to="/auth" />
      </Switch>
    </BrowserRouter>
  );
}

export default AppRouter;
