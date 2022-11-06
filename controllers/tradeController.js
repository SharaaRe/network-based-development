const model = require('../models/trade');


// GET /stories: send all stories to the user
exports.index = (req, res)=>{
    let trades = model.getTrades();
    let categories = model.getCategories();
    res.render('./trade/index', {categories, trades});
};  

// GET /stories/new: send html for for creating a new story
exports.new = (req, res)=>{
    let categories = model.getCategories();
    console.log(categories);
    res.render('./trade/new', {categories});
};


// POST /stories/: create a new story

exports.create = (req, res)=>{
    let trade = req.body;
    trade = model.addTrade(trade);
    if (trade) {
        res.redirect('/trades/' + trade.id);
    }
};


exports.show = (req, res, next)=>{
    let id = req.params.id;
    console.log(id)
    let trade = model.findByID(id);
    if (trade) {
        console.log('trade: ', trade);
        res.render('./trade/show', {trade});

    } else {
        
        let err = new Error('Cannot find a trade with id' + id);
        err.status = 404;
        next(err);
        
    }
};

// GET /trades/:id/edit: send html form for editing a trade

exports.edit = (req, res, next)=>{
    let id = req.params.id;
    let trade = model.findByID(id);
    let categories = model.getCategories();

    if (trade) {
        res.render('./trade/edit',{categories, trade});
    }else {
        let err = new Error('Cannot find a story with id ' + id);
        err.status = 404;
        next(err);
        
    }
};

// PUT /trades/:id : send html form for editing a trade

exports.update = (req, res, next)=>{
    let id = req.params.id;
    let trade = req.body;
    if (model.updateById(id, trade)) {
        res.redirect('/trades/'+id);
    } else {
        let err = new Error('Cannot find a trade with id ' + id);
        err.status = 404;
        next(err);
    }
};


// PUT /trades/:id : send html form for editing a trade

exports.delete = (req, res, next)=>{
    let id = req.params.id;
    if (model.deleteById(id)) {
        res.redirect('/trades/');
    } else {
        let err = new Error('Cannot find a trade with id ' + id);
        err.status = 404;
        next(err);
    }
};