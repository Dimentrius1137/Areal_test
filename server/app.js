const express = require("express");
const path = require('path');
const cors = require("cors")
const db = require('./db.js');
const router = require('./appRoutes.js');
const models = require('./models.js');

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(cors())       
// const urlencodedParser = express.urlencoded({extended: false});

app.use('/articles', router);
app.use('/article', router);

app.listen(PORT, async () => {
    try {
        await db.connect.authenticate();
        console.log("база данных подключена")
        await db.connect.sync();
        console.log("база данных синхронизирована")
    }
    catch (e) {
        console.log(`ошибка ${e}`);
    }
})







