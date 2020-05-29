import React, { useState } from 'react';
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
  },
  inputFile: {
    display: 'none'
  }
}));

const FilesToolbar = props => {
  const { className, onUpload, onSearch, ...rest } = props;
  const [searchString, setSearchString] = useState('');
  const classes = useStyles();

  const handleChange = (e) => {
    e.persist();
    onSearch && onSearch(e.target.value);
    setSearchString(e.target.value);
  }

  const handleInputChange = (e) => {
    onUpload && onUpload(e.target.files[0]);
  }

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <div className={classes.row}>
        <span className={classes.spacer} />
        <input
          className={classes.inputFile}
          id="contained-button-file"
          multiple
          name="file"
          onChange={handleInputChange}
          type="file"
        />
        <label htmlFor="contained-button-file">
          <Button
            color="primary"
            component="span"
            variant="contained"
          >
            Upload file
          </Button>
        </label>
      </div>
      <div className={classes.row}>
        <SearchInput
          className={classes.searchInput}
          onChange={handleChange}
          placeholder="Search file"
          value={searchString}
        />
      </div>
    </div>
  );
};

FilesToolbar.propTypes = {
  className: PropTypes.string,
  onSearch: PropTypes.func,
  onUpload: PropTypes.func
};

export default FilesToolbar;
