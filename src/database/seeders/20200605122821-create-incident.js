export default {
  up: queryInterface => queryInterface.bulkInsert('Incidents', [{
    user_id: 3,
    user_FirstName: 'Esperance',
    user_LastName: 'Nyampinga',
    title: 'Road fixing in Nyabihu',
    body: 'Dear Government, Here in Nyabihu we need this road to be fixed',
    category: 'Red flag',
    status: 'Pending'
  },
  {
    user_id: 2,
    user_FirstName: 'Tresor',
    user_LastName: 'Cyubahiro',
    title: 'Domestic violance',
    body: 'Dear Government, We would like you to intervene in a domestic violence case against Marie Uwamahoro here in Musanze',
    category: 'Intervention',
    status: 'Approved'
  },
  {
    user_id: 2,
    user_FirstName: 'Tresor',
    user_LastName: 'Cyubahiro',
    title: 'Mituelle fund raising',
    body: 'Dear Government, In nyamabuye sector we wanted to doa fund raising for 200 hundred families and provide mituelle cards for them',
    category: 'Intervention',
    status: 'Pending'
  },
  {
    user_id: 3,
    user_FirstName: 'Bora',
    user_LastName: 'Rehema',
    title: 'Info Technology',
    body: 'Dear Government, as tech is evolving the young generation of Mutiba are in need of being a part of it. Please help provide them with Computers',
    category: 'Red flag',
    status: 'Pending'
  }], {}),
  down: queryInterface => queryInterface.bulkDelete('Incidents', null, {})
};
