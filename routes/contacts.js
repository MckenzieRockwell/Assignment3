var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var bisContact = require('../models/bisContact'); 



// router.get('/contactlist', function(req, res, next){
// 	res.render('contactlist', {page: 'contactlist', title: 'Contact List'}); 
// });

router.get('/contactlist', function(req, res, next){
	bisContact.find(function(err, contacts){
		if(err){
			console.log(err);
			res.end(err);
		}else{
			res.render('contactlist',{
			 page: 'contactlist',
			 title: 'List of Business Contacts',
			 contacts: contacts
			}); 
		}
	});
});

router.get('/addcontact', function(req, res, next){
	res.render('addcontact', {page: 'addcontact', title: 'Add Contact'}); 
});


router.post('/addcontact', function(req, res, next){
	bisContact.create({
		name: req.body.name,
		number: req.body.number,
		emailaddress: req.body.mail
		} ,function(err, bisContact){
			if(err){
				console.log(err);
				res.end(err);
			}
			else{
		res.render('addcontact', {page: 'addcontact', title: 'Add Contact'}); 
			}

	}); 

});

// router.get
// 	('/editcontact', {page: 'edit contact', title: 'Edit Contact'}){
// 	res.render()
// });  



module.exports = router;