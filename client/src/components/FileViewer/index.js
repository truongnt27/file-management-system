import React, { useState } from 'react';
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
  ListItemText,
  IconButton
} from '@material-ui/core';
import { Edit as EditIcon } from '@material-ui/icons';

import { getFileById } from 'state/modules/app/files/selector';
import { updateFileSaga } from 'state/modules/app/files/actions';
import { currentUser } from 'state/modules/auth/selector';

import { useSelector, useDispatch } from 'react-redux';
import { isEmpty, findIndex } from 'lodash';
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
    maxWidth: '400px',
    width: 'auto',
    '&:hover': {
      cursor: 'pointer'
    }
  }
}))

export function FileViewer(props) {
  const { file, open, currentUserId, onChange, onViewImage } = props;
  const classes = useStyle();
  const { owner, viewers, editors } = file;
  const updateViewers = viewers.map(user => ({ ...user, role: 'viewers' }));
  const updateEditors = editors.map(user => ({ ...user, role: 'editors' }));
  const accessUsers = [...updateEditors, ...updateViewers];
  const isEditAccess = currentUserId === owner._id || findIndex(editors, { _id: currentUserId }) !== -1;

  const [isEdit, setIsEdit] = useState(false);
  const [description, setDescription] = useState(file.description);
  const [value, setValue] = useState(0);

  const handleOpenEdit = () => {
    setIsEdit(true);
  }

  const handleChangeDescription = (e) => {
    setDescription(e.target.value);
  }

  const handleSubmitDescription = (e) => {
    const newDescription = e.target.value.trim();
    if (newDescription !== file.description) {
      const updateFile = {
        _id: file._id,
        description: newDescription
      }
      onChange && onChange(updateFile);
      setIsEdit(false);
    }
  }

  const handleChange = (event, newValue) => {
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
                onClick={onViewImage}
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
            <strong>Last modified:</strong> {file.lastModified ? moment(file.lastModified).format('DD/MM/YYYY hh:mm:ss') : '_'}
          </Typography>
        </Grid>
        <Grid
          item
        >
          <Typography
            component="span"
            variant="body1"
          >
            <strong>Creation date:</strong> {file.creationDate ? moment(file.creationDate).format('DD/MM/YYYY hh:mm:ss') : ''}
          </Typography>
        </Grid>
        <Grid
          item
        >
          {
            isEdit &&
            <textarea
              autoFocus
              name="description"
              onBlur={handleSubmitDescription}
              onChange={handleChangeDescription}
              value={description}
            />
          }
          {
            !isEdit &&
            <Typography
              component="span"
              variant="body1"
            >
              {file.description ? file.description : ' No description'}
            </Typography>
          }
          {isEditAccess &&
            <IconButton
              onClick={handleOpenEdit}
            >
              <EditIcon />
            </IconButton>}
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
  currentUserId: PropTypes.string,
  file: PropTypes.object.isRequired,
  onChange: PropTypes.func,
  onClose: PropTypes.func,
  open: PropTypes.bool
}

const FileViewerSmartComponent = (props) => {
  const dispatch = useDispatch();
  const { fileId, open = false, onClose, onViewImage } = props;
  const file = useSelector(state => getFileById(state)(fileId));
  const currentUserStore = useSelector(currentUser);
  const currentUserId = currentUserStore._id || '';

  const handleChangeFile = (file) => {
    dispatch(updateFileSaga(file));
  }

  return (
    !isEmpty(file) &&
    <FileViewer
      currentUserId={currentUserId}
      file={file}
      onChange={handleChangeFile}
      onClose={onClose}
      onViewImage={onViewImage}
      open={open}
    />
  )
}

export default FileViewerSmartComponent;