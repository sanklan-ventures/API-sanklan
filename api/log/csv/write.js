var fs=require('fs');

exports.log_csv_write=function(allowed,path,content,pattern,datasetId){
	console.log("Comes here");
	console.log("Path::"+path);
	console.log("Content::"+JSON.stringify(content));
	console.log("Data set Id::"+datasetId);
	if(checkOrCreate(path,datasetId))
	{
        	var fileName=path+"/"+generateFileName(datasetId);
        	try
        	{
			content=checkData(allowed,content,pattern);
                	if(content===false)
                	{
                        	console.log("Pattern not matched");
			}
			else
			{
                        	console.log("Writting into file");
               	 		fs.appendFile(fileName,content+"\r\n",function(err, result) {if(err) console.log('error', err);});
			}
        	}
        	catch(e)
        	{
                	console.log("Error at writting into file ::"+e);
        	}
	}
	return true;
	//fs.writeFile(fileName, content, { flag: 'a+' }, err => {})
};

function checkOrCreate(path,datasetId,create=true)
{
	//-------
	//--Code written here
	//--------
	var fs = require('fs');
	try 
	{
    		// Query the entry
    		var checkPath = fs.lstatSync(path);

    		// Is it a directory?
    		if (checkPath.isDirectory()) 
		{
			console.log("Directory is successful");
		}
		else
		{
			console.log("Path is not direcgtory");
			return false;
    		}

	}
	catch (e) 
	{
		if(!generatePath(path))
		{
			console.log("Generate Path was not successful");
			return false;
		}
	}
	return true;
}

function checkData(allowed,data,pattern)
{
	//--------
	//--In pattern accpted values are
	//--string/int/float
	//--------
	//var allowed=["STRING","NUMBER"];
	var counter=0;
	var csvContent="";

	if(Object. keys(pattern).length==0)
	{
		//-------
		//---If there is no pattern
		//---Then return true
		//------
		console.log("Pattern is empty");
		return false;
	}
	for(var patternKey in pattern)
	{
		if(allowed.includes(pattern[patternKey].toUpperCase()))
		{
			if(csvContent!="")
			{
				csvContent+=",";
			}
			if(typeof data[patternKey] === "undefined")
			{
				counter++;
				console.log("Key::"+patternKey);
				console.log("Data::Empty");
			}
			else if(typeof data[patternKey] === pattern[patternKey].toLowerCase())
                	{
				csvContent+=JSON.stringify(data[patternKey]);
                        	counter++;
                        	console.log("KEY:::"+patternKey);
                        	console.log("Value:::"+pattern[patternKey]);
                	}
                	else
                	{
                        	console.log("Data is not matching::"+pattern[patternKey].toUpperCase()+"::,::"+(typeof data[patternKey]));
                        	return false;
                	}

			console.log("CSV Content--"+csvContent);
		}
		else
		{
                        console.log("Error in pattern::"+pattern[patternKey].toUpperCase());
                        return false;
		}
	}
	if(counter==0)
	{
		console.log("Empty Array");
		return false;
	}
	console.log("Success");
	return csvContent;
}

function generatePath(path)
{
	console.log("Path :::"+path);
	try
	{
		fs.mkdir(path, { recursive: true }, function(err) {
        		if (err)
                	{
                		console.log(err);
                	}
                	else
                	{
                		console.log("New directory successfully created.");
                	}
         	});
		return true;

	}
	catch(e)
	{
		console.log("Generate Path exception:::"+e);
		return false;
	}
}
function generateFileName(datasetId)
{
        var currentDate = new Date();

        var dayOfMonth = currentDate.getDate();
        var month = currentDate.getMonth();
        var year = currentDate.getFullYear();

        var second = currentDate.getSeconds();
        var minute = currentDate.getMinutes();
        var hour = currentDate.getHours();

        fileName="file__"+datasetId+"__"+year+"_"+(month+1)+"_"+dayOfMonth+"__"+hour+"_"+minute+".csv";
        console.log(fileName);
        return fileName;
}
