import { namespace } from './actions';
import * as Actions from './actions';
import filesReducer from './reducer';
import filesSaga from './saga'

export {
  filesReducer,
  filesSaga,
  Actions,
  namespace
}