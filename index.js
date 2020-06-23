var express = require('express');
const libre = require('libreoffice-convert');
var bodyParser = require('body-parser');
var formidable = require('formidable');
var fs = require('fs');
var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.post('/convert', function (req, res) {
  res.set('Access-Control-Allow-Origin', '*');
  
  var form = new formidable.IncomingForm();
  
  // max size set 100mb
  form.maxFieldsSize = 100 * 1024 * 1024;
  
  form.parse(req, function(err, fields, files) {
    if (err) {
      
      // Check for and handle any errors here.
      console.error(err.message);
      res.writeHead(500, {'content-type': 'application/json'});
      res.write({
        code: 500,
        message: err.message
      });
      
      res.end();
      return;
    }
  
    var format = fields.format || 'pdf';
  
    var file = fs.readFileSync(files.data.path);
    
    libre.convert(file, '.' + format, undefined, (err, done) => {
      if (err) {
        console.log(`Error converting file: ${err}`);
        res.writeHead(500, {'content-type': 'application/json'});
        res.write({
          code: 500,
          message: `Error converting file: ${err}`
        });

        res.end();
        return;
      }
      res.status(200).send(done);
    });
  });
});

var server = app.listen(5000, function () {
  var port = server.address().port;
  console.log('app listening at', port);
});

