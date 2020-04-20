import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Button } from '@material-ui/core';

import { SearchInput } from 'components';

const useStyles = makeStyles(theme => ({
  root: {},
  row: {
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1)
  },
  spacer: {
    flexGrow: 1
  },
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  },
  searchInput: {
    marginRight: theme.spacing(1)
  }
}));

const FilesToolbar = props => {
  const { className, onUpload, ...rest } = props;

  const classes = useStyles();

  const handleClickUpload = () => {
    onUpload && onUpload();
  }
  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <div className={classes.row}>
        <span className={classes.spacer} />
        <Button
          color="primary"
          onClick={handleClickUpload}
          variant="contained"
        >
          Upload file
        </Button>
      </div>
      <div className={classes.row}>
        <SearchInput
          className={classes.searchInput}
          placeholder="Search file"
        />
      </div>
    </div>
  );
};

FilesToolbar.propTypes = {
  className: PropTypes.string,
  onUpload: PropTypes.func
};

export default FilesToolbar;
