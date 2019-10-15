var express = require('express');
var router = express.Router();
var fs = require('fs');
var ejs = require('ejs');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test');

var db = mongoose.connection;

db.on('error',function(){
	console.log('connection failed!!');
});

db.once('open',function(){
	console.log('connect!!!');
});

var board = new mongoose.Schema({
	seq : 'number',
	boardcd : 'string',
	title : 'string',
	contents : 'string',
	userid : 'string',
	regdate : 'date',
	moddate : 'date',
	viewcnt : 'number'
});

var Board = mongoose.model('Schema',board);

var newBoard = new Board({"seq":"3","boardcd":"B201910141630303","title":"제목","contents":"내용.!!!","userid":"작성자","regdate":"20191010101020","moddate":"20191013162520","viewcnt":"1"});

/* 검색  */
router.get('/find', function(req, res, next) {
	
	Board.find(function(err, result){
  		
  		if(err) {
  			console.log("error :"+err);
  			return;
  		}
  		
  		console.log("test : "+result);
  		

  		
  		res.render('nosql',{data:result});
  	});

});
/* 등록  */
router.get('/add', function(req, res, next) {
	
	newBoard.save(function(err, result){
		if(err){
			console.log(err);
		}
		else{
			console.log('save!');
		}
	});
	
	res.redirect('/nosql/find');

});

module.exports = router;



