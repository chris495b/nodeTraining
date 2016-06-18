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
    response.write(username+'\n');
    response.end('Hello World\n');
  }
}

module.exports={
  'home':home,
  'user':user
}
