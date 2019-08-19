var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var destinationSchema = new Schema({
    airport: { 
        type: String,
        enum: ['AUS', 'DAL', 'LAX', 'SEA']
    },
    arrival: {
        type: Date
    }
}, {
    timestamps: true
});

var flightSchema = new Schema({
    airport: { 
        type: String,
        enum: ['AUS', 'DAL', 'LAX', 'SEA'],
        default: 'SEA'
    },
    airline: {
        type: String,
        required: true,
        enum: ['American', 'Southwest', 'United']
    }, 
    flightNo: {
       type: Number,
       default: function() {
           return new Date().getFullYear();//new Date().getfullyear
       },
       min: 10,
       max: 9999
    },
    departs: {
        type: Date, 
        default: 08/19/2020
    },
    destinations: [destinationSchema],
    flightNo: [Schema.Types.ObjectId]
}, {
    timestamps: true
});

module.exports = mongoose.model('Flight', flightSchema);