import React from 'react'
import MuiTable from 'mui-datatables'

//mui table options
const cols = [
  {
    name: 'username',
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
    name: 'role',
    label: 'Role'
  },

];


const KeySharing = (props) => {

  const { onChange, allUsers } = props;

  const options = {
    filterType: 'checkbox',
    download: false,
    print: false,
    delete: false,
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

export default KeySharing;