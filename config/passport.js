/*
This fill contains the configuration of 
passport authentication functions.
Only one strategy, given the name of local-login is defined here.
*/

var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/user');

module.exports = function(passport) {

	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});
	
	passport.deserializeUser(function(id, done) {
		User.findById(id, function(err, user) {
			done(err, user);
		});
	});
	
	passport.use('local-login', new LocalStrategy({
		passReqToCallback: true
	},
	function(req, username, password, done) 
		{	
			User.findOne({
				'username':username
			}, function(err, user) {
				if(err) {
					return done(err);
				}
				
				if(!user) {
					return done(null, false);
				}
				
				if(!user.validPassword(password)) {
					return done(null, false);
				}

				return done(null, user);
			});
		}
	));
	
}