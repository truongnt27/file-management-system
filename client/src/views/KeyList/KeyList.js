import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';

import { KeysToolbar, KeysTable } from './components';
import mockData from './data';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const KeyList = () => {
  const classes = useStyles();

  const [keys] = useState(mockData);

  return (
    <div className={classes.root}>
      <KeysToolbar />
      <div className={classes.content}>
        <KeysTable keys={keys} />
      </div>
    </div>
  );
};

export default KeyList;
