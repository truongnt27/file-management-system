import React from 'react'
import GroupManagment from 'components/GroupManagment'

const permissions = [
  {
    id: 'EDIT',
    name: 'edit'
  },
  {
    id: 'ENABLE',
    name: 'enable'
  },
  {
    id: 'DISABLE',
    name: 'disable'
  },
  {
    id: 'ROTATE',
    name: 'rotate'
  }
]
export default function PermissionSelector(props) {
  const { selectedPermission = [], userId, onChange } = props;

  const handlOnChange = (selectedIds) => {
    onChange && onChange(selectedIds, userId);
  }

  return (
    <div>
      <GroupManagment
        groups={permissions}
        onChange={handlOnChange}
        selectedIds={selectedPermission}
      />
    </div>
  )
}

