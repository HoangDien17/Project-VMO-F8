
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    EmployeeCode: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    dob: {
      type: DataTypes.DATE
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    address: {
      type: DataTypes.STRING(60),
      allowNull: false
    },
    avatar: {
      type: DataTypes.STRING(60)
    },
    identityCard: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    InsuranceNumber: {
      type: DataTypes.STRING(30)
    },
    dependent: {
      type: DataTypes.STRING(20)
    },
    role: {
      type: DataTypes.ENUM(['Admin', 'Drirector', 'Hr', 'Manager', 'Employee']),
      defaultValue: 'Employee'
    }
  });
  User.associate = models => {
    User.hasOne(models.Probation, {
      onDelete: "cascade"
    })
  },
  User.associate = models => {
    User.hasMany(models.Periodical, {
      onDelete: "cascade"
    })
  }
  return User;
}