module.exports = (sequelize, DataTypes) => {
  const Information = sequelize.define("Information", {
    employeeCode: {
      type: DataTypes.STRING(45),
    },
    firstName: {
      type: DataTypes.STRING(45),
    },
    lastName: {
      type: DataTypes.STRING(45),
    },
    dob: {
      type: DataTypes.DATE,
    },
    email: {
      type: DataTypes.STRING(50),
    },
    phone: {
      type: DataTypes.STRING(15),
    },
    address: {
      type: DataTypes.STRING(60),
    },
    avatar: {
      type: DataTypes.STRING(),
    },
    identityCard: {
      type: DataTypes.STRING(30),
    },
    insuranceNumber: {
      type: DataTypes.STRING(30),
    },
    dependent: {
      type: DataTypes.STRING(20),
    },
  });
  Information.associate = (models) => {
    Information.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
      },
    });
  };
  return Information;
};
