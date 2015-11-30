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



router.get('/todolist',  requireAuth, function(req, res, next){
	Todo.find().sort('createdAt').exec(function(err, todos){
		if(err){
			console.log(err);
			res.end(err);
		}else{
				if(typeof todos !== 'undefined'){
					res.render('todolist',{
					page: 'todolist',
					title: 'List of to do items',
					authed: true,
					todos: todos
					});
				}else{
					res.render('todolist', {
					page: 'todolist',
					title: 'List of to do items',
					authed: true
					});
				}
		}
	}); 
});

module.exports = router; 




