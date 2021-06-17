//-----------
//--Purpose of this file is
//--Parse URL and get the relevant data
//-----------
var url = require('url');
//------------
//--Check the server data
//------------
//
exports.urlToPlugin=function(requestData,serverData)
{
	//------------
	//---Check all the API's that is allowed to run in server.json
	//---Iterativly create the path for same
	//-----------
	var path=url.parse(requestData.url).pathname;
	var pathSplit = path.split("/");
	var method=requestData.method;

	//------
	//---Check the pathname
	//---check the method
	//---Call the function
	//------
	//console.log("---Path::"+path+"::--method--::"+method);
	//console.log("---Data::"+pathSplit);
	//console.log("---Headers::"+JSON.stringify(requestData.headers));
	//console.log("---Authorization::"+requestData.headers['authorization']);
	
	//------------
	//--Check authentication
	//---------
	if(!checkAuthentication(requestData.headers['authorization'],serverData))
	{
		return false;
	}

	//-----------
	//---If it comes here means
	//---Authroization passed
	//-----------
	

  	if(pathSplit.length>=2)
	{
		//------------
		//--Check the API
		//--And on the basis of data
		//--Check the length
		//--If it is related to expected data process it
		//-------------
		//--Check if already included
		//------------
		if(pathSplit[1]+"/"+pathSplit[2] == "log/csv")
		{
			//----------
			//--Call the module
			//-----------
			//----If the module is GET -- read
			//----If the module is POST -- update
			//---If the module is PUT -- write
			//------------
			
			if(method=="GET")
			{
				return {"module":pathSplit[1]+"_"+pathSplit[2],"submodule":"read","content":{}};
			}
			else if(method=="PUT")
			{
				return {"module":pathSplit[1]+"_"+pathSplit[2],"submodule":"write","content":{}};
			}
			else
			{
				return false;
			}
		}
		else
		{
			return false;
		}
	}
	else
	{
		return false;
	}
};

function ucFirst(data)
{
	return data.charAt(0).toUpperCase() + data.slice(1);
}
//----------
//---Fetch the token
//---And check it inside the data
//----------
function checkAuthentication(token,serverData)
{
	if(serverData['auth'][token] === 'undefined')
	{
		return false;
	}
	else
	{
		return true;
	}
}
