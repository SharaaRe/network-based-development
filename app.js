//require modules
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override')
const tradeRoutes = require('./routes/tradeRoutes');
const mongoose = require('mongoose')

// create app
app = express();

//configure app
let port = 3000;
let host = 'localhost';
app.set('view engine', 'ejs');


mongoose.connect('mongodb://localhost:27017/nbd', {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
    //start the server
app.listen(port, host, ()=>{
    console.log('Server is running on port', port);
})
})
.catch(err=>console.log(err.message))

//mount middleware
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(morgan('tiny'));
app.use(methodOverride('_method'));

//set up routes
app.get('/', (req, res)=>{
    res.render('index');
});

app.use('/trades', tradeRoutes);
app.use((req, res, next) => {
    let err = new Error('The Server cannot locate '+ req.url);
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    console.log(err.stack);
    if(!err.status) {
        err.status = 500;
        err.message = ("Internal Server Error!");
    }
    res.status(err.status);
    res.render('error', {error: err});
});