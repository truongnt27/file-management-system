/* eslint-disable react/no-multi-comp */
import React from 'react';
import clsx from 'clsx';
import PropTypes, { func } from 'prop-types';
import { lighten, makeStyles } from '@material-ui/core/styles';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  IconButton,
  Checkbox,
  Paper,
  TableRow,
  Typography,
  Toolbar,
  Tooltip,
  TableSortLabel
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { Edit as EditIcon, Visibility as ViewIcon, ToggleOff, ToggleOn } from '@material-ui/icons';
import FilterListIcon from '@material-ui/icons/FilterList';
import { StatusBullet, DeleteConfirmDialog } from 'components';
import { Skeleton } from '@material-ui/lab';

import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import moment from 'moment';

import { deleteKeySaga, updateKeySaga } from 'state/modules/app/keys/actions';

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const headRows = [
  { id: 'alias', label: 'Alias ' },
  { id: 'description', label: 'Description' },
  { id: 'status', label: 'Status' },
  { id: 'creationDate', label: 'Creation date(dd/mm/yyyy hh:mm:ss)' },

];

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            checked={numSelected === rowCount}
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            inputProps={{ 'aria-label': 'Select all desserts' }}
            onChange={onSelectAllClick}
          />
        </TableCell>
        {headRows.map(row => (
          <TableCell
            align="left"
            key={row.id}
            padding="default"
            sortDirection={orderBy === row.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === row.id}
              direction={order}
              onClick={createSortHandler(row.id)}
            >
              {row.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
        color: theme.palette.secondary.main,
        backgroundColor: lighten(theme.palette.secondary.light, 0.85),
      }
      : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark,
      },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
}));

const EnhancedTableToolbar = props => {
  const classes = useToolbarStyles();
  const {
    numSelected,
    onEditKey,
    onDeleteKey,
    onMarkAvaiKey,
    onMarkUnavaiKey
  } = props;

  const handleClickEdit = (e) => {
    e.preventDefault();
    onEditKey && onEditKey(e);
  }

  const handleClickDelete = (e) => {
    e.preventDefault();
    onDeleteKey && onDeleteKey(e);
  }

  const handleClickMarkAvai = (e) => {
    e.preventDefault();
    onMarkAvaiKey && onMarkAvaiKey(e);
  }

  const handleClickMarkUnavai = (e) => {
    e.preventDefault();
    onMarkUnavaiKey && onMarkUnavaiKey(e);
  }

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography
            color="inherit"
            variant="subtitle1"
          >
            {numSelected} selected
          </Typography>
        ) :
          (
            <Typography
              id="tableTitle"
              variant="h6"
            >
              All keys
            </Typography>
          )}
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        {numSelected > 0 ? (
          <div style={{ display: 'flex' }}>
            {
              numSelected === 1 &&
              (
                <>
                  <Tooltip title="Mark availale">
                    <IconButton
                      aria-label="Mark availale"
                      onClick={handleClickMarkUnavai}
                    >
                      <ToggleOn />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Mark unavailale">
                    <IconButton
                      aria-label="Mark unavailale"
                      onClick={handleClickMarkAvai}
                    >
                      <ToggleOff />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="View detail">
                    <IconButton aria-label="View detail">
                      <ViewIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Edit">
                    <IconButton
                      aria-label="Edit"
                      onClick={handleClickEdit}
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                </>
              )
            }
            <Tooltip title="Delete">
              <IconButton
                aria-label="Delete"
                onClick={handleClickDelete}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </div>
        ) :
          (
            <Tooltip title="Filter list">
              <IconButton aria-label="Filter list">
                <FilterListIcon />
              </IconButton>
            </Tooltip>
          )}
      </div>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onDeleteKey: func.isRequired,
  onEditKey: func.isRequired,
  onMarkAvaiKey: func.isRequired,
  onMarkUnavaiKey: func.isRequired,
};

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  statusContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  status: {
    marginRight: theme.spacing(1)
  },
}));

