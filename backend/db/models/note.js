'use strict';
module.exports = (sequelize, DataTypes) => {
  const Note = sequelize.define('Note', {
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    user_id: DataTypes.INTEGER,
    notebook_id: DataTypes.INTEGER
  }, {});
  Note.associate = function(models) {
    // associations can be defined here
    Note.belongsTo(models.User, {foreignKey: 'user_id'})
  };
  return Note;
};
