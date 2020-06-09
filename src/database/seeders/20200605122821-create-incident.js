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
  }], {}),
  down: queryInterface => queryInterface.bulkDelete('Incidents', null, {})
};
