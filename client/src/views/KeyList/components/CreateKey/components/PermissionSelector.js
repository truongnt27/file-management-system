import React from 'react'
import GroupManagment from 'components/GroupManagment'

const permissions = [
  {
    id: 'EDIT',
    name: 'EDIT'
  },
  {
    id: 'VIEW',
    name: 'EDIT'
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

