const mongoose = require('mongoose');

const articleSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: { type: String, required: true },
    description: { type: String, required: true },
    content: { type: String, required: true },
    categoryId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Category' },
    //Want to always have an article for each category
    //ref= name model,Who knew which objectid to take
    image: { type: String }
});

module.exports = mongoose.model('Article', articleSchema);