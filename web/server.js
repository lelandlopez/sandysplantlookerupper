'use strict';

const express = require('express');
const {Pool, Client} = require('pg');

// Constants
const PORT = 5432;
const HOST = '0.0.0.0';
const USER = 'user';
const DATABASE = 'db';
const PASSWORD = 'pass';

const client = new Pool({
  user: USER,
  host: 'db',
  database: DATABASE,
  password: PASSWORD,
  port: PORT,
})
client.connect();

// App
const app = express();
app.get('/', (req, res) => {
client.connect()
  res.send('Hello world asdfasdf\n');
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);