'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const {client, queryWrapper} = require('./helpers/db/init.js')
const {asyncMiddleware} = require('./helpers/db/functions.js')

// Constants
const INTERNAL_PORT = 8081;
const EXTERNAL_PORT = 49160;
const HOST = '0.0.0.0';

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/images/uploads')
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    }
});
var upload = multer({storage: storage});

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/asdfasdf', asyncMiddleware(async (req, res, next) => {
  res.json(await tempFunc());
}));

app.post('/uploadImage', upload.single('avatar'), (req, res) => {
  if (!req.file) {
    console.log("No file received");
    return res.send({
      success: false
    });

  } else {
    console.log('file received');
    const host = req.host;
    const filePath = req.protocol + "://" + host + '/' + req.file.path;
    console.log(filePath);
    return res.send({
      success: true
    })

  }
});

async function tempFunc() {
  const query = {
    text: "SELECT * FROM pg_catalog.pg_tables WHERE schemaname = 'public'",
    values: [],
  }

  return await queryWrapper(query);
}

app.listen(INTERNAL_PORT, HOST);
console.log(`Running on http://${HOST}:${EXTERNAL_PORT}`);