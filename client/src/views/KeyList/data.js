import uuid from 'uuid/v1';

export default [
  {
    id: uuid(),
    alias: 'key_accounting_department',
    status: 'enable',
    createdAt: 1555016400000
  },
  {
    id: uuid(),
    status: 'pending',
    alias: 'key_finance_report',
    createdAt: 1555016400000
  },
  {
    id: uuid(),
    alias: 'key_private',
    status: 'disable',
    createdAt: 1555016400000
  }
]