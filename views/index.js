var respond = require('../controllers/respond');

function render(__request,__response,__dataObj){
var outputstr='';
outputstr=outputstr+'<html> <head> <link rel="stylesheet" href="index_style.css" type="text/css" /> </head> <body>  <div id="bodyWrapper">  <div id="headerWrapper"> <div id="headerContent"> Assassin.js </div> </div> <div id="contentWrapper">  <div id="contentLeft"> <div id="loginPanel"> Login to Admin Panel: <form action="" method="GET"> Username: <input type="text" name="username" id="loginUserNameBox" /><br /> Password: <input type="password" name="password" id="loginPasswordBox" /><br /> <button type="submit">Login</button> </form> </div> </div> <div id="contentRight"> <div id="descriptionPanel"> <p>Welcome to Assassin - An Access Control Framework written in Node.js. Assassin works almost like a real world assassin, only it assassinates unwanted incoming requests to your server. So don\'t worry, this assassin has your back :)</p>  <p>Assassin can be used for more than just for assassinating requests. It can provide a security check on incoming requests based on filters that you specify. You can also format the data to be sent as responses with customised filters.</p>  <p>A generic framework that provides a safe and friendly server environment. It has the functionality to be able to expose an api for developers to develop apps that consume your api. It has the potential to act as a firewall, or even as a proxy. And it can provide analytics to who is accessing what from your server.</p>  <p>Assassin. The Secret Server Agent. At your service.</p>  <p>(psst... Nothing is true, Everything is Permitted)</p> </div> </div>  </div> <div id="footerWrapper"> <div id="footerContent"> (c)2013 Adithya Chebiyyam and Sai Teja Jammalamadaka </div> </div>  </div>  </body> </html> ';
respond.createResponse(__response,200,{'Content-Type': 'text/html'},outputstr);
/**/} 

exports.render = render;