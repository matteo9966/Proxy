import http from "http";
import fs from "fs";
import path from "path";
import superagent from 'superagent';
const mimeTypes = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".wav": "audio/wav",
  ".mp4": "video/mp4",
  ".woff": "application/font-woff",
  ".ttf": "application/font-ttf",
  ".eot": "application/vnd.ms-fontobject",
  ".otf": "application/font-otf",
  ".wasm": "application/wasm",
};

const staticFoldername = 'static';

const server = http.createServer((request, response) => {


  let requestURL = request.url;

  //voglio fare da proxy a un sitoweb





  let request_path = `./${staticFoldername}${request.url}`;
  console.log({ request_path });
  if(request_path===`./${staticFoldername}/`){
       request_path = `./${staticFoldername}/index.html`;
  }
  
  fs.readFile(request_path,(err,data)=>{
    if(err && err.code ==='ENOENT'){
        response.writeHead(404);
        response.end();
        return
    }
    if(err){
        response.writeHead(500);
        response.end();
        return
    }
    // ho il data 
    const extname = String(path.extname(request_path).toLocaleLowerCase());
    const contentType = mimeTypes[extname] ?? 'application/octet-stream';
    response.writeHead(200,{'Content-Type':contentType});
    response.end(data, 'utf-8');
  })
  
  
});

console.log('listening on 8000!');
server.listen(8000);
