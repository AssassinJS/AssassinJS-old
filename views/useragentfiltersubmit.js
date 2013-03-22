var respond = require('../controllers/respond');

function render(__request,__response,__dataObj){
var outputstr='';
outputstr=outputstr+'<html> <head> <link rel="stylesheet" href="index_style.css" type="text/css" /> </head> <body>  <div id="bodyWrapper">  <div id="headerWrapper"> <div id="headerContent"> Assassin.js </div> </div> <div id="contentWrapper">  <div id="contentLeft"> <div id="projectMenu" style="position:fixed;"> Configure Project Routes<br /> Configure Filters<br /> </div> </div> <div id="contentRight"> ';

var qs = require('querystring');
var logger = require('../system/logger');
var MyMongo = require('../system/dbconnect.js').MyMongo;
var db = new MyMongo('localhost', 27017, 'assassindb');
outputstr=outputstr+' ';

var userAgentFilterParameters = __dataObj['filterDB']['user-agent'];
var routesList = __dataObj['routesDB'];
var newUAFilters = qs.parse(__request.body);
outputstr=outputstr+'  ';
var expression=newUAFilters.routes;
	outputstr=outputstr+expression;
outputstr=outputstr+' ';

	db.query('filterParameters',function(collection){
				
		var toSet = {};
		toSet.parameters = userAgentFilterParameters;
		if(newUAFilters.routes !=null ||newUAFilters.routes !=undefined)
		{
			var expression=newUAFilters.routes[i];
	outputstr=outputstr+expression;

			for(var i in newUAFilters.routes)
			{
				var expression=newUAFilters.routes[i];
	outputstr=outputstr+expression;

				toSet.parameters[newUAFilters.routes[i]] = {};
				toSet.parameters[newUAFilters.routes[i]]['GET'] = {};
				toSet.parameters[newUAFilters.routes[i]]['GET']['allow'] = newUAFilters.useragentWhite;
				toSet.parameters[newUAFilters.routes[i]]['GET']['block'] = newUAFilters.useragentBlack;
			}
			collection.update({filter:'user-agent'},{$set:toSet},{upsert:true, w:1},function(err,data){
				if(err)logger.write(err,'useragentfiltersubmit.jssp');		
				else require('../filters/user-agent').ReadFromDB();
			});
		}
		var expression=newUAFilters.routes;
	outputstr=outputstr+expression;

		
		
	});
outputstr=outputstr+'    </div>  </div> <div id="footerWrapper"> <div id="footerContent"> (c)2013 Adithya Chebiyyam and Sai Teja Jammalamadaka </div> </div>  </div>  <script language="javascript"> function toggle(tag) { 	checkboxes = []; 	if(tag.id=="useragentBlackToggle") 	{ 		checkboxes = document.getElementsByName("useragentBlack"); 	} 	if(tag.id=="useragentWhiteToggle") 	{ 		checkboxes = document.getElementsByName("useragentWhite"); 	} 	if(tag.id=="routesToggle") 	{ 		checkboxes = document.getElementsByName("routes"); 	} 	for(var i in checkboxes) 		checkboxes[i].checked = tag.checked; } </script>  </body> </html> ';
respond.createResponse(__response,200,{'Content-Type': 'text/html'},outputstr);
/**/} 

exports.render = render;