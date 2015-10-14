var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next){
  res.render('home', { title: 'Express'});
});

router.get('/home', function(req,res, next){
	res.render('gangster')
}); 

router.get('/about', function(req, res, next){
	res.render('about', { title: 'About me'});
});

router.get('/services', function(req, res, next){
	res.render('services');
}); 

router.get('/projects', function(req, res, next){
	res.render('projects'); 
}); 

router.get('/contactme', function(req, res, next){
	res.render('contactMe')
});

module.exports = router;