var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var bisContact = require('../models/bisContact'); 



router.get('/login', function(req, res, next){
	res.rend('loginform', {page: 'login', title: 'User login'});
})

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

router.get('/contactform', function(req, res, next){
	res.render('contactform', {page: 'contactform', title: 'Add Contact'}); 
});

router.get('/edit/:id', function(req, res, next){
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


router.post('/contactform', function(req, res, next){
	var thisId = req.body.thisId;

	if(typeof thisId !== 'undefined'){
		console.log(thisId);
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

// router.get
// 	('/editcontact', {page: 'edit contact', title: 'Edit Contact'}){
// 	res.render()
// });  



module.exports = router;