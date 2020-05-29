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
    VIEW: 'VIEW',
    ALL_ACCESS: ['EDIT', 'VIEW']
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
    DEL_FILE: 'DEL FILE',
    UPDATE_FILE: 'UPDATE_FILE'
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
  FILE_TYPES: {
    mp3: "Audio",
    mp4: "Video",
    png: "Image",
    jpg: "Image",
    jpeg: "Image",
    gif: "Image",
    doc: "Word",
    docx: "Word",
    xlsx: "Excel",
  }
}