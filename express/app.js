"use strict";

const cryptoModule = require('../libs/cryptoModule');
const funcs = require('../interfaces/funcs');
const express = require('express');

let app = express();

app.use(express.static('.'))


app.get('/api/user/auth', function (req, res) {
	funcs.auth({
		name: req.query.name,
		pass: req.query.pass
	}, true).then(function(user){
		if (user) {
			res.json(user);
  		} else {
			res.json({status: "failed"});
		}
  	}); 
})

app.get('/api/user/logout', function (req, res) {
	funcs.auth({
		sessionId: req.query.sessionId
	}, true).then(function(user){
		if (user) {
			res.json({status: 'ok'});
  		} else {
			res.json({status: "failed"});
		}
  	}); 
})

app.get('/api/user/list', function (req, res) {
	if (!req.query.name || req.query.name.length <= 3) {
		res.json({status: "failed"});
		return false; 
	}

	funcs.auth({
		sessionId: req.query.sessionId
	}).then(function(user){	
		if (user) {			
			var options = {name: req.query.name, page: 0, pageSize: 100};
	  		funcs.listUser(options).then(function(users){
	  			if (users) {
		  			res.json(users);
		  		}	
	  		});
		} else {
			res.json({status: "failed"});
		}
	});
})

app.get('/api/user/register', function (req, res) {
	var request = req;
	funcs.auth({
		name: req.query.name,
		pass: req.query.pass
	}, true).then(function(user){
		if (!user) {
			let userObj = {
				name: request.query.name,
				email: request.query.email,
				pass: cryptoModule.hashPassword(request.query.pass),
				admin: request.query.admin,
				sessionId: cryptoModule.getSessionId(),
				balance: 100
			};			
			funcs.reg(userObj).then(function(user){
				res.json(userObj);
			});
  		} else {
			res.json({status: "failed"});
		}	
  	}); 
})

app.get('/api/post/add', function (req, res) {
  	funcs.auth({
		sessionId: req.query.sessionId
	}).then(function(user){		
		if (user) {
			let transaction = {
				userfrom: user.name,
				userto: req.query.user,
				post: req.query.post
			};

			let options = {
				transaction: transaction
			};

	  		funcs.addPost(options).then(function(transaction){
	  			if (transaction) {
		  			res.json({status: "ok"});
		  		}	
	  		});  	
	
		} else {
			res.json({status: "failed"});
		}
	});
})

app.get('/api/post/list', function (req, res) {
  	funcs.auth({
		sessionId: req.query.sessionId
	}).then(function(user){	
		if (user) {
			var options = {
				pageSize: req.query.pageSize*1 || 100, 
				page:req.query.page*1 || 0,
				user: req.query.user
			};
	  		funcs.listPost(options).then(function(transactions){
	  			if (transactions) {
		  			res.json(transactions);
		  		}	
	  		});
		} else {
			res.json({status: "failed"});
		}
	});
})


module.exports = app;