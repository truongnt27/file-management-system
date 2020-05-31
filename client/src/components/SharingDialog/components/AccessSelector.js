import React from 'react';
import {
  Select,
  MenuItem,
  FormControl
} from '@material-ui/core';


export default function UserAccessItem(props) {

  const { role, onChange } = props;
  const [open, setOpen] = React.useState(false);

  const handleChange = (event) => {
    (event.target.value !== role) && onChange && onChange(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <div>
      <FormControl >
        <Select
          inputProps={{
            name: 'role'
          }}
          onChange={handleChange}
          onClose={handleClose}
          onOpen={handleOpen}
          open={open}
          value={role ? role : 'viewers'}
        >
          <MenuItem value={'editors'}>Editor</MenuItem>
          <MenuItem value={'viewers'}>Viewer</MenuItem>
        </Select>
      </FormControl>
    </div>
  )
}
