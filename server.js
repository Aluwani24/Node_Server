const http = require('http');
const fs = require('fs');
const path = require('path');
const { initializeDataFile, readData, writeData } = require('./dataHandler');

const hostname = '127.0.0.1';
const port = 3000;

initializeDataFile();

const server = http.createServer((req, res) => {
    // CORS support
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    if (req.url === '/' && req.method === 'GET') {
        serveApiDocumentation(res);
    } else if (req.url.startsWith('/movies')) {
        handleDataEndpoint(req, res, 'movies');
    } else if (req.url.startsWith('/series')) {
        handleDataEndpoint(req, res, 'series');
    } else if (req.url.startsWith('/songs')) {
        handleDataEndpoint(req, res, 'songs');
    } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ message: 'Not found' }));
    }
});

function serveApiDocumentation(res) {
    const indexPath = path.join(__dirname, 'public', 'index.html');
    fs.readFile(indexPath, 'utf8', (err, content) => {
        if (err) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'text/plain');
            res.end("Internal Server Error");
            return;
        }
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end(content);
    });
}

function handleDataEndpoint(req, res, dataType) {
    let data = readData();

    if (req.method === 'GET') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(data[dataType]));

    } else if (req.method === 'POST') {
        let body = "";
        req.on('data', chunk => { body += chunk; });
        req.on('end', () => {
            try {
                let newItem = JSON.parse(body);
                newItem.id = data[dataType].length ? Math.max(...data[dataType].map(item => item.id)) + 1 : 1;
                data[dataType].push(newItem);
                writeData(data);
                res.statusCode = 201;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ message: 'created', item: newItem }));
            } catch (e) {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ message: 'Invalid JSON' }));
            }
        });

    } else if (req.method === 'PUT') {
        let body = "";
        req.on('data', chunk => { body += chunk; });
        req.on('end', () => {
            try {
                let updatedItem = JSON.parse(body);
                const index = data[dataType].findIndex(item => item.id === updatedItem.id);
                if (index !== -1) {
                    data[dataType][index] = updatedItem;
                    writeData(data);
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ message: 'updated', item: updatedItem }));
                } else {
                    res.statusCode = 404;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ message: 'Item not found for update' }));
                }
            } catch (e) {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ message: 'Invalid JSON' }));
            }
        });

    } else if (req.method === 'DELETE') {
        if (data[dataType].length > 0) {
            const deletedItem = data[dataType].shift();
            writeData(data);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ message: 'deleted', deletedItem }));
        } else {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ message: 'No items to delete' }));
        }

    } else {
        res.statusCode = 405;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ message: 'Method not allowed' }));
    }
}

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`);
});
