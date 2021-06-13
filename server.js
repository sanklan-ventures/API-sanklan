var http = require('http');
var url = require('url');
var fs = require("fs");

var serverConfig=require("./config/server.json");

//------
//--Print config
//------
//--Check Environment
//--Load that json file
//-----
var envConfig=require("./config/development.json");
if(serverConfig['env']=="production")
{
	envConfig=require("./config/production.json");
}

var server=http.createServer(function(request,response){
	//------------
	//---Check all the API's that is allowed to run in server.json
	//---Iterativly create the path for same
	//-----------
});

server.listen(serverConfig['port'],serverConfig['ip']);

//----------------
//--Printing Text
//----------------
console.log("Running server http://"+serverConfig['ip']+":"+serverConfig['port']);
console.log("....");
