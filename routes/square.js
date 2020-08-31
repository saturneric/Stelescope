var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var db = require('../models/mongodb.js');
var Post = require('../models/post.js')

router.get('/square', function(req, res, next) {

     	res.render('square', { title: '广场' });
});

router.post('/square', function (req, res, next) {
	
		var newPost = new Post({ 
	     	username: req.session.user.username, 
	     	data: req.body.post,
	     	time: new Date(),
			});

		newPost.save(function(err) {
		if (err) {
		req.flash('error', err);  return res.redirect('/square');
		}
		req.flash('success', '发表成功'); res.redirect('/square');
		});
});

module.exports = router;