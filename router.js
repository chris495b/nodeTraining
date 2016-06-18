var Profile = require("./profile.js");

var home=(request, response)=>{
  // if url is "/" and GET
  if(request.url=="/"){
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/plain');
    response.write("Header\n");
    response.write("Search\n");
    response.end('Footer\n');
  }
}
var user=(request, response)=>{
  // if url=="/...."
  var username=request.url.replace("/","");
  if(username.length > 0){
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/plain');
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
      response.write(values.username+" has "+values.badges+" badges\n");
      response.end('Footer\n');
    });
    studentProfile.on("error",(error)=>{
        // simple response
      response.write(error.message+'\n');
      response.end('Footer\n');
    });

  }
}

module.exports={
  'home':home,
  'user':user
}
