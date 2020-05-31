import React from 'react';
import {
  Divider,
  Select,
  MenuItem,
  FormControl
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import CompactUserInfo from '../../CompactUserInfo';

const useStyles = makeStyles((theme) => ({
  userAccessItem: {
    marginTop: theme.spacing(2),
    display: 'flex',
    justifyContent: 'space-between'
  },
}));

export default function UserAccessItem(props) {

  const classes = useStyles();
  const { user, role, onChange } = props;
  const [open, setOpen] = React.useState(false);

  const handleChange = (event) => {
    console.log('event.target.value', event.target.value);

    (event.target.value !== role) && onChange && onChange(user._id, event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <div className={classes.userAccessItem}>
      <CompactUserInfo
        fullname={user.fullname}
        profileImage={user.avatarPicture}
        subtitle={user.email}
      />
      <FormControl >
        <Select
          inputProps={{
            name: 'role'
          }}
          onChange={handleChange}
          onClose={handleClose}
          onOpen={handleOpen}
          open={open}
          value={role}
        >
          <MenuItem value={'editors'}>Editor</MenuItem>
          <MenuItem value={'viewers'}>Viewer</MenuItem>
          <Divider variant="inset" />
          <MenuItem value={'remove'}>Remove user</MenuItem>
        </Select>
      </FormControl>
    </div>
  )
}
