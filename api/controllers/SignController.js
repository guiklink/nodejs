var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));

var Sign = require('../models/SignModel');



// // INSERT A VALUE IN THE DB 
// router.post('/', function (req, res) {
//     Sign.create({
//             name : req.body.name,
//             lat : req.body.lat,
//             long : req.body.long,
//             //created_date : req.body.created_date
//         }, 
//         function (err, sign) {
//             if (err) 
//             	return res.status(500).send(err);
//             res.status(200).send(sign);
//         });
// });

// INSERT A VALUE IN THE DB 
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
            res.status(200).send(sign);
        });
});


// RETURNS ALL THE USERS IN THE DATABASE
router.get('/', function (req, res) {
	console.log("Shouldnt be here. Returning all users.")
    Sign.find({}, function (err, signs) {
        if (err) 
        	return res.status(500).send(err);
        res.status(200).send(signs);
    });
});


// GETS A SINGLE USER FROM THE DATABASE
router.get('/:id', function (req, res) {
    Sign.findById(req.params.id, function (err, sign) {
        if (err) 
        	return res.status(500).send(err);
        if (!sign) 
        	return res.status(404).send("Sign could not be found.");

        res.status(200).send(sign);
    });
});


// GETS A LIST OF SIGNS WITHIN A RANGE
// router.get('/:lat/:long/:radius', function (req, res) {
// 	var point = { type : 'Point', coordinates : [parseFloat(req.params.long),parseFloat(req.params.lat)], index: '2dsphere'};
// 	var options = {maxDistance : parseFloat(req.params.radius), spherical : true};
//     Sign.geoNear(point, options, function (err, sign) {
//         if (err) 
//         	return res.status(500).send(point);



//         res.status(200).send(sign);
//     });
// });


// GETS A LIST OF SIGNS WITHIN A RANGE
router.get('/:coordinates/:radius', function (req, res) {
	var coord = req.params.coordinates.split(',').map(parseFloat);
	var radius = parseFloat(req.params.radius)
	// console.log("I in the proper place!")
	// console.log(coord)
	// console.log(radius)

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
	        	return res.status(500).send(err);
	        // out = docs.map(function(doc) { return doc.tag; });
	        res.render('test.html', {data:[sign], lat: sign[0]["coordinates"][0]});
	        // res.json(sign)
        	// res.status(200).send(sign[0]["coordinates"]);
    	});
});

// 41.910891,-87.642868/100000

// DELETES A USER FROM THE DATABASE
router.delete('/:id', function (req, res) {
    Sign.findByIdAndRemove(req.params.id, function (err, sign) {
        if (err) 
        	return res.status(500).send(err);

        res.status(200).send("Sign "+ sign.name +" was deleted.");
    });
});


// UPDATES A SINGLE USER IN THE DATABASE
router.put('/:id', function (req, res) {
    
    Sign.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, sign) {
        if (err) 
        	return res.status(500).send(err);
        res.status(200).send(sign);
    });
});


module.exports = router;