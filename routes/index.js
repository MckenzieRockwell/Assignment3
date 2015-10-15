var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next){
  res.render('home', {page: "home"});
});


router.get('/about', function(req, res, next){
	res.render('about', {page: "about"});
});

router.get('/services', function(req, res, next){
	res.render('services', {page: "services"});
}); 

router.get('/projects', function(req, res, next){
	res.render('projects', {page: "projects"}); 
}); 

router.get('/contact', function(req, res, next){
	res.render('contactMe', {page: "contact"})
});

module.exports = router;