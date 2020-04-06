import React from 'react';
import { Switch, Redirect } from 'react-router-dom';
import { RouteWithLayout } from './components';
import { Main as MainLayout, Minimal as MinimalLayout } from './layouts';

import {
  NotFound as NotFoundView,
  Logs as LogsView,
  SignIn as SignInView,
  SignUp as SignUpView,
  KeyList as KeyListView,
  Account as AccountView,
  FilesManagement as FilesManagementView
} from './views';

import { CreateKey as CreateKeyView } from './views/KeyList/components';
import { FileUpload as FilesUploadView } from './views/FilesManagement/components';

const Routes = () => {
  return (
    <Switch>
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
        component={FilesUploadView}
        exact
        layout={MainLayout}
        path="/files/upload"
        requireAuth
      />
      <RouteWithLayout
        component={LogsView}
        exact
        layout={MainLayout}
        path="/logs"
        requireAuth
      />
      <RouteWithLayout
        component={KeyListView}
        exact
        layout={MainLayout}
        path="/keys"
        requireAuth
      />
      <RouteWithLayout
        component={CreateKeyView}
        exact
        layout={MainLayout}
        path="/keys/create"
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
