import React, { useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, Grid, Typography, Avatar } from '@material-ui/core';
import { Folder } from '@material-ui/icons';
import { useSelector, useDispatch } from 'react-redux';
import { filesStore as store } from 'state/modules/app/files/selector';
import { FETCH_FILES } from 'state/modules/app/files/actions';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText
  },
  content: {
    alignItems: 'center',
    display: 'flex'
  },
  title: {
    fontWeight: 700
  },
  avatar: {
    backgroundColor: theme.palette.white,
    color: theme.palette.primary.main,
    height: 56,
    width: 56
  },
  icon: {
    height: 32,
    width: 32
  }
}));

export const TotalFiles = props => {
  const { className, totalFiles, ...rest } = props;

  const classes = useStyles();

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent>
        <Grid
          container
          justify="space-between"
        >
          <Grid item>
            <Typography
              className={classes.title}
              color="inherit"
              gutterBottom
              variant="body2"
            >
              TOTAL FILES
            </Typography>
            <Typography
              color="inherit"
              variant="h3"
            >
              {totalFiles}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <Folder className={classes.icon} />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

TotalFiles.propTypes = {
  className: PropTypes.string,
  totalFiles: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

const TotalFilesSmartComponent = () => {
  const filesStore = useSelector(store);

  const totalFiles = filesStore.allIds.length;
  const dispatch = useDispatch();

  useEffect(() => {
    filesStore.status === 'INIT' && dispatch({ type: FETCH_FILES })
  }, [filesStore.status])

  return (
    <TotalFiles
      totalFiles={totalFiles}
    />
  )
}
export default TotalFilesSmartComponent;
