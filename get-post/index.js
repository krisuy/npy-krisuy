
let http = require('http');
let url = require('url');
let qs = require('querystring');

http.createServer((req,res)=>{
    //console.log(req.method);
    if(req.method == "GET"){
        console.log("get");
        var result = url.parse(req.url);
        var senddata = qs.parse(result.query);
        console.log(senddata);
    }else if(req.method == "POST"){
        console.log("post");
        let tem = "";
        req.on('data',(data)=>{
            tem += data;
        });
        req.on('end',()=>{
            var senddata = qs.parse(tem);
            console.log(senddata);
        });
    }

}).listen(8080,"127.0.0.1",()=>{
    console.log("listen success");
})