var fs = require("fs");
var express = require("express");
var https = require("https")

var app = express();

app.use(express.static('public'));

// make way for some custom css, js and images
app.use('/css', express.static(__dirname + '/public/css'));
app.use('/js', express.static(__dirname + '/public/js'));
app.use('/images', express.static(__dirname + '/public/images'));

// HTTPS Stuff
// In order for this to work, the certificates must be in the right place on the server.
// Use Let's Encrypt to successfully get the keys on the server through the successful completion of the ACME
// In order to run node without root, all https and http traffic is redirected to a higher port
// Also change the ownership of the keys and certificates to the one running this (e.g. sudo chown -R ubuntu /etc/letsencrypt)
var server = https.createServer({
	  key: fs.readFileSync('/etc/letsencrypt/live/jacobshin.com/privkey.pem'),
	  cert: fs.readFileSync('/etc/letsencrypt/live/jacobshin.com/cert.pem'),
	  ca: fs.readFileSync('/etc/letsencrypt/live/jacobshin.com/chain.pem')
}, app).listen(4443, () => {
	  console.log('Listening...')
})

// Redirect from http port 80 to https
var http = require('http');
http.createServer(function (req, res) {
    	res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
	res.end();
}).listen(8080);

