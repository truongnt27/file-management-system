import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { isAuthenticated } from 'state/modules/auth/selector';
import { useSelector } from 'react-redux'

const RouteWithLayout = props => {
  const { layout: Layout, component: Component, requireAuth, ...rest } = props;
  const isLoggined = true;
  

  if (requireAuth) {
    return (
      <Route
        {...rest}
        render={matchProps => {
          return isLoggined ? (
            <Layout>
              <Component {...matchProps} />
            </Layout>
          ) :
            <Redirect to="/sign-in" />
        }}
      />
    );
  }

  return (
    <Route
      {...rest}
      render={matchProps => (
        <Layout>
          <Component {...matchProps} />
        </Layout>
      )}
    />
  );
};

RouteWithLayout.propTypes = {
  component: PropTypes.any.isRequired,
  layout: PropTypes.any.isRequired,
  path: PropTypes.string,
  requireAuth: PropTypes.bool
};

export default RouteWithLayout;
