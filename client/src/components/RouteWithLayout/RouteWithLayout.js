import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { isAuthenticated, currentUser } from 'state/modules/auth/selector';
import { useSelector } from 'react-redux';

const RouteWithLayout = props => {
  const { layout: Layout, component: Component, requireAuth, ...rest } = props;
  const isAuthen = useSelector(isAuthenticated);
  const user = useSelector(currentUser);
  const requireAccess = [];
  if (requireAuth) {
    if (requireAccess) {
      if (requireAccess.indexOf(user.type) < 0) {
        return null;
      }
    }
    if (!isAuthen) return null;
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
  requireAccess: PropTypes.array,
  requireAuth: PropTypes.bool
};

export default RouteWithLayout;
