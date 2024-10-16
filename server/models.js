const { Sequelize, DataTypes } = require('sequelize');
const db = require('./db.js');
const ArticleModel = db.connect.define(
'Articles',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    articleName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    articleText: {
      type: DataTypes.STRING,
      allowNull: false,
      maxLength: 900,
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
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    commentText: {
      type: DataTypes.STRING,
      allowNull: false,
      maxLength: 900,
    },
    ArticleId: {
      type: DataTypes.INTEGER
    }
  },
  {
    timestamps: true
  },
);

ArticleModel.hasMany(CommentModel);
CommentModel.belongsTo(ArticleModel, {foreignKey: 'ArticleId'});

module.exports = { ArticleModel, CommentModel }