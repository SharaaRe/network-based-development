const {body, validationResult} = require('express-validator');


exports.validateid = (req, res, next) => {
    if(!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('Invalid trade id');
        err.status = 400;
        return next(err);
    } else next();
}



exports.validateSignUp = [body('firstName', 'First Name cannot be empty!').notEmpty.apply().trim().escape(),
body('lastName', 'Last Name cannot be empty!').notEmpty.apply().trim().escape(),
body('email', 'Email must be a valid email address!').isEmail().trim().escape().normalizeEmail(),
body('password', 'Password must be at least 8 charactors and at most 64 charactors!').isLength({min: 8, max:64})]


exports.validateLogin =   [body('email', 'Email must be a valid email address!').isEmail().trim().escape().normalizeEmail(),
body('password', 'Password must be at least 8 charactors and at most 64 charactors!').isLength({min: 8, max:64})]


exports.validateTrade = [body('title', 'Title cannot be empty!').notEmpty().trim().escape(),
body('discription', 'Content must be at least 10 characters!').isLength({min: 10}).trim().escape(),
body('category', 'Category cannot be empty!').notEmpty().trim().escape()]

exports.validateOffer = (req, res, next) => {
    let id_format = /^[0-9a-fA-F]{24}$/
    if(!req.body.ownerItem.match(id_format) ||
    !req.body.receiverItem.match(id_format)
    ) {
        let err = new Error('Invalid id');
        err.status = 400;
        return next(err);
    } else next();
}


exports.validateResult = (req, res, next) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        errors.array().forEach(error=>{
            req.flash('error', error.msg);
            console.log(error.msg);
        });
        res.redirect('back')
    } else {
        next();
    }
}
