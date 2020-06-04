import React, { useEffect, useState } from 'react';
import { func, array, object } from 'prop-types';
import { FilesTable, FilesToolbar } from './components';
import { makeStyles } from '@material-ui/core';
import { Selectors, Actions } from 'state/modules/app/files';
import { currentUser as currentUserSelector } from 'state/modules/auth/selector';
import { FETCH_USERS, usersSelector } from 'state/modules/app/users/actions';

import { useSelector, useDispatch } from 'react-redux';
import { searchStringFromArr } from 'helpers/utils';
import { uploadFile } from 'state/modules/app/files/actions';
import { STATUS } from 'helpers/constant';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    padding: theme.spacing(3)
  }
}))

export function FilesManagement(props) {

  const classes = useStyles();
  const { files, currentUser, onUploadFile } = props;
  const [filetoDisplay, setFiletoDisplay] = useState(files);

  const handleUploadFile = (file) => {
    onUploadFile && onUploadFile(file);
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
  const currentUser = useSelector(currentUserSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    (filesStore.status !== 'LOADED') && dispatch({ type: Actions.FETCH_FILES });
    (usersStore.status !== 'LOADED') && dispatch({ type: FETCH_USERS });
  }, [filesStore.status, usersStore.status])

  const files = Object.values(filesStore.byId);
  const displayFiles = files.filter(file => file.status !== STATUS.PENDING);
  const handleUploadFile = (file) => {
    dispatch(uploadFile(file));
  }

  return (
    filesStore.status === 'LOADED' &&
    <FilesManagement
      currentUser={currentUser}
      files={displayFiles}
      onUploadFile={handleUploadFile}
    />
  )
}

export default FilesManagementSmartComponent;

