const Trade = require('../models/trade');

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