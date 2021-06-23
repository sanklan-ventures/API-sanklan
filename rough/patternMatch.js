function patternMatch(data,pattern)
{
	//--------
	//--In pattern accpted values are
	//--string/int/float
	//--------
	var allowed=["STRING","NUMBER"];
	var counter=0;
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
			if(typeof data[patternKey] === "undefined")
			{
				counter++;
				console.log("Key::"+patternKey);
				console.log("Data::Empty");
			}
			else if(typeof data[patternKey] === pattern[patternKey].toLowerCase())
                	{
                        	counter++;
                        	console.log("KEY:::"+patternKey);
                        	console.log("Value:::"+pattern[patternKey]);
                	}
                	else
                	{
                        	console.log("Data is not matching::"+pattern[patternKey].toUpperCase()+"::,::"+(typeof data[patternKey]));
                        	return false;
                	}
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
	return true;
}
//patternMatch({"first_name":"API","middle_name":"Sanklan"},{"first_name":"string","middle_name":"string","last_name":"string"});
patternMatch({"first_name":"API"},{});
