var http = require('http');
var fs = require("fs");

var urlParser = require('./customlib/urlparser');

var serverConfig=require("./config/server.json");

var loadModule=require("./customlib/loadModule");

//------------
//--Load all the modules
//----------
var modules=loadModule.loadAllModule(serverConfig);


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

//----------
//--Check if things are allowed
//----------
if(typeof serverConfig['allowed']==="undefined" || Object.keys(serverConfig['allowed']).length==0)
{
	return false;
}

var server=http.createServer(function(request,response){
	//------------
	//---Check all the API's that is allowed to run in server.json
	//---Iterativly create the path for same
	//-----------
        response.statusCode = 200;
        response.setHeader('Content-Type', 'text/plain');
	urlResult=urlParser.urlToPlugin(request,serverConfig);
	//-----
	//--Needed request body
	//-----
	let content="";
	
	request.on('data', function(chunk) {
		content=chunk.toString();
	})
	request.on('end',()=>{
		console.log("Content");
		console.log(content);

		if(urlResult===false)
		{
			response.end("Error");
		}
		else
		{
			//------------
			//--Check the directory defined in serverconfig
			//--Fetch it and write the code
			//------------
			var contentData=JSON.parse(content);
			//console.log("Content Data");
			//console.log(contentData);

			var fn = modules[urlResult['module']][urlResult['submodule']][urlResult['module']+"_"+urlResult['submodule']];
			//--console.log(urlResult);
			//---------------
			//---Check if path is set of not
			//---Check it content is set or not
			//---------------
			if(fn(serverConfig['allowed'],urlResult['path'],contentData,urlResult['pattern'],urlResult['dataset_id']))
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
});

server.listen(serverConfig['port'],serverConfig['ip']);

//----------------
//--Printing Text
//----------------
console.log("Running server http://"+serverConfig['ip']+":"+serverConfig['port']);
console.log("....");
