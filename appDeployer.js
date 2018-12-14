const express = require('express'); 
const EventEmmitter = require('events');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var Client = require('node-rest-client').Client;
const utf8 = require('utf8');
const fs = require('fs');
const request = require('request');

var client = new Client();

var indexhtml = fs.readFileSync('./Vistas/index.html');
var otpdatahtml = fs.readFileSync('./otpdata.html');
var subastas_view = fs.readFileSync('./Vistas/subastas.html');


var mainSocket = new EventEmmitter();

mainSocket.on('TOKENAUTH', function(cre){
    console.log(cre);
    app.get('/getaccesscode', function(req, res) {
      console.log("Entrada a getaccesscode");
      getUserApproval(cre, req, res);
      
      //res.send('')
      //res.send('<div><style media="screen" type="text/css">.container-code{height: 70vh;display: flex;align-items: center;justify-content: center;}.container-code > div{display: flex;flex-direction: column;align-items: center;margin: 0px 100px !important;}.container-code > div > div:nth-child(1) > span{color: #df001e;font-weight: 700;font-size:20px;}.container-code > div > div:nth-child(2) > p{text-align:center;}.container-code > div > div{margin: 5px 0px;}.container-code > div > form{margin: 15px 0px;}.oauth-button {text-decoration: none !important;border-radius: 4px;color: #fff;border-color: #005296;cursor: pointer;background-image: none;border: none;padding: 17px 28px;font-size: 15px;margin: 0px 5px;}.oauth-button-blue{background-color: #00418b;box-shadow: 0 0 20px #00418b;}</style><div class="container-code"><div><div><span>Authorization code</span></div><div><p>'+code+'</p></div><form action=/generartoken><button class="oauth-button oauth-button-blue">Generar Token</button></form></div></div></div>');
    });
});

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
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.get('/', function(req, res){
  res.sendFile(__dirname + '/Vistas/index.html','binary');
});


function getUserApproval(cre, req, res){
    
    var url = constructUserApprovalUrl(cre);
    request(url , (err, resp, body) => {
        if (err) { return console.log(err); }
        //getToken(cre, req, res);
    });
}

function constructUserApprovalUrl(cre){
    let url = 'https://api.us.apiconnect.ibmcloud.com/bancolombiabluemix-dev/'+cre.c+'/hackathon/v1/security/oauth-op/oauth2/authorize?';
    //?client_id=b36bc7be-f58c-478f-bc38-a6fa296ff536&scope=Deposit-account%3Aread%3Auser&redirect_uri=http%3A%2F%2Flocalhost%3A4242%2Fgetaccesscode&response_type=code
    url += 'client_id='+cre.i;
    url += '&scope='+cre.sc;
    url += '&redirect_uri='+cre.u;
    url += '&response_type='+cre.c;
    return url;
}


function getToken(cre, req, res){
    var authorization = cre.i+":"+cre.s;
    var encodedauth = new Buffer(authorization).toString('base64');
    
    let args = {
      parameters: {
        grant_type: "authorization_code",
        code: cre.c,
        redirect_uri: cre.u,
        scope: cre.sc
      },
      headers: {
        "accept":"application/json",
        "apim-debug":"true",
        "content-type":"application/x-www-form-urlencoded",
        "authorization":"Basic "+encodedauth
      }
    }
    console.log("Obtener Token de getToken");
    
    try{  
      client.post('https://api.us.apiconnect.ibmcloud.com/bancolombiabluemix-dev/sandbox/hackathon/v1/security/oauth-otp/oauth2/token', args, function (data, response) {
        console.log("token Obtenido:");
        console.log(data.access_token);
        //consumo de la api necesaria "clientes" o "cuentas"
        res.setHeader('content-type', 'text/html; charset=utf-8');
        //carga de la vista necesaria 
        res.write(subastas_view);
        res.end();
      });
    }
    catch(e){
      console.log(e);
    }
    
}

io.on('connection', function(socket){

      socket.on('STARTAPP', function(){
          console.log("auth app");
          mainSocket.emit('AUTHAPP',Client);
      })

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



