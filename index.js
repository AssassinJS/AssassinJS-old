/* index.js
 ***** Part of AssassinJS *****
  - (c)2013 Adithya and Sai Teja under MIT (Open Source) License
  
 This is the file that needs to be run by node.

*/

var assassin = require('./assassin');
var viewcompiler = require('./system/viewcompiler');
var fileserver = require('./controllers/fileserver');

//This function invokes the precompiler of jssp views
viewcompiler.readJSSP();
//This function reads all the views in compiled_views folder
fileserver.LoadViews();
//This function invokes assassin
assassin.assassinate();
