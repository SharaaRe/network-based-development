const { Model } = require('mongoose');
const { findById, findByIdAndUpdate } = require('../models/offer');
const user = require('../models/user');
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
    Promise.all([
        model.findById(id).populate('owner', 'firstName lastName'),
        user.findById(req.session.user)
    ])
    .then(results=> {
        const [trade, user] = results;
        if (trade) {
            console.log('trade: ', trade);
            res.render('./trade/show', {trade, user});
    
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


exports.watchlist = (req, res, next) => {
    let id = req.params.id;
    model.findById(id)
    .then(trade=>{
        if (trade) {
            user.updateOne({_id: req.session.user}, {$addToSet: {watchlist: id}})
            .then(result=>{
                console.log(result);
                if(result.modifiedCount){
                    req.flash('success', 'The item ' + trade.title + ' is successfully added to your watchlist!');
                    res.redirect('/users/profile');
                }else {
                    let err = new Error('Unable to add item to the watchlist!');
                    err.status = 503;
                    next(err);
                }
            }
        ).catch(err=>next(err));
        } else {
            let err = new Error('Trade not found!');
            err.status = 404;
            next(err);
        }


    }).catch(err=>next(err));
};

exports.deleteFromWatchlist = (req, res, next) => {
    let id = req.params.id;
    model.findById(id)
    .then(trade=>{
        if (trade) {
            user.updateOne({_id: req.session.user}, {$pull: {watchlist: id}})
            .then(result=>{
                console.log('result', result);
                if(result.acknowledged){
                    req.flash('success', 'The item' + trade.title + ' is deleted from your watchlist!');
                    res.redirect('back');
                }else {
                    let err = new Error('Unable to remove item from watchlist!');
                    next(err);
                }
            }
        ).catch(err=>next(err));
        } else {
            let err = new Error('Trade not found!');
            err.status = 404;
            next(err);
        }


    }).catch(err=>next(err));
};