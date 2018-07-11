
const http = require('http');
const url = require('url');
const querystring = require('querystring');

http.createServer((req,res)=>{
    let result = url.parse(req.url);
    //console.log(result);
    let gets = querystring.parse(result.query);
    //console.log(gets);
    res.end('coming');
}).listen(8080,'127.0.0.1',()=>{
    console.log('监听中');
});