const http=require("http");
const fs=require("fs");
const qs=require("querystring");
const ip="0.0.0.0";
const PORT = process.env.PORT || 4321;
const Url=require('url');
const { exec, execSync } = require('child_process');

const server = http.createServer((req, res) => {
    let method = req.method;   // GET, POST, ... 
    let parsedUrl = Url.parse(req.url, true);
    let pathname = parsedUrl.pathname;
    let query = parsedUrl.query;
    if(method==='GET'){
        if (pathname === '/') {
            let mainpage = fs.readFileSync('./frontend/index.html', 'utf8');
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(mainpage);
        } else if (pathname === '/script.js') {
            let script = fs.readFileSync('./frontend/script.js', 'utf8');
            res.writeHead(200, { 'Content-Type': 'application/javascript' });
            res.end(script);
        } else if (pathname === '/style.css') {
            let css = fs.readFileSync('./frontend/style.css', 'utf8');
            res.writeHead(200, { 'Content-Type': 'text/css' });
            res.end(css);
        } else if(pathname === '/compute'){
            let first_capacity = parseInt(query.first_capacity, 10);
            let second_capacity = parseInt(query.second_capacity, 10);
            let board_length = parseInt(query.board_length, 10);
            execSync(`main ${first_capacity} ${second_capacity} ${board_length}`);
            let output = String(fs.readFileSync('./output.txt'));
            output=output.split("T");
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(output));
        } else{
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Page not found');
        }
    } else{
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Page not found');
    }
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});    
