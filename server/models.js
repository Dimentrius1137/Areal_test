const { Sequelize, DataTypes } = require('sequelize');
const db = require('./db.js');
const ArticleModel = db.connect.define(
'Articles',
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    articleName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    articleText: {
      type: Sequelize.STRING,
      allowNull: false
    }
  },
  {
    timestamps: true
  },
);
const CommentModel = db.connect.define(
  'Comments',
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    commentText: {
      type: Sequelize.STRING,
      allowNull: false
    },
  },
  {
    timestamps: true
  },
);

ArticleModel.hasMany(CommentModel);
CommentModel.belongsTo(ArticleModel);

module.exports = { ArticleModel, CommentModel }