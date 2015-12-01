var express = require('express');
var passport = require('passport');
var router = express.Router();

var User = require('../models/user');

var Todo = require('../models/todo');


function requireAuth(req, res, next){
	if(!req.isAuthenticated()){
	return res.redirect('/login'); 
	}
	next();
}



router.get('/todolist', requireAuth, function(req, res, next){
	res.render('todolist',{
		page: 'todolist',
		title: 'List of to do items',
		authed: true
	})
}); 

router.get('/todolist.json', requireAuth, function(req, res, next){
	Todo.find().sort('createdAt').exec(function(err, todos){
		if(err){
			console.log(err);
			res.end(err);
		}else{
			res.json(todos);
		}
	});
}); 




router.post('/add', requireAuth, function(req, res, next){
	Todo.create({
	name: req.body.name,
	notes: req.body.note
	}, function(err, Todo){
		if(err){
			console.log(err);
			res.end(err);
		}else{
			res.redirect('/todos/todolist');
		}
	});
});

module.exports = router; 




