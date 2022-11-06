const { DateTime } = require('luxon');
const {v4: uuidv4} = require('uuid');

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const tradeSchema = new Schema({
    title: {type: String, required: [true, 'title is required']},
    discription: {type: String, required: [true, 'Discription is required']},
    stat: {type: String, enum: ['sold', 'notSold'], default: 'notSold'},
    image: {type: String, default: 'image_not_available.png'},
    category: {type: String}, required: ['category is required'], enum: ['Anime', 'Manga', 'Accessories', 'Action Figures']
},
{timeseries: true}
);


module.exports = mongoose.model('Trade', tradeSchema);


