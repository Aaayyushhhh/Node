const http = require('http');
const testingSyntax = require('./syntax')
const runTime = require('./runtime')
const logical =require('./Logical')

// const server = http.createServer((req,res)=>{
//     console.log(req.url , req.method);
//     //testingSyntax();
//     //runTime();
//     logical();

// })
const requestHandler = require('./user');
const server = http.createServer(requestHandler);




const PORT = 3009;
server.listen(PORT,() =>{
    console.log(`Server running on address http://localhost:${PORT}`);
    });