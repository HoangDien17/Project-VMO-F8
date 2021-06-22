module.exports = (sequelize, DataTypes) => {
  const Probation = sequelize.define("Probation", {
    title: {
      type: DataTypes.STRING(50)
    },
    unit: {
      type: DataTypes.STRING(50)
    },
    startDate: {
      type: DataTypes.DATE
    },
    endDate: {
      type: DataTypes.DATE
    },
    content: {
      type: DataTypes.STRING
    },
    comment: {
      type: DataTypes.STRING
    },
    status: {
      type: DataTypes.STRING(50),
      defaultValue: "New"
    }
  })
  Probation.associate = models => {
    Probation.belongsTo(models.User, 
      { foreignKey: {
        allowNull: false
      }})
  }
  return Probation;
}