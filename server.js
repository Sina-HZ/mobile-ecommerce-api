const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const mongoos = require('mongoose');
const Schema = mongoos.Schema;
const cors = require('cors');
const multer = require('multer');
const app = express();
global.config = require('./modules/config');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ type: 'application/json' }));
app.use('/uploads', express.static('uploads'));
app.use(cors());

mongoos.connect('mongodb://localhost:27017/mobiles',{useNewUrlParser: true});
mongoos.set('useCreateIndex', true, 'useFindAndModify', true)
mongoos.Promise = global.Promise;


const webRouter = require('./modules/routes/web');
const apiRouter = require('./modules/routes/api');

app.use('/',webRouter)
app.use('/api',apiRouter);

app.listen(3030)

