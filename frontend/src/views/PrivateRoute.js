import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { isLoggedIn } from '../helpers';

const PrivateRoute = ({ render, component, ...rest }) => {
  const routeRender = renderProps => {
    if (isLoggedIn()) {
      return render
        ? render(renderProps)
        : React.createElement(component, renderProps);
    } else {
      return (
        <Redirect
          to={{
            pathname: '/login',
            state: {
              from: renderProps.location,
            },
          }}
        />
      );
    }
  };

  return <Route {...rest} render={routeRender} />;
};

export default PrivateRoute;
