import { namespace } from './actions'

export const filesStore = state => state[namespace];

export const filesData = state => state[namespace].byId;

export const getFileById = state => id => state[namespace].byId[id];