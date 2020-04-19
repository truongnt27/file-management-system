import React, { useMemo } from 'react';
import { string, arrayOf, element, shape, any } from 'prop-types';
import { Avatar, makeStyles } from '@material-ui/core';
import genAvataImg from 'helpers/genAvataImg';

const useStyles = makeStyles(theme => ({
  root: {
    margin: 0,
    display: 'flex'
  },
  avatorContainer: {
    marginRight: theme.spacing(1)
  },
  fullname: {
    fontSize: '14px'
  },
  subtitle: {
    fontSize: '12px',
    color: 'rgba(0,0,0,0.54)'
  }
}))

const CompactUserInfo = (props) => {
  const classes = useStyles();
  const { fullname, profileImage, avatarSize, avatarFontSize } = props;
  const { displayName, backgroundColor } = useMemo(() => genAvataImg(fullname), fullname);

  const avatarStyle = {
    width: avatarSize,
    height: avatarSize,
    fontSize: avatarFontSize,
    backgroundColor
  }

  const { subtitle, badges } = props;
  return (
    <div className={classes.root}>
      <div className={classes.avatorContainer}>
        <Avatar
          src={profileImage}
          style={avatarStyle}
        >
          {displayName}
        </Avatar>
      </div>
      <div >
        <div >
          <div className={classes.fullname} >{fullname}</div>
          <div>{badges}</div>
        </div>
        <div className={classes.subtitle} >
          {subtitle}
        </div>
      </div>
    </div>
  )
}

CompactUserInfo.propTypes = {
  avatarColors: arrayOf(string),
  avatarFontSize: string,
  avatarSize: string,
  badges: arrayOf(element),
  classes: shape({ any }),
  fullname: string,
  profileImage: string,
  subtitle: string
}

CompactUserInfo.defaultProps = {
  fullname: '',
  avatarSize: '38px',
  avatarFontSize: '18px',
}
export default CompactUserInfo;
