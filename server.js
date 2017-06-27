import express from 'express';
import path from 'path';
import http from 'http';
import bodyParser from 'body-parser';
import api from './server/routes/api';
import './server/model/db';

let app = express();

const port = process.env.PORT || '3000';
app.set('port', port);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'dist')));

app.use('/api', api);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});


const server = http.createServer(app);

server.listen(port, () => console.log(`API running on localhost:${port}`));