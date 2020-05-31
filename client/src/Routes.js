import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Redirect } from 'react-router-dom';
import { RouteWithLayout } from './components';
import { Main as MainLayout, Minimal as MinimalLayout } from './layouts';

import {
  NotFound as NotFoundView,
  Logs as LogsView,
  SignIn as SignInView,
  SignUp as SignUpView,
  Account as AccountView,
  FilesManagement as FilesManagementView,
  UserList as UserListView,
  Dashboard as DashboardView
} from './views';

import { boot } from 'state/modules/app';

const Routes = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(boot())
  }, [])
  return (
    <Switch>
      <Redirect
        exact
        from="/"
        to="/dashboard"
      />
      <RouteWithLayout
        component={DashboardView}
        exact
        layout={MainLayout}
        path="/dashboard"
        requireAuth
      />
      <RouteWithLayout
        component={AccountView}
        exact
        layout={MainLayout}
        path="/account"
        requireAuth
      />
      <RouteWithLayout
        component={FilesManagementView}
        exact
        layout={MainLayout}
        path="/files"
        requireAuth
      />
      <RouteWithLayout
        component={LogsView}
        exact
        layout={MainLayout}
        path="/logs"
        requireAccess={['Manager', 'Admin']}
        requireAuth
      />
      <RouteWithLayout
        component={UserListView}
        exact
        layout={MainLayout}
        path="/users"
        requireAccess={['Manager', 'Admin']}
        requireAuth
      />
      <RouteWithLayout
        component={SignInView}
        exact
        layout={MinimalLayout}
        path="/sign-in"
      />
      <RouteWithLayout
        component={SignUpView}
        exact
        layout={MinimalLayout}
        path="/sign-up"
      />
      <RouteWithLayout
        component={NotFoundView}
        exact
        layout={MinimalLayout}
        path="/not-found"
      />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Routes;
