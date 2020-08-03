import express, {Request, Response} from 'express';
import bodyParser from 'body-parser';
import path from 'path';
const app = express();
app.use(express.static(path.join(__dirname, '../public')));

// GET, PUT, POST, DELETE

app.get('/ping', function (req:Request, res:Response) {
  return res.send('pong');
});

app.get('/', function (req, res) {
  // req.query
  // req.params
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

app.listen(process.env.PORT || 8080);
