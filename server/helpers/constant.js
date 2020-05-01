module.exports = {
  USER_TYPES: {
    USER: 'User',
    MANAGER: 'Manager',
    ADMIN: 'Admin'
  },
  USER_LEVELS: {
    User: 0,
    Manager: 1,
    Admin: 2
  },
  USER_STATUS: {
    ACTIVE: 'ACTIVE',
    INACTIVE: 'INACTIVE',
  },
  PERMISSION_TYPES: {
    EDIT: 'EDIT',
    ROTATE: 'ROTATE',
    DISABLE: 'DISABLE',
    ENABLE: 'ENABLE',
    DELETE: 'DELETE',
    ALL_ACCESS: ['EDIT', 'ROTATE', 'DISABLE', 'ENABLE', 'DELETE']
  },
  STATUS: {
    ENABLE: 'ENABLE',
    DISABLE: 'DISABLE',
    PENDING: 'PENDING',
    DEL_FILE: 'DELETE FILE'
  },
  EVENT_TYPE: {
    CREATE_USER: 'CREATE USER',
    UPDATE_USER: 'UPDATE USER',
    DEL_USER: 'DEL USER',
    CREATE_KEY: 'CREATE KEY',
    UPDATE_KEY: 'UPDATE KEY',
    DEL_KEY: 'DELETE KEY',
    ROTATE_KEY: 'ROTATE KEY',
    UPLOAD_FILE: 'UPLOAD FILE',
    DOWNLOAD_FILE: 'DOWNLOAD FILE',
    ENCRYPT_FILE: 'ENCRYPT FILE'
  },
  ROTATE_PERIOD: [
    {
      value: '30_DAYS',
      label: '30 days',
      second: 1000 * 60 * 60 * 24 * 30
    },
    {
      value: '90_DAYS',
      label: '90 days',
      second: 1000 * 60 * 60 * 24 * 90
    },
    {
      value: 'YEAR',
      label: 'Year',
      second: 1000 * 60 * 60 * 24 * 365
    }
  ],
}