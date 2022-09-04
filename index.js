// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});
let response = {};

app.get("/api/:date", (req, res) => {
  let inputParam = req.params.date;
  let date = new Date(inputParam);
  response["unix"] = date.getTime();
  response["utc"] = date.toUTCString();

  if (!inputParam.includes("-")) {
    response["unix"] = new Date(parseInt(inputParam)).getTime();
    response["utc"] = new Date(parseInt(inputParam)).toUTCString();
    res.json(response);
  }
  else if (!response.unix || !response.utc) {
    res.json({ error: "Invalid Date" });
  }
  else{res.json(response);}
  res.json(response);
});
app.get("/api/", (req, res) => {
  response["unix"] = new Date().getTime();
  response["utc"] = new Date().toUTCString();
  res.json(response);
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
