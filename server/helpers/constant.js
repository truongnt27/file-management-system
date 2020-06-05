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
    PENDING: 'PENDING'
  },
  EVENT_TYPE: {
    CREATE_USER: 'created user',
    UPDATE_USER: 'updated user',
    DEL_USER: 'deleted user',
    ROTATE_KEY: 'rotated key',
    UPLOAD_FILE: 'uploaded file',
    DOWNLOAD_FILE: 'downloaded file',
    DEL_FILE: 'deleted file',
    UPDATE_FILE: 'updated file'
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