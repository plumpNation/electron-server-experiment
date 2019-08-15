const express = require('express');
const cookieParser = require('cookie-parser');
const formidable = require('formidable');
const app = express();
const port = 1234;

app.use(cookieParser());

app.get('/', (req, res) => {
  res.cookie('name', 'jeff');
  res.json({ message: 'Hello World!' });
});

app.post('/upload', (req, res) => {
  var form = new formidable.IncomingForm();

  form.parse(req);

  form.on('fileBegin', (name, file) => {
    file.path = __dirname + '/uploads/' + file.name;
  });

  form.on('file', (name, file) => {
    console.log('Uploaded ' + file.name);
    res.json({message: 'complete'});
  });

  form.on('error', (err) => {
    res.status(500).json({error: err.message});
  });
});

app.get('/test-cookie', (req, res) => {
  console.log('Cookies received');
  console.log(req.cookies);
  res.json({ message: 'Hello World!' });
});

app.listen(port, () =>
  console.log(`Example app listening on port ${port}!`));
