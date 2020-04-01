import { all, put, takeEvery } from 'redux-saga/effects';
import * as ActionTypes from './actions';
import { AUTH_PROVIDER, API_STATUS_CODE } from 'helpers/constant';
import { authUserSocial, authUserLocal } from 'helpers/authApi'


import { push } from 'connected-react-router';

function* authUser(action) {
  const { provider, user } = action.payload;
  if (provider === AUTH_PROVIDER.GOOGLE || provider === AUTH_PROVIDER.FACEBOOK) {
    const result = yield authUserSocial(provider);

    console.log(result);
    yield;
    // if (result.data.status === API_STATUS_CODE.SUCCESS) {
    //   yield (put(ActionTypes.authSuccess(result.data.data)))
    // }
  }
  else {
    const result = yield authUserLocal(user);

    if (result.status === API_STATUS_CODE.SUCCESS) {
      yield put(ActionTypes.authSuccess(result.data.user));
      yield put(push('/keys'));
    }

  }

}

export default function* authSaga() {
  yield all([
    takeEvery(ActionTypes.AUTH_USER, authUser)
  ])
}