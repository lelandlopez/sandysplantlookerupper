'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const {client, queryWrapper, upload} = require('./helpers/db/init.js')
const {asyncMiddleware} = require('./helpers/db/functions.js')

// Constants
const INTERNAL_PORT = 8081;
const EXTERNAL_PORT = 49160;
const HOST = '0.0.0.0';


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/asdfasdf', asyncMiddleware(async (req, res, next) => {
  res.json(await tempFunc());
}));

app.post('/uploadImage', upload.single('image'), async (req, res) => {
  res.json(await uploadImage(req));
});


app.listen(INTERNAL_PORT, HOST);
console.log(`Running on http://${HOST}:${EXTERNAL_PORT}`);

async function uploadImage() {
  if (!req.file) {
    return {
      success: false
    };
  } else {
    return {
      success: true
    };
  }
}

async function tempFunc() {
  const query = {
    text: "SELECT * FROM pg_catalog.pg_tables WHERE schemaname = 'public'",
    values: [],
  }
  return await queryWrapper(query);
}