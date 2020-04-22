import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import {
  OutlinedInput,
  Select,
  Typography,
  Toolbar,
} from '@material-ui/core';

const useToolbarStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
}));

const EnhancedTableToolbar = props => {
  const classes = useToolbarStyles();

  return (
    <Toolbar
      className={classes.root}
    >
      <div className={classes.title}>
        <Typography
          id="tableTitle"
          variant="h6"
        >
          All logs
        </Typography>
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        <div style={{ display: 'flex' }}>
          <Select
            input={
              <OutlinedInput
                name="age"
                style={{ width: '200px', height: '40px' }}
              />
            }
            native
          // onChange={handleChange('age')}

          >
            <option value="" > Last week</option>
            <option value={10}>Last month</option>
            <option value={20}>Last year</option>
          </Select>
        </div>
      </div>
    </Toolbar >
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onDownload: PropTypes.func.isRequired,
  onViewDetail: PropTypes.func.isRequired,
};

export default EnhancedTableToolbar;
