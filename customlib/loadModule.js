global.customModule=require("./commonModule");
exports.loadAllModule=function(serverData){
	var totalModule=0
	var data=Object.keys(serverData['api']).length;
	//-----------
	//--Loading all modules
	//---------
	var modules={};
	for(var module in serverData['api'])
	{
		console.log("Loading Module::"+module);
		modules[module]={}
		for(var submodule in serverData['api'][module]['allowed_operation'])
		{
			//console.log("+++"+serverData['api'][module]['allowed_operation'][submodule]);
			submoduleName=serverData['api'][module]['allowed_operation'][submodule];
			console.log("--SubModule::"+submoduleName);
			modules[module][submoduleName]=require("../api/"+module.replace("_","/")+"/"+submoduleName);
		}
	}
	return modules;
};
