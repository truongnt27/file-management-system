import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Drawer,
  Typography,
  makeStyles,
  Grid,
  Avatar,
  Tooltip,
  Divider,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText
} from '@material-ui/core'

import { getFileById } from 'state/modules/app/files/selector';
// import { FETCH_USERS, usersSelector } from 'state/modules/app/users/actions';

import { useSelector, useDispatch } from 'react-redux';
import { isEmpty } from 'lodash';
import genAvataImg from 'helpers/genAvataImg';
import moment from 'moment';

const useStyle = makeStyles(theme => ({
  root: {
    margin: 0
  },
  container: {
    padding: theme.spacing(2),
    minWidth: '450px'
  },
  avatarItem: {
    marginRight: theme.spacing(1)
  },
  userAccess: {
    display: 'flex',
    marginBottom: theme.spacing(1)
  },
  verticalDivider: {
    backgroundColor: 'rgba(0, 0, 0, 0.12)',
    width: '1px',
    margin: '0 4px 0 4px'
  },
  imageContainer: {
    maxHeight: '300px',
    width: 'auto'
  },
  previewImage: {
    maxHeight: '240px',
    width: 'auto'
  }
}))

export function FileViewer(props) {
  const { file, open } = props;
  const classes = useStyle();
  const { owner, viewers, editors } = file;
  const updateViewers = viewers.map(user => ({ ...user, role: 'viewers' }));
  const updateEditors = editors.map(user => ({ ...user, role: 'editors' }));
  const accessUsers = [...updateEditors, ...updateViewers];

  const [value, setValue] = React.useState(0);
  function handleChange(event, newValue) {
    setValue(newValue);
  }

  const handleClose = () => {
    const { onClose } = props;
    onClose && onClose();
  }

  const generateActivities = () => {
    const logs = file.activities;
    return (
      <List>
        {logs.map((log) => (
          <>
            <ListItem
              key={log._id}
            >
              <ListItemAvatar>
                <Avatar
                  alt="Remy Sharp"
                  src={log.userId && log.userId.avatarPicture}
                />
              </ListItemAvatar>
              <ListItemText
                primary={log.userId ? log.userId.fullname : '_'}
                secondary={
                  <React.Fragment>
                    <Typography
                      color="textPrimary"
                      component="span"
                      variant="body2"
                    >
                      {log.description}
                    </Typography>
                    {`${moment(log.time).format('DD/MM/YYYY hh:mm:ss')}`}
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider
              component="li"
              variant="inset"
            />
          </>
        ))}
      </List>
    )
  }

  const generateDetail = () => {
    return (
      <>
        <Grid item>
          <div className={classes.imageContainer}>
            {
              file.type === 'Image' &&
              <img
                className={classes.previewImage}
                src={`http://localhost:3002/api/files/${file._id}/download`}
              />
            }
          </div>
        </Grid>
        <Grid
          item
        >
          <div className={classes.userAccess}>
            <Tooltip
              title={`${owner.fullname} is owner`}
            >
              <Avatar
                src={owner.avatarPicture}
              >
                {genAvataImg(owner.fullname).displayName}
              </Avatar>
            </Tooltip>
            <hr className={classes.verticalDivider} />
            {accessUsers.map(user => {
              const { displayName } = genAvataImg(user.fullname);
              const title = `${user.fullname} can ${user.role === 'editors' ? 'edit' : 'view'}`
              return (
                <Tooltip
                  title={title}
                >
                  <Avatar
                    className={classes.avatarItem}
                    src={user.avatarPicture}
                  >
                    {displayName}
                  </Avatar>
                </Tooltip>
              )
            })}
          </div>
        </Grid>
        <Grid
          item
        >
          <Typography
            component="span"
            variant="body1"
          >
            <strong>Owner:</strong> {owner.fullname}
          </Typography>
        </Grid>
        <Grid
          item
        >
          <Typography
            component="span"
            variant="body1"
          >
            <strong>Type:</strong> {file.type}
          </Typography>
        </Grid>
        <Grid
          item
        >
          <Typography
            component="span"
            variant="body1"
          >
            <strong>Size:</strong>: {Math.floor(file.size / 1024)} KB
          </Typography>
        </Grid>
        <Grid
          item
        >
          <Typography
            component="span"
            variant="body1"
          >
            <strong>Link:</strong> <a >{`http://localhost:3000/file/${file._id}`}</a>
          </Typography>
        </Grid>
        <Grid
          item
        >
          <Typography
            component="span"
            variant="body1"
          >
            <strong>Last modified:</strong>
          </Typography>
        </Grid>
        <Grid
          item
        >
          <Typography
            component="span"
            variant="body1"
          >
            <strong>Creation date:</strong> {file.creationDate}
          </Typography>
        </Grid>
        <Grid
          item
        >
          <Typography
            component="span"
            variant="body1"
          >
            <strong>Description:</strong> {file.creationDate ? file.creationDate : ' No description'}
          </Typography>
        </Grid>
      </>
    )
  }

  return (
    <Drawer
      anchor="right"
      className={classes.root}
      onClose={handleClose}
      open={open}
    >
      <Grid
        className={classes.container}
        container
        direction="column"
        spacing={3}
      >
        <Grid
          item
        >
          <Typography variant="h3">
            {file.name}
          </Typography>
          <Tabs
            onChange={handleChange}
            textColor="primary"
            value={value}
          >
            <Tab label="detail" />
            <Tab label="activities" />
          </Tabs>
          <Divider />
        </Grid>
        {value === 0 ? generateDetail() : generateActivities()}
      </Grid>
    </Drawer>
  )
}

FileViewer.propTypes = {
  file: PropTypes.object.isRequired,
  onClose: PropTypes.func,
  open: PropTypes.bool,
  sharedUsers: PropTypes.array.isRequired
}

const FileViewerSmartComponent = (props) => {
  //const dispatch = useDispatch();
  const { fileId, open = false, onClose } = props;
  const file = useSelector(state => getFileById(state)(fileId));
  const handleClose = () => {
    onClose && onClose();
  }

  return (
    !isEmpty(file) &&
    <FileViewer
      file={file}
      onClose={handleClose}
      open={open}
    />
  )
}

export default FileViewerSmartComponent;