import { namespace, Status } from './actions';

export const isAuthenticated = state => (state[namespace].status === Status.AUTH_SUCCESS) ? true : false;
export const currentUser = state => state[namespace].user || {};