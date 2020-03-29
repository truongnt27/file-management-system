import React, { Component } from 'react';
import { string, number, shape, arrayOf, oneOfType, func } from 'prop-types';

import { MoreHoriz as MoreHorizIcon } from '@material-ui/icons';
import { Button } from '@material-ui/core'
import GroupManagementBadge from './GroupManagementBadge';
import PopoverItemSelector from './PopoverItemSelector';
import isEqual from 'lodash/isEqual';
import { withStyles } from '@material-ui/styles';

const muiStyles = theme => ({
  groupBadge: {
    button: {
      marginRight: '4px'
    }
  },

  moreBtn: {
    height: '36px',
    width: '36px',
    minWidth: 'unset'
  },

  moreIcon: {
    height: '24px',
    width: '24px',
    color: 'rgba(0,0,0,0.54)'
  }
})

class GroupManagement extends Component {

  state = {
    anchorEl: null
  }

  handleClosePopover = (newSelectedIds) => {
    const { onChange, selectedIds } = this.props;
    const isSelectedChange = !isEqual(newSelectedIds, selectedIds);
    onChange && isSelectedChange && onChange(newSelectedIds);
    this.setState({
      anchorEl: null,
    });
  };

  //Get current click event from GroupManagementBadge and save it to state
  //PopoverItemSelector later will use it to render popover where click event was fired
  handleOpenPopover = (event) => {
    this.setState({
      anchorEl: event.currentTarget,
    });
  }

  renderGroupBadges = (selectedGroupNames) => {
    const { maxGroupsToDisplay, classes } = this.props;
    let displayChunk; //list to be used in GroupManagementBadge to show group names buttons
    let restChunk; //list to be used in GroupManagementBadge to show a collapse button.
    const moreBtn = (
      <Button
        className={classes.moreBtn}
        onClick={this.handleOpenPopover}
      >
        <MoreHorizIcon className={classes.moreIcon} />
      </Button>
    )

    if (selectedGroupNames.length <= maxGroupsToDisplay) {
      displayChunk = selectedGroupNames;
    } else {
      displayChunk = selectedGroupNames.slice(0, maxGroupsToDisplay - 1);
      restChunk = selectedGroupNames.slice(maxGroupsToDisplay - 1);
    }

    return (
      <div className={classes.groupBadge} >
        {
          displayChunk.map((groupName, index) => (
            <GroupManagementBadge
              key={`${index.toString()}-${groupName}`}
              names={[groupName]}
              onClick={this.handleOpenPopover}
            />
          ))
        }
        {
          restChunk &&
          <GroupManagementBadge
            names={restChunk}
            onClick={this.handleOpenPopover}
          />
        }
        {moreBtn}
      </div>
    )
  }

  render() {
    const { groups, selectedIds } = this.props;
    let selectedGroupNames = groups.reduce((acc, group) => {
      if (selectedIds.includes(group.id)) {
        acc.push(group.name);
      }
      return acc;
    }, []);

    return (
      <div >
        {
          selectedGroupNames.length === 0 ?
            <GroupManagementBadge
              names={[]}
              onClick={this.handleOpenPopover}
            /> :
            this.renderGroupBadges(selectedGroupNames)
        }
        <PopoverItemSelector
          anchorEl={this.state.anchorEl}
          entryPool={groups}
          onClose={this.handleClosePopover}
          selectedIds={selectedIds}
        />
      </div>
    )
  }
}

GroupManagement.propTypes = {
  groups: arrayOf(shape({
    id: oneOfType([number, string]).isRequired,
    name: string
  })),
  maxGroupsToDisplay: number,
  onChange: func,
  selectedIds: arrayOf(oneOfType([number, string]))
}

GroupManagement.defaultProps = {
  maxGroupsToDisplay: 2,
  groups: [],
  selectedIds: []
}

export default withStyles(muiStyles)(GroupManagement);