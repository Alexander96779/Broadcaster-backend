export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Incidents', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: 'Users',
        key: 'id',
        as: 'user_id',
      },
    },
    user_FirstName: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    user_LastName: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    body: {
      type: Sequelize.STRING,
      allowNull: false
    },
    image_url: {
      type: Sequelize.STRING,
      allowNull: true
    },
    category: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    isApproved: {
      allowNull: true,
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    status: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'Pending'
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.fn('NOW')
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.fn('NOW')
    }
  }),
  down: queryInterface => queryInterface.dropTable('Incidents')
};
