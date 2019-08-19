var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ticketSchema = new Schema({
    seat: {
        type: String,
        enums: {min: 'A1', max:'F99'},
        required: true,
        unique: true,
    },
    price: {
        type: Number,
        min: 0
    },
    flight: [{
        type: Schema.Types.ObjectId,
        ref: 'Ticket'
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model(
    'Ticket',
    ticketSchema
    );