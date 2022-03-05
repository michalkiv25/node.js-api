const express= require('express');
const app= express();
const morgan = require('morgan') //Throws prints so you can glue better
const mongoose =  require('mongoose');


const articlesRoutes= require('./api/roures/articles')
const categoriesRoutes= require('./api/roures/categories')
const usersRoutes= require('./api/roures/users')



mongoose.connect(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@youtube-articles-api.8egyp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
})
mongoose.connection.on('connected', ()=>{
    console.log('connected MongoDB')
})

//middlewares
app.use(morgan("dev"));
app.use('/uploads', express.static('uploads')); // add img from server like public
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});


// Routes
app.use('/articles', articlesRoutes);
app.use('/categories', checkAuth, categoriesRoutes);
app.use('/users', usersRoutes);

//404
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
})

//error
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})

module.exports = app;
