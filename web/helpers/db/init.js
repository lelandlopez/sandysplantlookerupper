const {Pool, Client} = require('pg');
const tableInitStrings = require('./initTables.json')
const multer = require('multer')

const USER = 'user';
const DATABASE = 'db';
const PASSWORD = 'pass';
const POSTGRES_PORT = 5432;

const imageUploadFolder = 'public/images/uploads';

const dbCreds = {
  user: USER,
  host: 'db',
  database: DATABASE,
  password: PASSWORD,
  port: POSTGRES_PORT,
}

const client = new Client(dbCreds);
client.connect();

async function queryWrapper(query) {
  return await client.query(query)
    .then(res => {return res})
    .catch(e => {return e.stack});
}

async function initTables() {
  for(let x of tableInitStrings.tables) {
    await queryWrapper(x);
  }
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, imageUploadFolder)
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    }
});
const upload = multer({storage: storage});

initTables();

module.exports = {
  client,
  queryWrapper,
  upload
}