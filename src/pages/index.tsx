import { SpinnerContainer } from 'components';
import { useAuthenticated } from 'hooks';
import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { Spinner } from 'UI';
import { Auth, Bucket, Home } from './components';

function AppRouter() {
  const [isAuthenticated, isLoading] = useAuthenticated();

  if (isLoading) {
    return <SpinnerContainer />;
  }

  return (
    <BrowserRouter>
      <Switch>
        {isAuthenticated ? (
          <React.Fragment>
            <Route path="/home" component={Home} />
            <Route path="/bucket/:name" component={Bucket} />
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
