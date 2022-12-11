const model = require('../models/user');
const Trade = require('../models/trade');
const Offer = require('../models/offer');

exports.new = (req, res, next) => {
    res.render('./user/new');
};


exports.create = (req, res, next) => {
    let user = new model(req.body);
    user.save()
    .then(user=> res.redirect('/users/login'))
    .catch(err=>{
        if(err.name === 'ValidationError') {
            req.flash('error', err.message);
            res.redirect('users/new');
        }
        if (err.code === 11000) {
            req.flash('error', 'This email has already in use, please enter another email address!');
            res.redirect('/users/new');
        }
        next(err);

    });
};

exports.getUserLogin = (req, res, next) => {
    res.render('./user/login');
};

exports.login = (req, res, next)=>{

    let email = req.body.email;
    let password = req.body.password;
    model.findOne({ email: email })
    .then(user => {
        if (!user) {
            console.log('wrong email address!');
            req.flash('error', 'Wrong email address!');  
            res.redirect('/users/login');
            } else {
            user.comparePassword(password)
            .then(result=>{
                if(result) {
                    req.session.user = user._id;
                    req.flash('success', 'You have successfully logged into your account!');
                    res.redirect('/users/profile');
            } else {
                req.flash('error', 'wrong password');      
                res.redirect('/users/login');
            }
            });     
        }     
    })
    .catch(err => next(err));
};

exports.profile = (req, res, next)=>{
    let id = req.session.user;
    let categories = Trade.schema.path('category').enumValues;

    Promise.all([model.findById(id), Trade.find({owner: id}), Offer.find({owner: id, stat: 'pending'}).populate('ownerItem'), Offer.find({receiver:id, stat:'pending'}).populate('receiverItem')])
    .then(results=>{
        const [user, trades, sentOffers, receivedOffers] = results;
        res.render('./user/profile', {user, trades, categories, sentOffers, receivedOffers});
    })
    .catch(err=>next(err));
};

exports.logout = (req, res, next)=>{
    req.session.destroy(err=>{
        if(err) 
           return next(err);
       else
            res.redirect('/');  
    });
   
 };
