var Ticket = require('../models/ticket');
var Flight = require('../models/flight');

module.exports = {
  new: newTicket,
  create,
  addTicket
};

function addTicket(req, res) {
  Flight.findById(req.params.id, function(err, flight) {
    flight.flightNo.push(req.body.ticketId);
    flight.save(function(err) {
      res.redirect(`/flights/${flight._id}`);
    });
  });
}

function create(req, res) {
  var s = req.body.born;
  req.body.born = `${s.substr(5,2)}-${s.substr(8,2)}-${0,4}`;
  Ticket.create(req.body, function(err, ticket){
    res.redirect('/tickets/new');
  });
}

function newTicket(req, res) {
  Ticket.find({}, function(err, tickets) {
    res.render('tickets/new', {
      title: 'Buy Ticket',
      tickets
    });
  });
}