const http = require('http')

const server = http.createServer((req,res) =>{
    console.log(req.url,req.method);
    if(req.url === '/home'){
        res.write('<h1>Welcome to the home</h1>')
        return res.end();
    }else if (req.url === '/men'){
        res.write('<h1>Welcome to the men section</h1>')
        return res.end();
    }else if (req.url === '/women'){
        res.write('<h1>Welcome to the women section</h1>')
        return res.end();
    }else if (req.url === '/kids'){
        res.write('<h1>Welcome to the kids section</h1>')
        return res.end();
    }else if (req.url === '/cart'){
        res.write('<h1>Welcome to the cart section</h1>')
        return res.end();
    }

    res.write(`
<html lang="en">
<head>
    
    <title>Myntra</title>
</head>
<body>
    <head>
     <nav>
        <ul>
            <li><a href="/home">home</a></li>
            <li><a href="/men">men</a></li>
            <li><a href="/women">women</a></li>
            <li><a href="/kids">kids</a></li>
             <li><a href="/cart">cart</a></li>
        </ul>
     </nav>

    </head>
    
</body>
</html>`);
res.end()
})



server.listen(3003,() => {
    console.log('Server running of the address http://localhost:3003')
})