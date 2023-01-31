const { Model } = require('mongoose');
const model = require('../models/trade');


// GET /stories: send all stories to the user
exports.index = (req, res, next)=>{
    let categories = model.schema.path('category').enumValues;
    model.find()
    .then((trades) => res.render('./trade/index', {categories, trades}))
    .catch(err=>next(err))
};  

// GET /stories/new: send html for for creating a new story
exports.new = (req, res)=>{
    let categories = model.schema.path('category').enumValues;
    res.render('./trade/new', {categories});
};


// POST /stories/: create a new story

exports.create = (req, res, next)=>{
    let trade = new model(req.body);
    trade.owner = req.session.user;
    console.log(trade);
    trade.save()
    .then(res.redirect('/trades/' + trade.id))
    .catch(err => {
        console.log(err.name);
        if(err.name === 'ValidationError'){
            err.status = 400;
        }
        next(err);  
    });
};


exports.show = (req, res, next)=>{
    let id = req.params.id;

    model.findById(id).populate('owner', 'firstName lastName')
    .then(trade=> {
        if (trade) {
            console.log('trade: ', trade);
            res.render('./trade/show', {trade});
    
        } else {
            
            let err = new Error('Cannot find a trade with id' + id);
            err.status = 404;
            next(err);
            
        }
    })
    .catch(err=>next(err));
    
};

// GET /trades/:id/edit: send html form for editing a trade

exports.edit = (req, res, next)=>{
    let id = req.params.id;
    model.findById(id).
    then(trade=>{

        if (trade) {
            let categories = model.schema.path('category').enumValues;

            res.render('./trade/edit',{categories, trade});
        }else {
            let err = new Error('Cannot find a story with id ' + id);
            err.status = 404;
            next(err);
            
        }
    })
    .catch(err=>next(err));
};

// PUT /trades/:id : send html form for editing a trade

exports.update = (req, res, next)=>{
    let id = req.params.id;
    model.findByIdAndUpdate(id, req.body, {userFindAndModify: false, runValidators: true})
    .then(trade=>{
         if(trade){
             res.redirect('/trades/' + id);
         }else{
             let err = new Error('Cannot find a trade with id ' + id);
             err.status = 404;
             next(err);
         }})
    .catch(err=>{
        if(err.name === 'ValidationError'){
            err.status = 400;
        }
        next(err);
    });
};


// PUT /trades/:id : send html form for editing a trade

exports.delete = (req, res, next)=>{
    let id = req.params.id;
    model.findByIdAndDelete(id, {userFindAndModify: false})
    .then(trade=>{
         if(trade){
             res.redirect('/trades');
         }else{
             let err = new Error('Cannot find a trade with id ' + id);
             err.status = 404;
             next(err);
    }})
    .catch(err=>next(err));
};