import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { SIGN_OUT } from 'state/modules/auth/actions';
import { topbarNotifiSelector, FETCH_NOTIFIS, markAsReadSaga } from 'state/modules/notification';
import Topbar from './Topbar'

const TopbarSmartComponent = ({ onSidebarOpen }) => {
  const dispatch = useDispatch();

  const notificationStore = useSelector(topbarNotifiSelector);
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch({ type: FETCH_NOTIFIS })
    }, 1000 * 10);
    return () => clearInterval(interval);
  }, []);

  const notifications = Object.values(notificationStore.byId);
  const handleSignOut = () => {
    dispatch({ type: SIGN_OUT });
  }

  const handleNotifiClick = (ids) => {
    dispatch(markAsReadSaga(ids))
  }

  return (
    <Topbar
      notifications={notifications}
      onNotifiClick={handleNotifiClick}
      onSidebarOpen={onSidebarOpen}
      onSignout={handleSignOut}
    />
  )
}
TopbarSmartComponent.propTypes = {
  className: PropTypes.string,
  onSidebarOpen: PropTypes.func
};

export default TopbarSmartComponent;