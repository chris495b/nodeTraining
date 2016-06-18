var fs=require('fs');
var view=(templateName,value,response)=>{
  //read from template files
  var fileContents=fs.readFileSync(`./views/${templateName}.html`)
  //Insert values in to the Content-Type

  //write out the contents to the response
  response.write(fileContents);
};


module.exports.view=view;
