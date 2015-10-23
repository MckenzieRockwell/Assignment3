//comment header Author: Mckenzie Rockwell,
// website: portfolio,
//filename: index.js,
// description: This is the file where all of the
// urls our application with respond to are paired with
//callbacks for handling the requests
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next){
  res.render('home', {page: "home", title: "Home"});
});

router.get('/about', function(req, res, next){
	res.render('about', {page: "about", title: "About me"});
});

router.get('/services', function(req, res, next){
	res.render('services', {page: "services", title: "Services"});
}); 

router.get('/projects', function(req, res, next){
	res.render('projects', {page: "projects", title: "Projects"}); 
}); 

router.get('/contact', function(req, res, next){
	res.render('contactMe', {page: "contact", title: "Contact me"})
});

module.exports = router;