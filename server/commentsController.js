
const { where } = require('sequelize');
const models = require('./models.js');

module.exports.getComments = async (req, res) => {
    const articleId = req.params.id;
    try {
        let comments = await models.ArticleModel.findAll({ where: { id: articleId }, include: models.CommentModel });
      
        res.status(200).json(comments)
    }
    catch (e) {
        console.log(e)
        res.status(500).json({ message: "error" })
    }
}

module.exports.getCommentById = async (req, res) =>{
    const articleId = req.params.id;
    const commentId = req.params.id_comment
    try {
        let searchComment = await models.CommentModel.findOne({ where: { id: commentId } });
        res.status(200).json(searchComment)
    }
    catch (e) {
        console.log(e)
        res.status(404).json({ message: "comment not found" })
    }
}

module.exports.addComment = async (req, res) => {
    try {
        let newComment = await models.CommentModel.create({ 
            commentText: req.body.text,
            ArticleId: req.params.id
        });
        res.status(201).json(newComment)
    }
    catch (e) {
        console.log(e)
        res.status(500).json("error")
    }
}
module.exports.changeComment = async (req, res) => {

    try {
        let changingComment = await models.CommentModel.findAll({raw:true});
        if(!changingComment){
            return res.status(400).json("comment not found")
        }
        changingComment = await models.CommentModel.update({ 
            commentText: req.body.text,
        }, {
            where: {
                id: req.params.id_comment
            }
        });
        res.status(201).json(changingComment)
    }
    catch (e) {
        console.log(e)
        res.status(500).json("error")
    }
}

module.exports.removeComment = async (req, res) => {
    let deletingComment = await models.CommentModel.findOne({
        where: 
        {
            id: req.params.id_comment
        }
    })
    if(!deletingComment){
        return res.status(400).json("article not found")
    }
    await deletingComment.destroy()
    res.status(204).json()
}