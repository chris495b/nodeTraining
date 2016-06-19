var fs=require('fs');
var mergeValues=(values, content)=>{
  //cycle over the keys
  for(key in values){
    //replace all the {{key}} with the values from the value object
    content=content.replace(`{{${key}}}`,values[key]);
  }
  //return merged content
  return content;
}
var view=(templateName,value,response)=>{
  //read from template files
  var fileContents=fs.readFileSync(`./views/${templateName}.html`,{encoding:"utf8"})
  //Insert values in to the Content-Type
  fileContents=mergeValues(value,fileContents);
  //write out the contents to the response
  response.write(fileContents);
};


module.exports.view=view;
