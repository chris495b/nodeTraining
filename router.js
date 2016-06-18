var Profile = require("./profile.js");
var renderer=require('./renderer.js');
var home=(request, response)=>{
  // if url is "/" and GET
  if(request.url=="/"){
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/plain');
    renderer.view("header",{},response);
    renderer.view("search",{},response);
    renderer.view("footer",{},response);
    response.end();
  }
}
var user=(request, response)=>{
  // if url=="/...."
  var username=request.url.replace("/","");
  if(username.length > 0){
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/plain');
    renderer.view("header",{},response);
    //get json from tree house
    var studentProfile = new Profile(username);
    studentProfile.on('end',(profileJSON)=>{
      //show Profile

      //store the values which you need
      var values={
        avatarUrl:profileJSON.gravatar_url,
        username:profileJSON.profile_name,
        badges:profileJSON.badges.length,
        javascriptPoints:profileJSON.points.Javascript
      }

      // simple response
      renderer.view("search",values,response);
      renderer.view("footer",{},response);
      response.end();
    });
    studentProfile.on("error",(error)=>{
        // simple response
      renderer.view("error",{errorMessage:error.message},response);
      renderer.view("search",{},response);
      renderer.view("footer",{},response);
      response.end();
    });


  }
}

module.exports={
  'home':home,
  'user':user
}
