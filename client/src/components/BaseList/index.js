import React from 'react';
import { arrayOf, oneOfType, number, string } from 'prop-types';

import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  Avatar,
  Divider
} from '@material-ui/core'

export default function BaseList(props) {
  const list = props.list;
  return (
    <List>
      {list && list.map((item, index) => (
        <>
          <ListItem
            button
            key={item.id}
          >
            <ListItemAvatar>
              <Avatar
                src={item.avatarPicture}
              />
            </ListItemAvatar>
            <ListItemText
              primary={item.primary}
              secondary={
                <React.Fragment>
                  <Typography
                    color="textPrimary"
                    component="span"
                    variant="body2"
                  >
                    {item.secondary}
                  </Typography>
                </React.Fragment>
              }
            />
          </ListItem>
          {
            (index !== list.length - 1) &&
            <Divider
              component="li"
            />
          }
        </>
      ))}
    </List>
  )
}

BaseList.propTypes = {
  list: arrayOf({
    primay: string,
    secondary: string,
    avatarPicture: string,
    id: oneOfType([number, string])
  })
}

