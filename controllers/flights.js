var Flight = require('../models/flight');
var Ticket = require('../models/ticket');

module.exports = {
    new: newFlight,
    create,
    index,
    show
};

function show(req, res) {
    Flight.findById(req.params.id).populate('flightNo').exec(function(err, flight) {
        Ticket.find({
            _id: {$nin: flight.flightNo}
        }, function(err, tickets) {
            res.render('flights/show', {
             airline: 'Airline Detail',
             flight,
            tickets 
         });
        });
      });
}

function index(req, res) {
    Flight.find({}, function(err, flights) {
        res.render('flights/index', {flights});
    });
}

function create(req, res) {
  req.body.nowBooking = !!req.body.nowBooking;
  req.body.flightNo = req.body.flightNo.replace(/\s*,\s*/g, ',');
  if (req.body.flightNo) req.body.flightNo = req.body.flightNo.split(',');
  for(let key in req.body) {
      if (req.body[key] === '') delete req.body[key];
  }

  var flight = new Flight(req.body);
  flight.save(function(err) {
    if (err) return res.redirect('flights/new');
    console.log(flight);
    res.redirect(`/flights/${flight._id}`);
  });    
}

function newFlight(req, res) {
    res.render('flights/new');
}