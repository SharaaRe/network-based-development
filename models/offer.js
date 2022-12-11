const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const offerSchema = new Schema({
    stat: {type: String, enum: ['accepted', 'rejected', 'pending', 'withdrawn'], default: 'pending'},
    owner: {type: Schema.Types.ObjectId, ref: 'User'},
    receiver: {type: Schema.Types.ObjectId, ref: 'User'},
    ownerItem: {type: Schema.Types.ObjectId, ref: 'Trade'},
    receiverItem: {type: Schema.Types.ObjectId, ref: 'Trade'}
},
{timeseries: true}
);


module.exports = mongoose.model('Offer', offerSchema);

