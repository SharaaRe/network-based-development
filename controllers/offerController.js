const { Model } = require('mongoose');
const model = require('../models/offer');
const user = require('../models/user');
const trade = require('../models/trade');



// GET /stories: send all stories to the user
exports.index = (req, res, next)=>{
    Promise.all([model.find({owner: id}).populate('receiverTrade', 'title').populate('senderTrade', 'title'),
     Trade.find({receiver: id}).populate('receiverTrade', 'title').populate('senderTrade', 'title')])
    .then(results=>{
        const [sentOffers, receivedoffers] = results;
        res.render('./offers/watchlist', {sentOffers, receivedoffers});
    })
    .catch(err=>next(err));
};  

exports.new = (req, res, next) => {
    let id = req.params.id;
    Promise.all([trade.find({owner: req.session.user, stat: "available"}).populate('owner', 'firstName lastName'), 
    trade.findById(id).populate('owner', 'firstName lastName')])
    .then(results=> {
        const [ownerItems, trade] = results;
        console.log(trade);
        res.render('./offer/new', {ownerItems, trade});
    })
}

exports.create = (req, res, next)=>{
    // check if both trades are not sold: it can be a middleware later
    // Authenticate if the sender is the owner of trade
    let offer = new model(req.body);
    console.log(offer);
    console.log('receiverITem id', offer.receiverItem);
    Promise.all([trade.findById(offer.receiverItem), trade.findById(offer.ownerItem)])
    .then(results => {
        const [receiverItem, ownerItem] = results;

        console.log(receiverItem, ownerItem);
        if (receiverItem && ownerItem) {
            if (receiverItem.stat === 'available' && ownerItem.stat === 'available') {
                offer.receiver = receiverItem.owner;
                offer.owner = req.session.user;
                offer.save()
                .then(()=>{
                    receiverItem.stat = 'pending';
                    ownerItem.stat = 'pending';
                    Promise.all([receiverItem.save(), ownerItem.save()])
                    .then(results => res.redirect('/users/profile'))
                    .catch(err=>next(err));
                })
                .catch(err => {
                    console.log(err.name);
                    if(err.name === 'ValidationError'){
                        err.status = 400;
                    }
                    next(err);  
                });
            } else {
                let err = new Error('An item in your trade offer is no longer available!');
                err.status = 400;
                next(err);
            }
        }else{
            let err = new Error('Trade item not existing');
            err.status = 404;
            next(err);
        }
    }).catch(err => next(err));
};


// exports.