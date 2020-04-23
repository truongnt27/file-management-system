import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import MomentUtils from '@date-io/moment';
import {
  Typography,
  Toolbar,
} from '@material-ui/core';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import moment from 'moment';

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
  fromDate: {
    marginRight: theme.spacing(1)
  }
}));

const EnhancedTableToolbar = props => {
  const classes = useToolbarStyles();
  const { fromDate, toDate, onFromDate, onToDate } = props;

  const handleToDateChange = (date) => {
    onToDate && onToDate(date);
  };

  const handleFromDateChange = (date) => {
    onFromDate && onFromDate(date);
  };

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
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <div style={{ display: 'flex' }} >
            <KeyboardDatePicker
              className={classes.fromDate}
              format="DD/MM/YYYY"
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
              label="From date"
              name="fromDate"
              onChange={handleFromDateChange}
              value={fromDate}
              variant="inline"
            />
            <KeyboardDatePicker
              className={classes.toDate}
              format="DD/MM/YYYY"
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
              label="To date"
              name="toDate"
              onChange={handleToDateChange}
              value={toDate}
              variant="inline"
            />
          </div>
        </MuiPickersUtilsProvider>
      </div>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  fromDate: PropTypes.string.isRequired,
  onFromDate: PropTypes.func.isRequired,
  onToDate: PropTypes.func.isRequired,
  toDate: PropTypes.string.isRequired,
};

export default EnhancedTableToolbar;
