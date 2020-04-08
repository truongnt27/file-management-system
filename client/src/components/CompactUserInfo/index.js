import React, { Component } from 'react';
import { string, arrayOf, element, shape, any } from 'prop-types';
import { Avatar } from '@material-ui/core';

import styles from './styles.scss';
import classnames from 'classnames';

export default class CompactUserInfo extends Component {
  static propTypes = {
    avatarColors: arrayOf(string),
    avatarFontSize: string,
    avatarSize: string,
    badges: arrayOf(element),
    classes: shape({ any }),
    fullname: string,
    profileImage: string,
    subtitle: string
  }

  static defaultProps = {
    fullname: '',
    avatarSize: '38px',
    avatarFontSize: '18px',
    avatarColors: ['#67B7DC', '#6794DC', '#67A1DC', '#8087DC', '#A397DC', '#C787DC']
  }

  genAvatorImg() {
    const { fullname, profileImage, avatarSize, avatarFontSize, avatarColors } = this.props;
    const initial = fullname.match(/\b\w/g);

    const displayName = `${initial[0]}${initial.length > 1 ? initial[initial.length - 1] : ''}`.toUpperCase();

    const colorIndex = Math.floor(Math.random() * avatarColors.length);
    const avatarStyle = {
      width: avatarSize,
      height: avatarSize,
      fontSize: avatarFontSize,
      backgroundColor: avatarColors[colorIndex]
    }
    return (
      <Avatar
        className={styles.avatarImg}
        src={profileImage}
        style={avatarStyle}
      >
        {displayName}
      </Avatar>
    )
  }

  render() {
    const { fullname, subtitle, badges, classes } = this.props;
    return (
      <div className={classnames(styles.compactUserInfoContainer, classes)}>
        <div className={styles.avatorContainer}>{this.genAvatorImg()}</div>
        <div className={styles.userInfoContainer}>
          <div className={styles.userInfo}>
            <div className={styles.userName}>{fullname}</div>
            <div className={styles.userBadge}>{badges}</div>
          </div>
          <div className={styles.subtitleContainer}>{subtitle}</div>
        </div>
      </div>
    )
  }
}