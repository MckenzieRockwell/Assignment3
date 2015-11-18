var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var businessContact = require('../models/bisContact'); 


router.get('/contactlist', function(req, res, next){
	res.render('contactlist', {page: 'contactlist', title: 'List of Business Contacts'});
});

router.get('/addcontact', function(req, res, next){
	res.render('addcontact', {page: 'addcontact', title: 'Add Contact'}); 
});


router.post('/addcontact', function(req, res, next){
	businessContact.create({
		name: req.body.name,
		number: req.body.number,
		email: req.body.mail
		} ,function(err, bisContact){
			if(err){
				console.log(err);
				res.end(err);
			}
			else{
				res.redirect('/contactslist');
			}

	}); 

});

// router.get
// 	('/editcontact', {page: 'edit contact', title: 'Edit Contact'}){
// 	res.render()
// });  



module.exports = router;