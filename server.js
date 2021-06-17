var http = require('http');
var fs = require("fs");

var urlParser = require('./customlib/urlparser');

var serverConfig=require("./config/server.json");

var loadModule=require("./customlib/loadModule");

//------------
//--Load all the modules
//----------
var modules=loadModule.loadAllModule(serverConfig);

//console.log(modules);

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

        response.statusCode = 200;
        response.setHeader('Content-Type', 'text/plain');
	urlResult=urlParser.urlToPlugin(request,serverConfig);
	//console.log("++----+++"+urlResult);
	if(urlResult===false)
	{
		response.end("Error");
		//response.end('Inside Path /log/csv/\n');
	}
	else
	{
		var fn = modules[urlResult['module']][urlResult['submodule']][urlResult['module']+"_"+urlResult['submodule']];
		if(fn("test",modules['content']))
		{
			response.end("success");
		}
		else
		{
			response.end("Error");
		}
		//response.end('Hello, World!\n');
	}

});

server.listen(serverConfig['port'],serverConfig['ip']);

//----------------
//--Printing Text
//----------------
console.log("Running server http://"+serverConfig['ip']+":"+serverConfig['port']);
console.log("....");
