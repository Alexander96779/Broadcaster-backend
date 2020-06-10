import hash from '../../utils/hash';

const { hashPassword } = hash;

export default {
  up: async queryInterface => queryInterface.bulkInsert('Users', [{
    email: 'alexandre34@gmail.com',
    user_name: 'Alex',
    firstName: 'Alexandre',
    lastName: 'Niyigena',
    role: 'administrator',
    password: await hashPassword('Kemmy123'),
    isVerified: true
  },
  {
    email: 'tresorc@gmail.com',
    user_name: 'Trey',
    firstName: 'Tresor',
    lastName: 'Cyubahiro',
    role: 'requester',
    password: await hashPassword('Kemmy123'),
    isVerified: true
  },
  {
  email: 'esperanceny@gmail.com',
  user_name: 'Espe',
  firstName: 'Esperance',
  lastName: 'Nyampinga',
  role: 'requester',
  password: await hashPassword('Esperance12'),
  isVerified: true
},
{
  email: 'borarehema@gmail.com',
  user_name: 'Bora',
  firstName: 'Rehema',
  lastName: 'Bora',
  role: 'requester',
  password: await hashPassword('rehema123'),
  isVerified: true
},
], {}),

  down: queryInterface => queryInterface.bulkDelete('Users', null, {})
};
