module.exports = (sequelize, DataTypes) => {
  const Form = sequelize.define("Form", {
    typeForm: {
      type: DataTypes.ENUM(['Probationary', 'Assessment']),
      allowNull: false,
      
    },
    title: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    unit: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    managerId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    content: {
      type: DataTypes.STRING
    },
    comment: {
      type: DataTypes.STRING
    },
    status: {
      type: DataTypes.STRING(50),
      defaultValue: " "
    }
  })
  Form.associate = models => {
    Form.belongsTo(models.User, 
      { foreignKey: {
        allowNull: false
      }})
  }
  return Form;
}