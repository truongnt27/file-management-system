import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';

import { STATUS_COLOR } from 'helpers/constant'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'inline-block',
    borderRadius: '50%',
    flexGrow: 0,
    flexShrink: 0
  },
  sm: {
    height: theme.spacing(1),
    width: theme.spacing(1)
  },
  md: {
    height: theme.spacing(2),
    width: theme.spacing(2)
  },
  lg: {
    height: theme.spacing(3),
    width: theme.spacing(3)
  },
  PENDING: {
    backgroundColor: theme.palette.info.main
  },
  DISABLE: {
    backgroundColor: theme.palette.error.main
  },
  ENABLE: {
    backgroundColor: theme.palette.success.main
  }
}));

const StatusBullet = props => {
  const { className, size, type, ...rest } = props;

  const classes = useStyles();

  return (
    <span
      {...rest}
      className={clsx(
        {
          [classes.root]: true,
          [classes[size]]: size,
          [classes[type]]: type
        },
        className
      )}
    />
  );
};

StatusBullet.propTypes = {
  className: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  type: PropTypes.oneOf([
    STATUS_COLOR.ENABLE,
    STATUS_COLOR.DISABLE,
    STATUS_COLOR.PENDING,
  ])
};

StatusBullet.defaultProps = {
  size: 'md',
  color: 'default'
};

export default StatusBullet;
