var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next){
  res.render('home');
});


router.get('/about', function(req, res, next){
	res.render('about');
});

router.get('/services', function(req, res, next){
	res.render('services');
}); 

router.get('/projects', function(req, res, next){
	res.render('projects'); 
}); 

router.get('/contact', function(req, res, next){
	res.render('contactMe')
});

module.exports = router;