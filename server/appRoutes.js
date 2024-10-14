const express = require("express");
const router = express.Router();
const articlesController = require("./articlesController.js");
const commentsController = require("./commentsController.js");

router.get("/", articlesController.getArticles)
router.get("/:id", articlesController.getArticleById);
router.post("/", articlesController.addArticle);
router.patch("/:id", articlesController.changeArticle);
router.delete("/:id", articlesController.removeArticle);

router.get("/:id/comments", commentsController.getComments);
router.get("/:id/comment/:id_comment", commentsController.getCommentById);
router.post("/:id/comment", commentsController.addComment)
router.patch("/:id/comment/:id_comment", commentsController.changeComment);
router.delete("/:id/comment/:id_comment", commentsController.removeComment);

module.exports = router;