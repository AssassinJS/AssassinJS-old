/* router.js
 ***** Part of AssassinJS *****
  - (c)2013 Adithya and Sai Teja under MIT (Open Source) License
  
 This is the file that maps the request URL's to those in the routes.txt file

*/

var url = require('url');
var fs = require('fs');
var controller = require('./controller');
var logger = require('./logger');
var dbconnect = require('./dbconnect');

//Reading Routes File
var routes={};

// Obsolete with database storage
// Is used only for first time initialization
function ReadRoutesFile()
{
	var r_data = fs.readFileSync('./config/routes.txt');
	if(r_data==null)
	{ 
		logger.write("Routes data not found");
	}
	else
	{
		var listentries = r_data.toString().split('\n');
		
		dbconnect.db_ready(function(db){
			var collection = db.collection('routes');
			
			for(row in listentries)
			{
				var values = listentries[row].split('\t');
				if(values.length<3) continue;
				var routeObj={};
				routeObj.path=values[1];
				routeObj.method=values[0];
				routeObj.target=values[2];
			
				var toSet={};
				toSet[routeObj.method] = routeObj.target;
				collection.update({regexp:routeObj.path},{$set:toSet},{upsert:true, w:1},function(err,data){
					if(err)logger.write(err);
				});			
			}
		});
	}
}

//Reading Routes from DB
ReadFromDB(); //Ensures first time execution
function ReadFromDB()
{
	dbconnect.db_ready(function(db){
		
		var collection = db.collection('routes');
				
		routes = collection.find();				
	});
}

//Actual Routing Function
function route(request,response)
{			
	var reqDetails = url.parse(request.url);
	logger.write("Request Details: "+JSON.stringify(reqDetails));
	var filepath = reqDetails.pathname;
	
	for(i in routes)
	{
		var urlReg = new RegExp('^'+i.regexp.toString()+'$');
		logger.write('filepath='+filepath+' and i.regexp ='+i.regexp+' urlReg='+urlReg);
		if(urlReg.test(filepath))
		{
			logger.write('filepath='+filepath+' matched urlReg='+urlReg);
			controller.handleRequest(routes[i],request,response);
			return;
		}
	}
	logger.write('URL not found');
	controller.handleRequest(null,request,response);
	
}

exports.route = route;
exports.ReadFromDB = ReadFromDB;
exports.ReadRoutesFile = ReadRoutesFile;
