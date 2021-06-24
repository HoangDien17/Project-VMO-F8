
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    username: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.ENUM(['Admin', 'Drirector', 'Hr', 'Manager', 'Employee']),
      defaultValue: 'Employee'
    }
  });
  User.associate = models => {
    User.hasOne(models.Information, {
      onDelete: "cascade"
    }),
    User.hasMany(models.Form, {
      onDelete: "cascade"
    })
  }
  return User;
}