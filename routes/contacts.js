var express = require('express');
var passport = require('passport');
var router = express.Router();
var mongoose = require('mongoose');

var User = require('../models/user');

var bisContact = require('../models/bisContact'); 


function requireAuth(req, res, next){

  if(!req.isAuthenticated()){
    return res.redirect('/login');
  }
  next();
}


router.get('/login', function(req, res, next){
	res.render('loginform', {page: 'login', title: 'User login'});
});


router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/contacts/contactlist',
    failureRedirect: '/contacts/login'
}));


router.get('/contactlist',requireAuth, function(req, res, next){
	bisContact.find(function(err, contacts){
		if(err){
			console.log(err);
			res.end(err);
		}else{
				if(typeof contacts !== 'undefined')
				{
					res.render('contactlist',{
					page: 'contactlist',
					title: 'List of Business Contacts',
					contacts: contacts
					});
				}else{
					res.render('contactlist',{
					page: 'contactlist',
					title:'List of Business Contacts'
					}); 
				}
		}
	});
});

router.get('/contactform',requireAuth, function(req, res, next){
	res.render('contactform', {page: 'contactform', title: 'Add Contact'}); 
});

router.get('/edit/:id',requireAuth, function(req, res, next){
	var id = req.params.id;
	bisContact.findById(id, function(err, thiscontact){
		if(err){
			console.log(err);
			res.end(err);
		}else{
			res.render('contactform',{
				page: 'contactform',
				title: '',
				editmode: true,
				thiscontact: thiscontact
			});
		}
	});
}); 


router.post('/contactform',requireAuth, function(req, res, next){
	var thisId = req.body.thisId;

	if(typeof thisId !== 'undefined'){
 		var thisBisContact = new bisContact({
 			name: req.body.name,
 			number: req.body.number,
 			emailaddress: req.body.mail,
 			_id: thisId
 		}); 

 		bisContact.update({_id: thisId}, thisBisContact, function(err){
 			if(err){
 				console.log(err); 
 				res.end(err);
 			}else{
 				res.redirect('/contacts/contactlist');
 			}
 		}); 
	}else{
		console.log('its null');
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
				res.redirect('/contacts/contactlist');
			}

		});
	}



});

router.get('/delete/:id', function(req, res, next){
	var id = req.params.id; 
	bisContact.remove({_id: id}, function(err){
		if(err){
			console.log(err);
			res.end(err);
		}else{
			res.redirect('/contacts/contactlist'); 
		}

	}); 
}); 


module.exports = router;