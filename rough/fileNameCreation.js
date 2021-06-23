function fileName(datasetId)
{
	var currentDate = new Date();

	var dayOfMonth = currentDate.getDate();
	var month = currentDate.getMonth();
	var year = currentDate.getFullYear();

	var second = currentDate.getSeconds();
	var minute = currentDate.getMinutes();
	var hour = currentDate.getHours();

	fileName="file__"+datasetId+"__"+year+"_"+(month+1)+"_"+dayOfMonth+"__"+hour+"_"+minute+"_"+second+".csv";
	console.log(fileName);
	return fileName;
}

fileName("1");
//console.log(currentYear+"_"+currentMonth+"_"+currentDayOfMonth);
//console.log(dateString);

//console.log(hour+"__"+minute+"__"+second);
