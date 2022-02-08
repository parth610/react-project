'use strict';
module.exports = (sequelize, DataTypes) => {
  const Notebook = sequelize.define('Notebook', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  Notebook.associate = function(models) {
    // associations can be defined here
    Notebook.belongsTo(models.User, {foreignKey: 'user_id'})
    Notebook.hasMany(models.Note, {foreignKey: 'notebook_id', onDelete: 'CASCADE', hooks: true} )
  };
  return Notebook;
};
