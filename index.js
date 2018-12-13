const fs = require('fs');
const util = require('util');
const EventEmmitter = require('events');
const apiController = require('./apiModule.js');
const appDeployer = require('./appDeployer.js');

const viewEmitter = appDeployer.emitter;
const apiEmitter =  apiController.emitter;

//console.log(viewEmitter);
//console.log(apiEmitter);
//console.log(apiEmitter);
/*
	EVENTOS DISPONIBLES:
	Solicitud:
		AUTH
		GETCLIENTINFO
		MAKEPAYMENT
		GETAUCTIONINFO

	Respuesta:
		AUCTIONINFO
		CLIENTINFO


*/

apiEmitter.on('AUCTIONINFO', function(auctionInfo){
	console.log("response from api")
	console.log(auctionInfo);
	viewEmitter.emit('DRAWAUCTIONS', auctionInfo);
});

apiEmitter.on('CLIENTINFO', function(clientinfo){
	console.log(clientinfo);
	viewEmitter.emit('RETURNCLIENT', clientInfo);
});

apiEmitter.on('ACTUALINFO', function(actual){
	console.log("response from api")
	console.log(actual);
	viewEmitter.emit('UPDATEACTUAL', actual);
});

apiEmitter.on('AUCTIONS', function(auctions){
	console.log("response from api")
	console.log(auctions);
	viewEmitter.emit('UPDATEAUCTIONS', auctions);
});

viewEmitter.on('GETDEBTORS', function(){
	console.log("middle get debtors");
	apiEmitter.emit('GETAUCTIONINFO','debtors');
});

viewEmitter.on('GETACCOUNTINFO', function(id){
	apiEmitter.emit('GETCLIENTINFO',id);
});

viewEmitter.on('GETACTUAL', function(){
	apiEmitter.emit('GETACTUAL');
});

viewEmitter.on('GETAUCTIONS', function(){
	apiEmitter.emit('GETAUCTIONS');
});

viewEmitter.on('PARTICIPATE', function(info){
	apiEmitter.emit('PARTICIPATE', info);
});



