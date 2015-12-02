/*
Author: Mckenzie Rockwell
website: express portfolio
Description: This file is used to handle all of the server requests
pertaining to the todo list page. 
*/

var express = require('express');
var passport = require('passport');
var router = express.Router();

var User = require('../models/user');

var Todo = require('../models/todo');


function requireAuth(req, res, next){
	if(!req.isAuthenticated()){
	return res.redirect('todos/login'); 
	}
	next();
}



router.get('/todolist', function(req, res, next){
	res.render('todolist',{
		page: 'todolist',
		title: 'List of to do items',
		authed: true
	});
}); 

/*
This route responds with a json object of
the todolist as a whole.
*/

router.get('/todolist.json', function(req, res, next){
	Todo.find().sort('createdAt').exec(function(err, todos){
		if(err){
			console.log(err);
			res.end(err);
		}else{
			res.json(todos);
		}
	});
}); 

/*
This route is used by the item controller when edit mode is exited
using the cancel button. return is json representing the
values which the form reverts back to.
*/

router.post('/getitem.json', function(req, res, next){
	var thisid = req.body.id;
	console.log(thisid); 
	Todo.findById(thisid, function(err, thisItem){
		if(err){
			console.log(err);
			res.end(err); 
		}else{
			res.json(thisItem);
		}
	}); 
}); 

/*
This route is used to update the values of an existing todo
item.
*/

router.post('/edit', function(req, res, next){
	var edited = req.body; 
	var thisid = req.body._id;
	var newnotes = req.body.notes;
	var newname = req.body.name;
	var newcompleted = req.body.completed;

	Todo.findById(thisid, function(err, thisItem){
		if(err){
			console.log(err);
			res.end(err);
		}else{
			thisItem.notes = newnotes;
			thisItem.name = newname;
			thisItem.completed = newcompleted;

			thisItem.save(function(err){
				if(err){
					console.log(err);
					res.end(err);
				}else{
					res.end(); 
				}
			})
		}
	});

});

router.post('/delete', function(req, res, next){
	var thisid = req.body.id;
	console.log(thisid); 
	Todo.remove({_id: thisid}, function(err){
		if(err){
			console.log(err);
			res.end(err);
		}else{
			res.end(); 
		}
	});

}); 


/*
This route is used to create a new todo list item
*/
router.post('/add', function(req, res, next){
	Todo.create({
	name: req.body.name,
	notes: req.body.notes,
	createdAt: Date()
	}, function(err, Todo){
		if(err){
			console.log(err);
			res.end(err);
		}else{
			res.json(Todo);
		}
	});
});

module.exports = router; 




