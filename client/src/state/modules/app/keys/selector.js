import { namespace } from './actions';
import { createSelector } from 'reselect';

export const keysStore = state => state[namespace];

export const keysData = state => state[namespace].byId;

export const getKeyById = createSelector(
  (state, props) => state[namespace].byId[props.keyId],
  key => key
)