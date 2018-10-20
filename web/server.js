'use strict';

const express = require('express');
const {Pool, Client} = require('pg');

// Constants
const INTERNAL_PORT = 8081;
const EXTERNAL_PORT = 49160;
const POSTGRES_PORT = 5432;
const HOST = '0.0.0.0';
const USER = 'user';
const DATABASE = 'db';
const PASSWORD = 'pass';

const client = new Pool({
  user: USER,
  host: 'db',
  database: DATABASE,
  password: PASSWORD,
  port: POSTGRES_PORT,
})
client.connect();

const asyncMiddleware = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next))
    .catch(next);
};

// App
const app = express();
app.get('/asdfasdf', asyncMiddleware(async (req, res, next) => {
  res.json(await tempFunc());
}));

async function tempFunc() {
  console.log('asdf');
  const query = {
    text: 'SELECT * FROM asdfasdf',
    values: [],
  }

  // promise
  let x =  await client.query(query)
    .then(docs => {return docs})
    .catch(e => {return e.stack});
  console.log(x);
  return x;
}

app.listen(INTERNAL_PORT, HOST);
console.log(`Running on http://${HOST}:${EXTERNAL_PORT}`);