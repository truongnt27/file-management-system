import { all, put, takeEvery } from 'redux-saga/effects';
import * as ActionTypes from './actions';
import { AUTH_PROVIDER, API_STATUS_CODE, TOAST_TYPE } from 'helpers/constant';
import { authUserSocial, authUserLocal, signOutApi } from 'helpers/authApi';
import { showToast } from 'state/modules/notification';
import { push } from 'connected-react-router';

const toast = {
  message: 'Something went wrong !',
  type: TOAST_TYPE.FAILED
}

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
      yield put(push('/dashboard'));
    }
    else yield put(showToast(toast));
  }
}

function* signout() {
  const res = yield signOutApi();
  yield put(push('/sign-in'));
}


export default function* authSaga() {
  yield all([
    takeEvery(ActionTypes.AUTH_USER, authUser),
    takeEvery(ActionTypes.SIGN_OUT, signout),
  ])
}