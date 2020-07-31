// Develop vmgabriel

// Libraries
import socketIO = require('socket.io');
import * as express from 'express';
import * as cors from 'cors';
import * as redis from 'redis';
import { Server } from 'http';

// Constant
const app = express();
const server = new Server(app);
const redisClient = redis.createClient(6379, 'localhost');
const io = socketIO(server);


app.get('/', (req: express.Request, res: express.Response) => {
  res.status(200).send({ message: 'Done Correctly' });
});


io.on('connection', socket => {
  console.log('A User has Connected...');

  socket.on('subscribe', data => {
    console.log('data - ', data);
  });

  redisClient.on('error', error => {
    console.error(error);
  });

  redisClient.on('subscribe', (channel, message) => {
    console.log('Channel Subscribe - ', channel);
    console.log('Message Subscribe - ', message);
  });

  redisClient.on('message', (channel, message) => {
    console.log('Channel Message - ', channel);
    console.log('Message Message - ', message);
  });
});

redisClient.subscribe('daga-btb');

server.listen(3000, () => {
  console.log('Listening On Port 3000  ----- ');
});
