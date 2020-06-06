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

const UsersToolbar = props => {
  const { className, onOpenDialog, onSearch, ...rest } = props;
  const [searchString, setSearchString] = React.useState('');

  const classes = useStyles();

  const handleChange = (e) => {
    e.persist();
    onSearch && onSearch(e.target.value);
    setSearchString(e.target.value);
  }

  const handlClickCreateUser = () => {
    onOpenDialog && onOpenDialog();
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
          onClick={handlClickCreateUser}
          variant="contained"
        >
          Add user
        </Button>
      </div>
      <div className={classes.row}>
        <SearchInput
          className={classes.searchInput}
          onChange={handleChange}
          placeholder="Search user"
          value={searchString}
        />
      </div>
    </div>
  );
};

UsersToolbar.propTypes = {
  className: PropTypes.string,
  onOpenDialog: PropTypes.func,
  onSearch: PropTypes.func
};

export default UsersToolbar;