export default function KeysTable(props) {
  const classes = useStyles();

  const { keys: rows, loading = false } = props;
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [openDelConfirm, setOpenDelConfirm] = React.useState(false);

  const dispatch = useDispatch();

  function handleRequestSort(event, property) {
    const isDesc = orderBy === property && order === 'desc';
    setOrder(isDesc ? 'asc' : 'desc');
    setOrderBy(property);
  }

  function handleSelectAllClick(event) {
    if (event.target.checked) {
      const newSelecteds = rows.map(n => n._id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  }

  function handleClick(event, _id) {
    const selectedIndex = selected.indexOf(_id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, _id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  }

  function handleChangePage(event, newPage) {
    setPage(newPage);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(+event.target.value);
    setPage(0);
  }

  function handleEditKey() {
    dispatch(push(`/keys/${selected}/edit`));
  }

  function handleDeleteKey() {
    setOpenDelConfirm(true);
  }

  function handleCloseDelConfirm() {
    setOpenDelConfirm(false);
  }

  function DeleteKey() {
    setOpenDelConfirm(false);
    dispatch(deleteKeySaga(selected));
  }

  function MarkAvaiKey() {
    const updatedKey = {
      _id: selected,
      status: 'DISABLE'
    }
    dispatch(updateKeySaga(updatedKey));
  }

  function MarkUnavaiKey() {
    const updatedKey = {
      _id: selected,
      status: 'ENABLE'
    }
    dispatch(updateKeySaga(updatedKey));
  }

  const isSelected = _id => selected.indexOf(_id) !== -1;

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          onDeleteKey={handleDeleteKey}
          onEditKey={handleEditKey}
          onMarkAvaiKey={MarkAvaiKey}
          onMarkUnavaiKey={MarkUnavaiKey}
        />
        <div className={classes.tableWrapper}>
          <Table
            aria-labelledby="tableTitle"
            className={classes.table}
            size="medium"
          >
            <EnhancedTableHead
              numSelected={selected.length}
              onRequestSort={handleRequestSort}
              onSelectAllClick={handleSelectAllClick}
              order={order}
              orderBy={orderBy}
              rowCount={rows.length}
            />
            <TableBody>
              {
                loading && (
                  <>
                    <TableRow >
                      <TableCell
                        align="left"
                      >
                        <Skeleton variant="rect" />
                      </TableCell>
                      <TableCell
                        component="th"
                        padding="none"
                        scope="row"
                      >
                        <Skeleton variant="rect" />
                      </TableCell>
                      <TableCell align="left" ><Skeleton variant="rect" /></TableCell>
                      <TableCell align="left" ><Skeleton variant="rect" /></TableCell>
                      <TableCell align="left" ><Skeleton variant="rect" /></TableCell>
                    </TableRow>
                    <TableRow >
                      <TableCell
                        align="left"
                      >
                        <Skeleton variant="rect" />
                      </TableCell>
                      <TableCell
                        component="th"
                        padding="none"
                        scope="row"
                      >
                        <Skeleton variant="rect" />
                      </TableCell>
                      <TableCell align="left" ><Skeleton variant="rect" /></TableCell>
                      <TableCell align="left" ><Skeleton variant="rect" /></TableCell>
                      <TableCell align="left" ><Skeleton variant="rect" /></TableCell>
                    </TableRow>
                  </>
                )
              }
              {stableSort(rows, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row._id);
                  const labelId = `checkbox-${index}`;
                  return (
                    <TableRow
                      aria-checked={isItemSelected}
                      hover
                      key={row._id}
                      onClick={event => handleClick(event, row._id)}
                      role="checkbox"
                      selected={isItemSelected}
                      tabIndex={-1}
                    >
                      <TableCell
                        align="left"
                        padding="checkbox"
                      >
                        <Checkbox
                          checked={isItemSelected}
                          color="primary"
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        padding="none"
                        scope="row"
                      >
                        {row.alias}
                      </TableCell>
                      <TableCell align="left">{row.description || '_'}</TableCell>
                      <TableCell align="left">
                        <div className={classes.statusContainer}>
                          <StatusBullet
                            className={classes.status}
                            size="sm"
                            type={row.status}
                          />
                          {row.status}
                        </div>
                      </TableCell>
                      <TableCell align="left">
                        {moment(row.creationDate).format('DD/MM/YYYY hh:mm:ss')}
                      </TableCell>
                    </TableRow>
                  );
                })}

            </TableBody>
          </Table>
        </div>
        <TablePagination
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          component="div"
          count={rows.length}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[10, 20, 50]}
        />
      </Paper>
      <DeleteConfirmDialog
        onClose={handleCloseDelConfirm}
        onDelete={DeleteKey}
        open={openDelConfirm}
      />
    </div>
  );
}
KeysTable.propTypes = {
  className: PropTypes.string,
  keys: PropTypes.array.isRequired,
  loading: PropTypes.bool
};
