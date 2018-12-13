const express = require('express'); 
const EventEmmitter = require('events');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mainSocket = new EventEmmitter();

mainSocket.on('DRAWAUCTIONS', function(info){
	io.emit('DRAWAUCTIONS',info);
});

mainSocket.on('UPDATEACTUAL', function(info){
  io.emit('UPDATEACTUAL',info);
});

mainSocket.on('RETURNCLIENT', function(info){
	io.emit('RETURNCLIENT',info);
});

mainSocket.on('UPDATEAUCTIONS', function(info){
  console.log("update auctions");
  io.emit('UPDATEAUCTIONS', info);
});

app.use(express.static(__dirname+'/Vistas'));
app.get('/', function(req, res){
  res.sendFile(__dirname + '/Vistas/subastas.html','binary');
});


io.on('connection', function(socket){
      socket.on('ASKDEBTORS', function(){
      	  console.log("asking for debtors");
          mainSocket.emit('GETDEBTORS');
      });

      socket.on('ASKCLIENTDATA', function(id){
      	  console.log("asking client data");
          mainSocket.emit('GETACCOUNTINFO', id);
      });

      socket.on('ASKACTUAL', function(){
          console.log("asking actual account");
          mainSocket.emit('GETACTUAL');
      });

      socket.on('ASKAUCTIONS', function(){
          console.log("asking participating auctions");
          mainSocket.emit('GETAUCTIONS');
      });

      socket.on('PARTICIPATE', function(info){
          console.log("participate in an auction");
          mainSocket.emit('PARTICIPATE', info);
      });
});

http.listen(4242, function(){
  console.log('listening on Server_Address:4242');
});

module.exports = {
	emitter: mainSocket
}



