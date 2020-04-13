import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'

import { makeStyles } from '@material-ui/styles';
import { KeysToolbar, KeysTable } from './components';
import { Selectors, Actions } from 'state/modules/app/keys';

// style
const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

// component
const KeyList = () => {
  const classes = useStyles();
  const keysStore = useSelector(Selectors.keysStore);
  const dispatch = useDispatch();

  useEffect(() => {
    (keysStore.status !== 'LOADED') && dispatch({ type: Actions.FETCH_KEYS })
  }, [keysStore.status]);

  const keys = Object.values(keysStore.byId);

  return (
    <div className={classes.root}>
      <KeysToolbar />
      <div className={classes.content}>
        <KeysTable
          keys={keys}
          loading={keysStore.status === 'LOADING'}
        />
      </div>
    </div>
  );
};

export default KeyList;
