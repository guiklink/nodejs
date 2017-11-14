var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));

var Sign = require('../models/SignModel');



// INSERT A VALUE IN THE DB 
router.post('/', function (req, res) {
    Sign.create({
            name : req.body.name,
            lat : req.body.lat,
            long : req.body.long,
            //created_date : req.body.created_date
        }, 
        function (err, sign) {
            if (err) 
            	return res.status(500).send(err);
            res.status(200).send(sign);
        });
});


// RETURNS ALL THE USERS IN THE DATABASE
router.get('/', function (req, res) {
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