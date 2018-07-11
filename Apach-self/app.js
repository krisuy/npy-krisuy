//引入http模块
const http = require('http');
//引入路径模块
const path = require('path');
//引入文件模块
const fs = require('fs');
//引入查询字符串模块
const querystring = require('querystring');
const mime = require('mime');
//console.log(__dirname);//当前模块文件夹名称;
//console.log(__filename);//当前模块的名称;
let rootPath = path.join(__dirname,"www");//当前模块根目录的名称;
console.log(rootPath);
//创建服务
http.createServer((req,res)=>{
    //判断根目录中有没有文件
    let filePath = path.join(rootPath,querystring.unescape(req.url));
    //console.log(req.url);
    //console.log(filePath);
    let isExist = fs.existsSync(filePath);//判断根路径下是否存在文件;
    //console.log(isExist);
    if(isExist){   //存在
        //读取根路径下的文件
        fs.readdir(filePath,(err,files)=>{  //读取一个目录下的内容;
            if(err){  //文件
                //console.log(err);
                fs.readFile(filePath,(err,data)=>{ //读取一个文件的内容;
                    res.writeHead(200,{
                        'content-type': mime.getType(filePath)
                    });
                    res.end(data);
                });
            }else{  //文件夹
                //console.log(files);
                //判断有无首页
                if(files.indexOf('index.html') != -1){  //有
                    fs.readFile(path.join(filePath,'index.html'),(err,data)=>{
                        res.end(data);
                    });
                }else{  //无
                    let filesData = "";
                    for(let i = 0; i < files.length; i++){                       
                        if(req.url == '/'){
                            req.url = '';
                        }
                        //console.log(req.url);
                        filesData += "<h2><a href='"+req.url+'/'+files[i]+"'>"+files[i]+"</a></h2>";
                    }
                    res.writeHead(200,{
                        'content-type': 'text/html;charset=utf-8'
                    })
                    res.end(filesData);
                }
            }
        });
    }else{   //不存在
        res.writeHead(404,{
            'content-type': 'text/html;charset=utf-8'
        });                 
        res.end("<h2>你找的页面去火星了!</h2><h3 style='color: hotpink'>给你个 404 自行体会!</h3>");
    }
}).listen(80,'127.0.0.1',()=>{
    console.log('监听中!');
});