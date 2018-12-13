const EventEmmitter = require('events');
const util = require('util');
const request =  require('request');
const examples = require('./examples.js');

var innerSocket = new EventEmmitter();

innerSocket.on('AUTH', function(client_id,client_secret,catalog,redirect_uri,scope,response_type){
   let t = getToken(client_id,client_secret,catalog,redirect_uri,scope,response_type);
   innerSocket.emit('TOKEN', t);
});

innerSocket.on('GETCLIENTINFO', function(id){
    innerSocket.emit('CLIENTINFO', getClientData(id));
});


innerSocket.on('MAKEPAYMENT', function(){
    
});


innerSocket.on('GETAUCTIONINFO', function(risk){
	innerSocket.emit('AUCTIONINFO', getAuctionData(risk));
});

innerSocket.on('GETACTUAL', function(){
	innerSocket.emit('ACTUALINFO', examples.getActualAccount);
});

innerSocket.on('GETAUCTIONS', function(){
	innerSocket.emit('AUCTIONS', findAuctions(examples.getAuctions, examples.getActualAccount));
});

innerSocket.on('PARTICIPATE', function(info){
	innerSocket.emit('AUCTIONS', findAuctions(updateAuction(info), examples.getActualAccount));
});

function updateAuction(info) {
	for (var i = 0; i < examples.getAuctions.length; i++)
		if (examples.getAuctions[i].debtor.id == info.id)
			examples.getAuctions[i].participants.push(examples.getActualAccount);
	return examples.getAuctions;
}

function findAuctions(auctions, actual) {
	var result = [];
	for (var i = 0; i < auctions.length; i++)
		for (var j = 0; j < auctions[i].participants.length; j++)
			if (auctions[i].participants[j].id == actual.id)
				result.push(auctions[i].debtor.id);
	return result;
}

function filter(type) {
	var accs = []
	for (var i = 0; i < accounts.length; i++)
		if (accounts[i].type === type)
			accs.push(accounts[i]);
	return accs;
}

function getAuctionData(risk){
	return filter("debtor", examples.getAccounts);
}

function filter(type, accounts) {
	var accs = []
	for (var i = 0; i < accounts.length; i++)
		if (accounts[i].type === type)
			accs.push(accounts[i]);
	return accs;
}

function getClientData(id){
	let clients = examples.getClient;
	for (var i = 0; i < clients.length; i++) {
		if(clients[i].id == id)
			return clients[i]; 
	}
	return {"Msg":"Error, no client"};
}


function getClientData(id){
	client = examples.getClient;
	client.id = id;
	return client;
}

function getToken(client_id,client_secret,catalog,redirect_uri,scope,response_type){
	
}

function getEmitter(){ return innerSocket; }

module.exports = {
    emitter : getEmitter()
}