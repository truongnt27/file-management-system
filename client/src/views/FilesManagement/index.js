import React, { useEffect, useState } from 'react';
import { func, array, object } from 'prop-types';
import { FilesTable, FilesToolbar } from './components';
import { makeStyles } from '@material-ui/core';
import { Selectors, Actions } from 'state/modules/app/files';
import { currentUser as currentUserSelector } from 'state/modules/auth/selector';
import { Selectors as keySelectors, Actions as keyActions } from 'state/modules/app/keys';
import { FETCH_USERS, usersSelector } from 'state/modules/app/users/actions';

import { useSelector, useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { showToast } from 'state/modules/notification';
import { TOAST_TYPE } from 'helpers/constant';
import { searchStringFromArr } from 'helpers/utils';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    padding: theme.spacing(3)
  }
}))

function FilesManagement(props) {

  const classes = useStyles();
  const { files, currentUser, onUploadFile } = props;
  const [filetoDisplay, setFiletoDisplay] = useState(files);

  const handleUploadFile = () => {
    onUploadFile && onUploadFile();
  }

  const handleSearch = (searchString) => {
    const filesDisplay = searchStringFromArr(files, ['name', 'owner.fullname'], searchString);
    setFiletoDisplay(filesDisplay);
  }

  useEffect(() => {
    setFiletoDisplay(files);
  }, [files])

  return (
    <div className={classes.root} >
      <FilesToolbar
        onSearch={handleSearch}
        onUpload={handleUploadFile}
      />
      <FilesTable
        currentUser={currentUser}
        files={filetoDisplay}
      />
    </div>
  )
}

FilesManagement.propTypes = {
  currentUser: object,
  files: array.isRequired,
  onUploadFile: func
}

const FilesManagementSmartComponent = () => {
  const filesStore = useSelector(Selectors.filesStore);
  const usersStore = useSelector(usersSelector);
  const keysStore = useSelector(keySelectors.keysStore);
  const currentUser = useSelector(currentUserSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    (filesStore.status !== 'LOADED') && dispatch({ type: Actions.FETCH_FILES });
    (usersStore.status !== 'LOADED') && dispatch({ type: FETCH_USERS });
    (keysStore.status !== 'LOADED') && dispatch({ type: keyActions.FETCH_KEYS });
  }, [filesStore.status, usersStore.status, keysStore.status])

  const files = Object.values(filesStore.byId);

  const handleUploadFile = () => {
    const allKey = keysStore.allIds || [];
    if (allKey.length > 0) {
      dispatch(push('/files/upload'))
    }
    else {
      const toast = {
        message: 'You need create a key',
        type: TOAST_TYPE.WARNING
      }
      dispatch(showToast(toast))
    }

  }

  return (
    keysStore.status === 'LOADED' &&
    <FilesManagement
      currentUser={currentUser}
      files={files}
      onUploadFile={handleUploadFile}
    />
  )
}

export default FilesManagementSmartComponent;

