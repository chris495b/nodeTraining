var Profile = require("./profile.js");
var renderer=require('./renderer.js');
var queryString=require('querystring');
var commonHeaders={'Content-Type':'text/html'}
var home=(request, response)=>{
  // if url is "/" and GET
  if(request.url=="/"){
    if (request.method === 'GET') {
      // if url is / && GET
      response.writeHead(200,commonHeaders);
      renderer.view("header",{},response);
      renderer.view("search",{},response);
      renderer.view("footer",{},response);
      response.end();
    }
    else {
      // If url is / && get
      //get the post data from body
      request.on('data',(postBody)=>{
        //extraxt the username
        var query=queryString.parse(postBody.toString());
        // redirect to username
        response.writeHead(303,{'Location':`/${query.username}`});
        response.end();
      });

    }
  }
}
var user=(request, response)=>{
  // if url=="/...."
  var username=request.url.replace("/","");
  if(username.length > 0){
    response.writeHead(200,commonHeaders);
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
        javascriptPoints:profileJSON.points.JavaScript
      }


      // simple response
      renderer.view("profile",values,response);
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
