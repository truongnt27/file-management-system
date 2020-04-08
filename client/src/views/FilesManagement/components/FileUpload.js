import React, { useState, useEffect } from 'react';

import {
  CardContent,
  Typography,
  IconButton,
  Button,
  Grid,
  makeStyles,
  Card,
  CardActions
} from '@material-ui/core';

import KeysTableViewer from 'components/KeysTableViewer'
import { PhotoCamera } from '@material-ui/icons';
import Selector from 'react-select';
import { useDispatch, useSelector } from 'react-redux';

import { Selectors, Actions } from 'state/modules/app/keys'
import { uploadFile } from 'state/modules/app/files/actions';
import { usersSelector, FETCH_USERS } from 'state/modules/app/users/actions';

import { get, isEmpty } from 'lodash';

const useStyles = makeStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(3)
  },
  chooseFile: {
    minWidth: '450px'
  },
  inputFile: {
    display: 'none'
  },
  selector: {
    maxWidth: '300px'
  }
}))


const FileUpload = () => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const keysStore = useSelector(Selectors.keysStore);
  const keys = keysStore.byId;
  const defaultKeyId = keysStore.allIds[0];

  const [file, setFile] = useState(null);
  const [selectedKey, setSelectedKey] = useState(defaultKeyId);

  const keysArr = Object.values(keys).reduce((acc, key) => {
    if (key.status === 'ENABLE') {
      acc.push({ value: key._id, label: key.alias });
    }
    return acc;
  }, [])

  const usersStore = useSelector(usersSelector);

  useEffect(
    () => {
      usersStore.status !== 'LOADED' && dispatch({ type: FETCH_USERS });
      keysStore.status !== 'LOADED' && dispatch({ type: Actions.FETCH_KEYS });
    }, [usersStore.status, keysStore.status])

  const permissions = Object.keys(get(keys, [selectedKey, 'permissions'], []));

  const selectedUsers = !isEmpty(usersStore.byId) ? permissions.map(userId => usersStore.byId[userId]) : [];
  console.log(selectedUsers);

  const ownerId = get(keys, [selectedKey, 'owner'], '');
  const ownerData = get(usersStore, ['byId', ownerId], {});

  const handleChange = (e) => {
    setFile(e.target.files[0])
  }

  const hanldeSelectKey = (selectedOption) => {
    setSelectedKey(selectedOption.value)
  }

  const handleUpload = () => {
    dispatch(uploadFile(file));
  }

  return (
    <div
      className={classes.root}
    >
      <Card >
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              className={classes.chooseFile}
              item
              xs={12}
            >
              <Typography variant="body1">
                Choose a file:
              </Typography>
              <input
                className={classes.inputFile}
                id="contained-button-file"
                name="file"
                onChange={handleChange}
                type="file"
              />
              <label htmlFor="contained-button-file">
                <IconButton
                  aria-label="upload picture"
                  color="primary"
                  component="span"
                >
                  <PhotoCamera />
                </IconButton>
              </label>
              <Typography
                component="span"
                variant="body2"
              >{file === null ? 'No file chosen' : file.name}
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
            >
              <Typography variant="body1">
                Choose a key:
              </Typography>
              <Selector
                className={classes.selector}
                onChange={hanldeSelectKey}
                options={keysArr}
                value={keysArr.filter(key => key.value === selectedKey)}
              />
            </Grid>
            <Grid
              item
              xs={12}
            >
              <Typography variant="body1">
                Owner: {ownerData ? ownerData.fullname : '_'}
              </Typography>
              <Typography variant="body1">
                Usage:
                <KeysTableViewer
                  selectedKey={keys[selectedKey]}
                  selectedUsers={selectedUsers}
                />
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <Button
            color="primary"
            disabled={!file}
            onClick={handleUpload}
            variant="contained"
          >
            Upload
          </Button>
        </CardActions>
      </Card>
    </div>
  )
}

export default FileUpload;