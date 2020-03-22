import uuid from 'uuid/v1';

export default [
  {
    id: uuid(),
    keyId: 'CDD1049',
    amount: 30.5,
    agent: {
      name: 'Ekaterina Tankova'
    },
    createdAt: 1555016400000,
    type: 'create-key'
  },
  {
    id: uuid(),
    keyId: 'CDD1048',
    amount: 25.1,
    agent: {
      name: 'Cao Yu'
    },
    createdAt: 1555916400000,
    type: 'encrypt-file'
  },
  {
    id: uuid(),
    keyId: 'CDD1047',
    amount: 10.99,
    agent: {
      name: 'System'
    },
    createdAt: 1554930000000,
    type: 'rotate-key'
  },
  {
    id: uuid(),
    keyId: 'CDD1046',
    amount: 96.43,
    agent: {
      name: 'Anje Keizer'
    },
    createdAt: 1554757200000,
    type: 'create-key'
  },
  {
    id: uuid(),
    keyId: 'CDD1045',
    amount: 32.54,
    agent: {
      name: 'Clarke Gillebert'
    },
    createdAt: 1554670800000,
    type: 'encrypt-file'
  },
  {
    id: uuid(),
    keyId: 'CDD1044',
    amount: 16.76,
    agent: {
      name: 'Adam Denisov'
    },
    createdAt: 1554670800000,
    type: 'encrypt-file'
  }
];