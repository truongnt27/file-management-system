import React, { useEffect } from 'react';

import { FilesManagement } from '../FilesManagement';
import { useSelector, useDispatch } from 'react-redux';
import { Selectors, Actions } from 'state/modules/app/files';
import { currentUser as currentUserSelector } from 'state/modules/auth/selector';
import { FETCH_USERS, usersSelector, Status } from 'state/modules/app/users/actions';
import { uploadFile } from 'state/modules/app/files/actions';
import { STATUS } from 'helpers/constant';

const FilesManagementSmartComponent = () => {
  const filesStore = useSelector(Selectors.filesStore);
  const usersStore = useSelector(usersSelector);
  const currentUser = useSelector(currentUserSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    (filesStore.status === Actions.Status.INIT) && dispatch({ type: Actions.FETCH_FILES });
    (usersStore.status === Status.INIT) && dispatch({ type: FETCH_USERS });
  }, [filesStore.status, usersStore.status])

  const files = Object.values(filesStore.byId);
  const starredFiles = files.filter(file => (file.isFavorite && file.status !== STATUS.PENDING));
  const handleUploadFile = (file) => {
    dispatch(uploadFile(file));
  }

  return (
    filesStore.status !== Actions.Status.INIT &&
    <FilesManagement
      currentUser={currentUser}
      files={starredFiles}
      onUploadFile={handleUploadFile}
    />
  )
}

export default FilesManagementSmartComponent;
