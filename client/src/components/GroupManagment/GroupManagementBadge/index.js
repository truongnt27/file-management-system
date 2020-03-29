import React, { Component, Fragment } from 'react';
import { number, string, oneOfType, arrayOf, func, shape, any } from 'prop-types';
import { Button } from '@material-ui/core';
import {
  Add as AddIcon,
  ArrowDropDown as ArrowDropDownIcon
} from '@material-ui/icons';
import { withStyles } from '@material-ui/styles';
import cx from 'classnames';


const muiStyles = theme => ({
  groupButton: {
    minWidth: '20px',
    padding: '2px 6px'
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
    height: '18px'
  },
  rightIcon: {
    height: '18px'
  },
  groupItem: {
    borderRadius: '2px',
    height: '24px',
    color: '#ffffff',
    marginRight: '5px'
  },
  groupItemIcon: {
    height: ' 3px'
  },
  defaulBtn: {
    borderRadius: '2px',
    height: '24px',
    padding: '0px',
  }
})

class GroupManagementBadge extends Component {

  static propTypes = {
    addButtonLabel: string,
    classes: shape({ any }),
    id: oneOfType([number, string]).isRequired,
    names: arrayOf(string),
    onClick: func,
  }

  static defaultProps = {
    addButtonLabel: 'ADD',
    names: []
  }

  handleClick = (event) => {
    const { onClick } = this.props;
    onClick && onClick(event);
  }

  drawEmptyGroupButton = () => {
    const { classes, addButtonLabel } = this.props;

    return (
      <Button
        className={classes.defaulBtn}
        color="primary"
        onClick={this.handleClick}
        size="small"
        variant="outlined"
      >
        <AddIcon className={classes.leftIcon} />
        {addButtonLabel}
        <ArrowDropDownIcon className={classes.rightIcon} />
      </Button>
    )
  }

  drawFilledGroupButton = () => {
    const { names, classes, id } = this.props;
    const groupContent = names.length === 1 ?
      `${names[0]}` :
      <Fragment>
        {`+${names.length}`}
        <ArrowDropDownIcon className={classes.rightIcon} />
      </Fragment>
    return (
      <Button
        className={cx(classes.groupItem, classes.groupButton)}
        color="primary"
        data-id={id}
        onClick={this.handleClick}
        size="small"
        variant="contained"
      >
        {groupContent}
      </Button>
    )
  }

  render() {
    const { names } = this.props;

    return (
      <Fragment>
        {
          names.length === 0
            ?
            this.drawEmptyGroupButton()
            :
            this.drawFilledGroupButton()
        }
      </Fragment>
    )
  }
}

export default withStyles(muiStyles)(GroupManagementBadge);