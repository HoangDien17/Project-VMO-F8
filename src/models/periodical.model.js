module.exports = (sequelize, DataTypes) => {
  const Periodical = sequelize.define("Periodical", {
    title: {
      type: DataTypes.STRING(50)
    },
    unit: {
      type: DataTypes.STRING(50)
    },
    date: {
      type: DataTypes.DATE
    },
    content: {
      type: DataTypes.STRING
    },
    comment: {
      type: DataTypes.STRING
    },
    status: {
      type: DataTypes.STRING(50)
    }
  })
  Periodical.associate = models => {
    Periodical.belongsTo(models.User, 
      { foreignKey: {
        allowNull: false
      }})
  }
  return Periodical;
}