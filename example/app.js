const fs = require('fs');
const http = require('http');

console.log('1. Start of script');

// Synchronous (blocking) operation
console.log('2. Reading file synchronously');
const dataSync = fs.readFileSync('user-details.txt', 'utf8');
console.log('3. Synchronous read complete');

// Asynchronous (non-blocking) operation
console.log('4. Reading file asynchronously');
fs.readFile('user-details.txt', 'utf8', (err, dataAsync) => {
    if (err) throw err;
    console.log('6. Asynchronous read complete');
});

// Create a simple server
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello! Server is running.\n');
});

server.listen(3000, () => {
    console.log('5. Server running on http://localhost:3000');
});