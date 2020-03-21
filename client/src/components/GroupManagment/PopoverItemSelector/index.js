import React, { cloneElement } from 'react';
import { List, ListItemIcon, ListItem, Checkbox, Popover } from '@material-ui/core';
import { arrayOf, shape, string, number, func, element, bool, oneOfType } from 'prop-types';
import isEqual from 'lodash/isEqual';
import { withStyles } from '@material-ui/styles';

const muiStyles = theme => ({
  listCommon: {
    color: 'rgba(0,0,0,0.87)',
    fontFamily: 'Roboto',
    fontSize: '14px'
  },
  listItem: {
    marginRight: '16px',
    paddingTop: 0,
    paddingBottom: 0
  },
  listItemIcon: {
    margin: 0
  },
  selectAll: {
    color: 'rgba(0,0,0,0.54)'
  }
})

class PopoverItemSelector extends React.Component {

  static propTypes = {
    anchorEl: element,
    disableSelectAll: bool,
    entryPool: arrayOf(shape({
      name: string,
      id: oneOfType([string, number]).isRequired
    })).isRequired,
    itemTemplate: element,
    onChange: func,
    onClose: func.isRequired,
    selectAllLabel: string,
    selectedIds: arrayOf(oneOfType([number, string])).isRequired
  }

  static defaultProps = {
    selectAllLabel: 'Select All',
    selectedIds: [],
    entryPool: []
  }
  state = {
    selectedIds: this.props.selectedIds
  }

  componentDidUpdate = (prevProps) => {
    const { selectedIds } = this.props;
    if (!isEqual(selectedIds, prevProps.selectedIds)) {
      this.setState({
        selectedIds
      })
    }
  }

  handleToggle = (value) => () => {
    const { entryPool, onChange } = this.props;
    const { selectedIds } = this.state;
    const currentIndex = selectedIds.indexOf(value);
    let newChecked = [...selectedIds];
    if (!value) {
      newChecked = (entryPool && selectedIds.length === entryPool.length && entryPool.length > 0) ? [] : entryPool.map(item => item.id);
    } else if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    onChange && onChange(newChecked);
    this.setState({ selectedIds: newChecked });
  };

  handleClose = () => {
    const { onClose } = this.props;
    const { selectedIds } = this.state;
    onClose && onClose(selectedIds);
  }

  drawItem() {
    const { entryPool, itemTemplate, classes } = this.props;
    const { selectedIds } = this.state;
    return entryPool && entryPool.map(value => {
      return (
        <ListItem
          className={classes.listItem}
          key={`item_${value.id}`}
        >
          <ListItemIcon className={classes.listItemIcon}>
            <Checkbox
              checked={selectedIds.includes(value.id)}
              color="primary"
              onChange={this.handleToggle(value.id)}
            />
          </ListItemIcon>
          {itemTemplate ? cloneElement(itemTemplate, value) : <div>{value.name}</div>}
        </ListItem>
      )
    })
  }

  render() {
    const { entryPool, selectAllLabel, disableSelectAll, classes, anchorEl } = this.props;
    const { selectedIds } = this.state;
    const isOpen = Boolean(anchorEl)
    return (
      <Popover
        anchorEl={anchorEl}
        onClose={this.handleClose}
        open={isOpen}
      >
        <List className={classes.listCommon}>
          {
            !disableSelectAll
            &&
            <ListItem
              className={classes.listItem}
              key="select_all"
            >
              <ListItemIcon className={classes.listItemIcon}>
                <Checkbox
                  checked={selectedIds.length === entryPool.length}
                  color="primary"
                  indeterminate={selectedIds.length !== entryPool.length && selectedIds.length !== 0}
                  onChange={this.handleToggle()}
                />
              </ListItemIcon>
              <div className={classes.selectAll}>{selectAllLabel}</div>
            </ListItem>
          }
          {this.drawItem()}
        </List>
      </Popover>
    );
  }
}


export default withStyles(muiStyles)(PopoverItemSelector);