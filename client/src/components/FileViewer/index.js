import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Drawer,
  Typography,
  makeStyles,
  Grid,
  Chip,
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

import { Person, VpnKey } from '@material-ui/icons'
import { Actions, Selectors } from 'state/modules/app/keys';
import { Selectors as keysSelector } from 'state/modules/app/files';
import { FETCH_USERS, usersSelector } from 'state/modules/app/users/actions';

import { useSelector, useDispatch } from 'react-redux';
import { isEmpty, get } from 'lodash';
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
  icons: {
    verticalAlign: 'middle'
  },
  chips: {
    marginRight: theme.spacing(1)
  }
}))

export function FileViewer(props) {
  const { file, sharedUsers, open } = props;
  const classes = useStyle();
  const { owner } = file || '';

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
        <Grid
          item
        >
          <Typography
            component="span"
            variant="body1"
          >
            <strong>Owner:</strong> {owner.fullname}
          </Typography>
          <Person className={classes.icons} />
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
            <strong>Last access:</strong>
          </Typography>
        </Grid>
        <Grid
          item
        >
          <Typography
            component="span"
            variant="body1"
          >
            <strong>Protected by:</strong> {file.keyId.alias}
          </Typography>
          <VpnKey
            className={classes.icons}
            style={{ color: 'green' }}
          />
        </Grid>
        <Grid
          item
        >
          <Typography
            component="span"
            variant="body1"
          >
            <strong>Shared with:</strong>
          </Typography>
        </Grid>
        <Grid item>
          {
            sharedUsers.map(user => {
              const { displayName } = genAvataImg(user.fullname);
              return (
                <Tooltip
                  title={user.email}
                >
                  <Chip
                    avatar={(
                      <Avatar
                        src={user.avatarPicture}
                      >
                        {displayName}
                      </Avatar>)}

                    className={classes.chips}
                    color="primary"
                    label={user.fullname}
                    variant="outlined"
                  />
                </Tooltip>
              )
            })
          }
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
  sharedUsers: PropTypes.array.isRequired
}

const FileViewerSmartComponent = (props) => {
  const keysStore = useSelector(Selectors.keysStore);
  const usersStore = useSelector(usersSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    (keysStore.status !== 'LOADED') && dispatch({ type: Actions.FETCH_KEYS });
    (usersStore.status !== 'LOADED') && dispatch({ type: FETCH_USERS });
  }, [keysStore.status, usersStore.status])

  const { fileId, open = false, onClose } = props;
  const file = useSelector(state => keysSelector.getFileById(state)(fileId));
  const keyId = get(file, 'keyId._id', '');
  const keyData = useSelector(state => Selectors.getKeyById(state, keyId));

  if (isEmpty(file) || isEmpty(keyData)) {
    return null;
  }

  const { permissions = {} } = keyData;

  const selectedUsers = Object.keys(permissions).map(userId => get(usersStore, ['byId', userId], ''));
  const sharedUsers = selectedUsers.filter(user => user._id !== file.owner._id);

  const handleClose = () => {
    onClose && onClose();
  }

  return (
    <FileViewer
      file={file}
      onClose={handleClose}
      open={open}
      sharedUsers={sharedUsers}
    />
  )
}

export default FileViewerSmartComponent;