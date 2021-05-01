import { SpinnerContainer } from 'components';
import { useAuthenticated } from 'hooks';
import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { Auth, Bucket, Home, ObjectPage } from './components';

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
            <Route
              path="/bucket/:name/object/:objectName"
              exact
              component={ObjectPage}
            />
            <Route path="/bucket/:name" exact component={Bucket} />
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
