var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var testData;

router.use(bodyParser.urlencoded({ extended: true }));

var Sign = require('../models/SignModel');


  ///////////////////////////////
 // Insert a sign into the DB //
///////////////////////////////

router.post('/', function (req, res) {
	var coord = req.body.coordinates.split(',').map(Number); // retrieve coordinates
    Sign.create({
            name : req.body.name,
            // Flip coordinates since Mongo uses (long, lat)
            coordinates:[coord[1], coord[0]]
        }, 
        function (err, sign) {
            if (err) 
            	return res.status(500).send(err);
        });
});


  //////////////////////////////////
 // Get all the values in the DB //
//////////////////////////////////

router.get('/', function (req, res) {
	console.log("Shouldnt be here. Returning all users.")
    Sign.find({}, function (err, signs) {
        if (err) 
        	return res.status(500).send(err); // Internal Server error
        res.status(200).send(signs);
    });
});



  //////////////////////
 // Get a sign by ID //
//////////////////////

// id : MongoDB _id

router.get('/:id', function (req, res) {
    Sign.findById(req.params.id, function (err, sign) {
        if (err) 
        	return res.status(500).send(err); // Internal Server error
        if (!sign) 
        	return res.status(404).send("Sign could not be found."); // Not found

        res.status(200).send(sign);
    });
});



  ////////////////////////////
 // Render Google Maps HTML//
////////////////////////////

// coordinates (lat, long)
// radius: a number of meters (float)

router.get('/:coordinates/:radius', function (req, res) {
    console.log("Opening map...")

    res.render('map.html', {coord:req.params.coordinates, radius: req.params.radius});
});


  ////////////////////////////////////////////////////////////////////
 // Retrieves a JSON with the signs within a range (m) from the DB //
////////////////////////////////////////////////////////////////////

// coordinates (lat, long)
// radius: a number of meters (float)

router.get('/retrieveSigns/:coordinates/:radius', function (req, res) {
	var coord = req.params.coordinates.split(',').map(parseFloat);
	var radius = parseFloat(req.params.radius);

	Sign.aggregate(
		{$geoNear:{
		  "near":{"type":"Point","coordinates":[coord[1],coord[0]]},
		  "distanceField":"calculated",
		  "maxDistance":parseFloat(radius),
		  "spherical": true
		}},
		{$sort:{"calculated":1}},
		{$group:{"_id": "$name", "coordinates": { "$first": "$coordinates" }, "calculated": { "$first": "$calculated" }}}, 
		{$sort:{"calculated":1}},
	function (err, sign) {
		if (err) 
			return res.status(500).send(err); // Internal Server error
		
        console.log("Loading JSON...")
        console.log(sign)
		res.json(sign);
		
	});

	
});


  /////////////////////////
 // Delete a sign by ID //
/////////////////////////

// id : MongoDB _id

router.delete('/:id', function (req, res) {
    Sign.findByIdAndRemove(req.params.id, function (err, sign) {
        if (err) 
        	return res.status(500).send(err); // Internal Server error

        res.status(200).send("Sign "+ sign.name +" was deleted.");
    });
});


  /////////////////////////
 // Update a sign by ID //
/////////////////////////

// id : MongoDB _id

router.put('/:id', function (req, res) {
    
    Sign.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, sign) {
        if (err) 
        	return res.status(500).send(err); // Internal Server error
        res.status(200).send(sign);
    });
});


module.exports = router;