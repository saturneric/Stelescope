var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var db = require('../models/mongodb.js');
var User = require('../models/user.js')
//var dealstr = require ('../models/dealstr.js');

/* GET home page. */
router.get('/', function(req, res, next) {

     	res.render('index', { title: 'Express' });
});


router.get('/talkgroup', function(req, res, next) {

     	res.render('index', { title: 'Express' });
});

router.get('/school', function(req, res, next) {

     	res.render('index', { title: 'Express' });
});

router.get('/news', function(req, res, next) {

     	res.render('index', { title: 'Express' });
});

router.get('/addwords',function (req,res) {
	// body...
	res.render('addwords', {title:'Words Add'});
});

router.get('/login',function  (req,res) {
	// body...
	res.render('login',{title:'Login'});
});

router.post('/addwords',function (req,res) {
	// body...	
	     console.log(req.body.pop);
         if (req.body.w_name.length == 0) {
	         req.session.err = '单词名不能为空';
	         return res.redirect('/addwords');
	     }
	     if (req.body.meaning.length == 0) {
	         req.session.err = '意思不能为空';
	         return res.redirect('/addwords');
	     }


	     
	     var newWords = new Words({ 
	     	name: req.body.w_name, 
	     	meaning: req.body.meaning,
	     	pop: "n.",
			});

	     User.get(newUser.username, function(err, word) {
			if (word){
				err = '单词重复, 请再次输入新的单词';
			};
			if (err) {
			req.session.err = err; return res.redirect('/reg');
			}
			else {
				newWords.save(function(err) {
	            if (err) {
				req.session.err = err; return res.redirect('/reg');
				}
			    req.session.user = newUser; req.session.success = '添加成功!'; 
			    res.redirect('/addwords');
			    });
			}
		});
	res.redirect('/addwords');
});

router.post('/login',function (req,res) {
	// body...
	var md5 = crypto.createHash("md5");
	var ipassword = md5.update(req.body.password).digest('base64');

	User.get(req.body.username, function (err, user) {
		// body...
		if(user){
         	if(ipassword == user.password){
         		req.session.success = '登录成功';
         		req.session.user = user;
         		res.redirect('/');
         	}
         	else{
         		req.session.err = '密码错误';
         		res.redirect('/login');
         	};
		}
        else{
        	req.session.err = '用户不存在';
        	res.redirect('/login');
        }
	});
});

router.get('/logout',function (req,res) {
	// body...
	delete req.session.user;
	req.session.success = '登出成功';
	res.redirect('/');
});

module.exports = router;
