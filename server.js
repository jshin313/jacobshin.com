var fs = require("fs");
var express = require("express");
var https = require("https")

var app = express();

// HTTPS Stuff
var server = https.createServer({
	  key: fs.readFileSync('/etc/letsencrypt/live/jacobshin.com/privkey.pem'),
	  cert: fs.readFileSync('/etc/letsencrypt/live/jacobshin.com/cert.pem'),
	  ca: fs.readFileSync('/etc/letsencrypt/live/jacobshin.com/chain.pem')
}, app).listen(443, () => {
	  console.log('Listening...')
})

app.use(express.static('public'));

// make way for some custom css, js and images
app.use('/css', express.static(__dirname + '/public/css'));
app.use('/js', express.static(__dirname + '/public/js'));
app.use('/images', express.static(__dirname + '/public/images'));

