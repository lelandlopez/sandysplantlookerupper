'use strict';

const express = require('express');
const {Pool, Client} = require('pg');

// Constants
const INTERNAL_PORT = 8080;
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

// App
const app = express();
app.get('/', (req, res) => {
client.connect()
  res.send('Hello world asdfasdf\n');
});

app.listen(INTERNAL_PORT, HOST);
console.log(`Running on http://${HOST}:${EXTERNAL_PORT}`);