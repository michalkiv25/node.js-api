const mongoose =  require('mongoose')
const Article = require('../models/article')
const Category = require('../models/category')

module.exports = {
    getAllArticles: (req, res) => {
        Article.find().populate('categoryId', 'title').then((articles) => { 
            //populate
            // It can only be written when the key and ref are written in the model,
            // Basically he returns the key and goes to the model of the continuum and returns what we tell him in the second parameter.
            // No we will not write a second parameter, it will display all the keys and values ​​of the linked model
            res.status(200).json({
                articles
            })
        }).catch(error => {
            res.status(500).json({
                error
            })
        });
    },
    createArticle: (req, res) => {
        const { path: image } = req.file; //add from from-data, not body
        const { title, description, content, categoryId } = req.body;

        //Check if there is such a category at all, by id
        Category.findById(categoryId).then((category) => {
            if (!category) {
                return res.status(404).json({ // If it gets here it stops the function and it will not be saved in the database thanks to the retren
                    message: 'Category not found'
                })
            }

            const article = new Article({
                _id: new mongoose.Types.ObjectId(),
                title,
                description,
                content,
                categoryId,
                image: image.replace('\\','/') // In order to have only one slash
            });

            return article.save(); //Returns both findbyid and save
        }).then(() => {//Check if save or findById fill
            res.status(200).json({
                message: 'Created article'
            })
        }).catch(error => {
            res.status(500).json({
                error
            })
        });
    },
    getArticle: (req, res) => {
        const articleId = req.params.articleId;

        Article.findById(articleId).then((article) => {
            res.status(200).json({
                article
            })
        }).catch(error => {
            res.status(500).json({
                error
            })
        });
    },
    updateArticle: (req, res) => {
        const articleId = req.params.articleId;
        const { categoryId } = req.body; //Check if there is an existing category

        Article.findById(articleId).then((article) => {
            if (!article) {
                return res.status(404).json({
                    message: 'Article not found'
                })
            }
        }).then(() => {
            if (categoryId) {
                return Category.findById(categoryId).then((category) => {
                    if (!category) {
                        return res.status(404).json({
                            message: 'Category not found'
                        })
                    }

                    return Article.updateOne({ _id: articleId }, req.body);
                }).then(() => {
                    res.status(200).json({
                        message: 'Article Updated'
                    })
                }).catch(error => {
                    res.status(500).json({
                        error
                    })
                });
            }

            Article.updateOne({ _id: articleId }, req.body).then(() => {
                res.status(200).json({
                    message: 'Article Updated'
                })
            }).catch(error => {
                res.status(500).json({
                    error
                })
            });
        })


    },
    deleteArticle: (req, res) => {
        const articleId = req.params.articleId

        Article.findById(articleId).then((article) => {
            if (!article) {
                return res.status(404).json({
                    message: 'Article not found'
                })
            }
        }).then(() => {
            Article.deleteOne({ _id: articleId }).then(() => {
                res.status(200).json({
                    message: `Article _id:${articleId} Deleted`
                })
            }).catch(error => {
                res.status(500).json({
                    error
                })
            });
        })
    }
}