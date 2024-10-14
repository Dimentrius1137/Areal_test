
const { where } = require('sequelize');
const models = require('./models.js');

module.exports.getArticles = async (req, res) => {
    try {
        let articles = await models.ArticleModel.findAll({raw:true});
        res.status(200).json(articles)
    }
    catch (e) {
        console.log(e)
        res.status(500).json({ message: "error" })
    }
}

module.exports.getArticleById = async (req, res) =>{
    const articleId = req.params.id;
    try {
        let searchArticle = await models.ArticleModel.findOne({where: { id: articleId }});
        res.status(200).json(searchArticle)
    }
    catch (e) {
        console.log(e)
        res.status(404).json({ message: "article not found" })
    }
}
module.exports.addArticle = async (req, res) => {
    try {
        //проверка на то нет ли статей с таким же названием, в тз об этом не сказано, по этому закоментировано  
        // const newArticle = await articlesModel.findOne({ 
        //     where: {
        //         articleName: {
        //             [Op.ilike]: req.body.name
        //         },
        //     }   
        //  })
        // if (newArticle) {
        //     res.status(400).json("Такая статья уже есть")
        // }
        let newArticle = await models.ArticleModel.create({ 
            articleName: req.body.name,
            articleText: req.body.text 
        });
        res.status(201).json(newArticle)
    }
    catch (e) {
        console.log(e)
        res.status(500).json("error")
    }

}
module.exports.changeArticle = async (req, res) => {
    try {
        let changingArticle = await models.ArticleModel.findOne({
            where: 
            {
                id: req.params.id
            }
        })
        if(!changingArticle){
            return res.status(400).json("article not found")
        }
        changingArticle = await models.ArticleModel.update({ 
            articleName: req.body.name,
            articleText: req.body.text 
        }, {
            where: {
                id: req.params.id
            }
        });
        res.status(201).json(changingArticle)
    }
    catch (e) {
        console.log(e)
        res.status(500).json("error")
    }
}

module.exports.removeArticle = async (req, res) => {
    let deletingArticle = await models.ArticleModel.findOne({
        where: 
        {
            id: req.params.id
        }
    })
    if(!deletingArticle){
        return res.status(400).json("article not found")
    }
    await deletingArticle.destroy()
    res.status(204).json()
}