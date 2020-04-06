import { namespace } from './actions';
import * as Actions from './actions';
import * as Selectors from './selector'
import filesReducer from './reducer';
import filesSaga from './saga';

export {
  filesReducer,
  filesSaga,
  Actions,
  namespace,
  Selectors
}