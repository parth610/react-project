'use strict';
module.exports = (sequelize, DataTypes) => {
  const Note = sequelize.define('Note', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    notebook_id:{
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  Note.associate = function(models) {
    // associations can be defined here
    Note.belongsTo(models.User, {foreignKey: 'user_id'})
    Note.belongsTo(models.Notebook, {foreignKey: 'notebook_id'})
  };
  return Note;
};
