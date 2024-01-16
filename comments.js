// Create web server
var http = require('http');
var url = require('url');
var fs = require('fs');
var comments = require('./comments.js');

http.createServer(function (req, res) {
    var urlObj = url.parse(req.url, true);
    var pathname = urlObj.pathname;
    if (pathname === '/') {
        res.setHeader('Content-Type', 'text/html');
        fs.readFile('./index.html', 'utf8', function (err, data) {
            if (err) {
                throw err;
            }
            res.end(data);
        })
    } else if (pathname === '/getComments') {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(comments));
    } else if (pathname === '/addComment') {
        var comment = urlObj.query;
        comment.ip = req.connection.remoteAddress;
        comment.dateTime = new Date().toLocaleString();
        comments.unshift(comment);
        res.statusCode = 302;
        res.statusMessage = 'Found';
        res.setHeader('Location', '/');
        res.end();
    } else {
        res.statusCode = 404;
        res.statusMessage = 'Not Found';
        res.end();
    }
}).listen(8080, function () {
    console.log('Server is running at port 8080');
});
