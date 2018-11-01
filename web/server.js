'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const {queryWrapper, upload} = require('./helpers/db/init.js')
const {asyncMiddleware} = require('./helpers/db/functions.js')

const fs = require('fs');

// Constants
const INTERNAL_PORT = 8081;
const EXTERNAL_PORT = 49161;
const HOST = '0.0.0.0';
const EXTERNAL_HOST = '127.0.0.1';


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
const path = require('path')

app.use('/img',express.static(path.join(__dirname, 'images')));

app.get('/asdfasdf', asyncMiddleware(async (req, res, next) => {
  res.json(await tempFunc());
}));

app.post('/uploadImage', upload.single('image'), async (req, res) => {
  res.json(await uploadImage(req));
});

app.get('/getImages', asyncMiddleware(async (req, res, next) => {
  let arr = []; for(let i = 0; i < 9; i++) { arr.push(await getRandomImage());
   }
  res.json(arr);
}));

async function getRandomImage() {
  const randomFamilyDir = await getRandomDir('images');
  return `http://${EXTERNAL_HOST}:${EXTERNAL_PORT}/img/${randomFamilyDir}/${await getRandomDir('images/' + randomFamilyDir)}`;
}

async function getRandomDir(path) {
  const imageDirs = await getImageDirs(path);
  const numDirs = imageDirs.length;
  return imageDirs[Math.floor(Math.random() * numDirs)];
}

function getImageDirs(path) {
  return new Promise(resolve => {
    fs.readdir(path, (err, list) => {
      if(err) {
        resolve(err);
      }
      resolve(list);
    });
  });
}


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