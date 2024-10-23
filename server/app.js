const express = require("express");
const path = require('path');
const cors = require("cors")
const db = require('./db.js');
const router = require('./appRoutes.js');
const models = require('./models.js');
const { where, Op } = require("sequelize");
const { group } = require("console");

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(cors())       
// const urlencodedParser = express.urlencoded({extended: false});

app.use('/articles', router);
app.use('/article', router);

app.get('/analytic/comments', async (req, res) => {
    const { dateFrom, dateTo } = req.query;
    const articles = await models.ArticleModel.findAll({
        include: {
          model: models.CommentModel,
          attributes: ['id', 'commentText', 'createdAt'],
          where: { 
            createdAt: {
                [Op.between]: [dateFrom, dateTo]
            }
          },
        },
        group: ['Articles.id', 'Comments.id']
      });
    res.json(articles)
})

app.listen(PORT, async () => {
    try {
        await db.connect.authenticate();
        console.log("база данных подключена")
        await db.connect.sync();
        console.log("база данных синхронизирована");

    }
    catch (e) {
        console.log(`ошибка ${e}`);
    }
})







