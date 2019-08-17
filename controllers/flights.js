var Flight = require('../models/flight');

module.exports = {
    new: newFlight,
    create
};

function create(req, res) {
  // convert nowBooking's checkbox of nothing or "on" to boolean
  req.body.nowBooking = !!req.body.nowBooking;
  // remove whitespace next to commas
  req.body.flightNo = req.body.flightNo.replace(/\s*,\s*/g, ',');
  // split if it's not an empty string
  if (req.body.flightNo) req.body.flightNo = req.body.flightNo.split(',');
  var flight = new Flight(req.body);
  flight.save(function(err) {
    // one way to handle errors
    if (err) return res.render('flights/new');
    console.log(flight);
    // for now, redirect right back to new.ejs
    res.redirect('/flights/new');
  });    
}

function newFlight(req, res) {
    res.render('flights/new');
}