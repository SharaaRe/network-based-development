const express = require('express');
const controller = require('../controllers/offerController')
const {isAuthenticated, isAuthor, isOfferRelated, isOwner, isReceiver, isTradeOwner} = require('../middlewares/auth');
const {validateid, validateOffer} = require('../middlewares/validator');

const router = express.Router();

// GET /offers: send all trades to the user
router.get('/', controller.index);

// GET /offers/:id/new: send html for for creating a new trade

router.get('/:id/new', isAuthenticated, controller.new);

// POST /offers/ create a new trade

router.post('/', validateOffer, isAuthenticated, isTradeOwner, controller.create);

// // GET /offers/:id: send details of a trades identified by id

router.get('/:id', validateid, isAuthenticated, isOfferRelated, controller.show);


// PUT /offers/:id/reject reject the trade offer
router.put('/:id/reject', validateid, isAuthenticated, validateid, isReceiver, controller.reject);


// PUT /offers/:id/accept accept the trade offer
router.put('/:id/accept', validateid, isAuthenticated, validateid, isReceiver, controller.accept);


router.delete('/:id', validateid, validateid, isOwner, controller.delete);

module.exports = router;