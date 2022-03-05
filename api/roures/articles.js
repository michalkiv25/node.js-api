const express= require('express')
const router= express.Router();
const upload= require('../middlewares/upload')
const checkAuth= require('../middlewares/checkAuth')

const {getAllArticles,createArticles,getArticle,updateArticles,deleteArticles} = require('../controllers/articles')

router.get('/', getAllArticles);
router.get('/:articleId', getArticle);

router.post('/', checkAuth, upload.single('image') ,createArticles); // add img middlwewares
router.patch('/:articleId', checkAuth, updateArticles);
router.delete('/:articleId', checkAuth, deleteArticles);

module.exports = router;