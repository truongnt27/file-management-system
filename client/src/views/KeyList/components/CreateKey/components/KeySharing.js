import React from 'react';
import PropTypes from 'prop-types';
import MuiTable from 'mui-datatables';

//mui table options
const cols = [
  {
    name: 'fullname',
    label: 'Name',
    options: {
      filter: false
    }
  },
  {
    name: 'email',
    label: 'Email',
    options: {
      filter: false
    }
  },
  {
    name: 'type',
    label: 'Type'
  },

];


const KeySharing = (props) => {

  const { onChange, allUsers, selectedUsers } = props;

  const options = {
    filterType: 'checkbox',
    download: false,
    print: false,
    delete: false,
    rowsSelected: selectedUsers,
    onRowsSelect: (currentRowsSelected, allRowsSelected) => {
      onChange(allRowsSelected.map(row => row.index));
    },
    customToolbarSelect: () => { }
  }
  return (
    <div >
      <MuiTable
        columns={cols}
        data={allUsers}
        options={options}
        title="All users"
      />
    </div>
  )
}

KeySharing.propTypes = {
  allUsers: PropTypes.array,
  onChange: PropTypes.func.isRequired
}
export default KeySharing;