import { namespace } from './actions';

export const logsStore = state => state[namespace];
export const logsById = state => state[namespace].byId;