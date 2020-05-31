import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import {
  TotalUsers,
  TotalFiles,
  LatestActivities,
  LatestFiles
} from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const Dashboard = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={4}
      >
        <Grid
          item
          lg={8}
        >
          <Grid
            container
            spacing={4}
          >
            <Grid
              item
              lg={6}
              xs={12}
            >
              <TotalUsers />
            </Grid>
            <Grid
              item
              lg={6}
              xs={12}
            >
              <TotalFiles />
            </Grid>
            <Grid
              item
              lg={12}
              xs={12}
            >
              <LatestFiles />
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          lg={4}
          md={6}
          xl={6}
          xs={12}
        >
          <LatestActivities />
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
