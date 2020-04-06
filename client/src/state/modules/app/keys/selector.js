import { namespace } from './actions'

export const keysStore = state => state[namespace];

export const keysData = state => state[namespace].byId;