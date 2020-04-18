import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
// import { isAuthenticated } from 'state/modules/auth/selector';
// import { useSelector } from 'react-redux'

const RouteWithLayout = props => {
  const { layout: Layout, component: Component, requireAuth, ...rest } = props;

  if (requireAuth) {
    return (
      <Route
        {...rest}
        render={
          matchProps =>
            <Layout>
              <Component {...matchProps} />
            </Layout>
        }
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
