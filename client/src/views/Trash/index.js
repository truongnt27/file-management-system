import React, { useEffect, useState } from 'react';
import { array, object } from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core';
import { FilesTable, TrashToolbar } from './components';

import { Selectors, Actions } from 'state/modules/app/files';
import { currentUser as currentUserSelector } from 'state/modules/auth/selector';
import { FETCH_USERS, usersSelector } from 'state/modules/app/users/actions';

import { STATUS } from 'helpers/constant';
import { searchStringFromArr } from 'helpers/utils';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    padding: theme.spacing(3)
  }
}))

export function Trash(props) {

  const classes = useStyles();
  const { files, currentUser } = props;
  const [filetoDisplay, setFiletoDisplay] = useState(files);

  const handleSearch = (searchString) => {
    const filesDisplay = searchStringFromArr(files, ['name', 'owner.fullname'], searchString);
    setFiletoDisplay(filesDisplay);
  }

  useEffect(() => {
    setFiletoDisplay(files);
  }, [files])

  return (
    <div className={classes.root} >
      <TrashToolbar
        onSearch={handleSearch}
      />
      <FilesTable
        currentUser={currentUser}
        files={filetoDisplay}
      />
    </div>
  )
}

Trash.propTypes = {
  currentUser: object,
  files: array.isRequired,
}

const TrashSmartComponent = () => {
  const filesStore = useSelector(Selectors.filesStore);
  const usersStore = useSelector(usersSelector);
  const currentUser = useSelector(currentUserSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    (filesStore.status === 'INIT') && dispatch({ type: Actions.FETCH_FILES });
    (usersStore.status === 'INIT') && dispatch({ type: FETCH_USERS });
  }, [filesStore.status, usersStore.status])

  const files = Object.values(filesStore.byId);
  const trashFiles = files.filter(file => file.status === STATUS.PENDING);

  return (
    filesStore.status !== 'INIT' &&
    <Trash
      currentUser={currentUser}
      files={trashFiles}
    />
  )
}

export default TrashSmartComponent;

