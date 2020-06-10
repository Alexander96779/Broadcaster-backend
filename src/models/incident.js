export default (sequelize, DataTypes) => {
  const Incident = sequelize.define(
    'Incident',
    {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: 'Users',
          key: 'id',
          as: 'user_id',
        },
      },
      user_FirstName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      user_LastName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      body: {
        type: DataTypes.STRING,
        allowNull: false
      },
      image_url: {
        type: DataTypes.STRING,
        allowNull: true
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: {
            args: [['Red flag', 'Intervention']],
            msg: 'Invalid Category, uses Red flag or Intervention only'
          }
        }
      },
      isApproved: {
        allowNull: true,
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Pending',
        validate: {
          isIn: {
            args: [['Pending', 'Approved', 'Rejected']],
            msg: 'Invalid Status, uses Pending, Approved or Rejected only'
          }
        }
      },
      createdAt: {
        allowNull: true,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: true,
        type: DataTypes.DATE
      }
    }, {}
  );
  Incident.associate = models => {
    Incident.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
  };

  return Incident;
};
