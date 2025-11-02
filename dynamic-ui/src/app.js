//Core Module
const path =require('path')

// External Module
const express = require('express')


//Local Module
const userRouter = require('./routes/userRouter')
const hostRouter = require('./routes/hostRouter')
const rootDir = require('./utils/pathUtil')


const app = express();

app.use((req,res,next) =>{
    console.log(req.url,req.method);
    next();
})
app.use(express.urlencoded());
app.use(userRouter);
app.use("/host",hostRouter);

app.use((req,res,next)=>{
    res.status(404).sendFile(path.join(rootDir,'views','404.html'))
})

const PORT = 3012;
app.listen(PORT,()=>{
    console.log(`Server is listening on the address http://localhost:${PORT}`);
})