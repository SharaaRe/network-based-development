const Trade = require('../models/trade');
const Offer = require('../models/offer');
const trade = require('../models/trade');


//check if user is a guest
exports.isGuest = (req, res, next) => {
    if (!req.session.user)
        next();
    else {
        req.flash('error', 'You are already logged in');
        res.redirect('/users/profile');
    }
};

//check if user is authenticated
exports.isAuthenticated = (req, res, next) => {
    console.log(req.session.user);
    if (req.session.user)
        next();
    else {
        req.flash('error', 'Please login first');
        res.redirect('/users/login');
    }
};

exports.isAuthor = (req, res, next) => {
    let id = req.params.id;
    Trade.findById(id)
    .then(trade=>{
        if (trade) {
            if (trade.owner == req.session.user) {
                next();
            } else {
                let err = new Error('Unauthorized to access the resources')
                err.status = 401;
                return next(err);
            }
        }
    })
    .catch(err=>next(err));
};


exports.isOfferRelated = (req, res, next) => {
    let id = req.params.id;
    Offer.findById(id)
    .then(offer=>{
        if (offer) {
            if (offer.owner == req.session.user || offer.receiver == req.session.user) {
                next();
            } else {
                let err = new Error('Unauthorized to access the resources');
                err.status = 401;
                return next(err);
            }
        } else {
            let err = new Error('Cannot find an offer with this id');
            err.status = 404;
            return next(err);
        }
    })
    .catch(err=>next(err));
};

exports.isTradeOwner= (req, res, next) => {
    let offer = req.body;
    Trade.findById(offer.ownerItem)
    .then(trade=>{
        if (trade) {
            if (trade.owner == req.session.user) {
                next();
            } else {
                let err = new Error('Unauthorized to access the resources')
                err.status = 401;
                return next(err);
            }
        } 
    })
    .catch(err=>next(err));
};


exports.isOwner = (req, res, next) => {
    let id = req.params.id;
    Offer.findById(id)
    .then(offer=>{
        if (offer) {
            if (offer.owner == req.session.user) {
                next();
            } else {
                let err = new Error('Unauthorized to access the resources')
                err.status = 401;
                return next(err);
            }
        } 
    })
    .catch(err=>next(err));
};


exports.isReceiver = (req, res, next) => {
    let id = req.params.id;
    Offer.findById(id)
    .then(offer=>{
        if (offer) {
            if (offer.receiver == req.session.user) {
                next();
            } else {
                let err = new Error('Unauthorized to access the resources')
                err.status = 401;
                return next(err);
            }
        } 
    })
    .catch(err=>next(err));
};