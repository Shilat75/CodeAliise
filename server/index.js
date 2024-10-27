// import express from 'express';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import bodyParser from 'body-parser';
// import path from 'path';

// import userRoutes from './routes/users.js';
// import questionRoutes from './routes/Questions.js';
// import answerRoutes from './routes/Answers.js';
// import connectDB from './connectMongoDb.js';
// import chatgptRoutes from './routes/chatgpt.js';

// dotenv.config();


// connectDB();
// const app = express();

// app.use(express.json({ limit: '30mb', extended: true }));
// app.use(express.urlencoded({ limit: '30mb', extended: true }));
// app.use(cors());

// app.use('/user', userRoutes);
// app.use('/questions', questionRoutes);
// app.use('/answer', answerRoutes);

// app.use(bodyParser.json());
// app.use('/api/chatgpt', chatgptRoutes);

// const __dirname = path.resolve();
// app.use(express.static(__dirname));

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });


import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import path from 'path';
import userRoutes from './routes/users.js';
import questionRoutes from './routes/Questions.js';
import answerRoutes from './routes/Answers.js';
import messageRoutes from './routes/message.js';
import tagsRoutes from './routes/tags.js';
import connectDB from './connectMongoDb.js';
import chatgptRoutes from './routes/chatgpt.js';
import http from 'http';
import { sendMessage } from './controllers/message.js';
import { Server as SocketIOServer } from "socket.io";

dotenv.config();


const port = process.env.PORT || 8200;
const connectionUrl = process.env.CONNECTION_URL;
const jwtSecret = process.env.JWT_SECRET;

connectDB();
const app = express();
const server = http.createServer(app);

app.use(express.json({ limit: '30mb', extended: true }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));

const corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:8200'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true
};

app.use(cors(corsOptions));

const io = new SocketIOServer(server, {
  cors: {
    origin: 'http://localhost:8200',
    methods: ['GET', 'POST'],
    credentials: true
  }
});

app.use('/user', userRoutes);
app.use('/questions', questionRoutes);
app.use('/answer', answerRoutes);
app.use('/tag', tagsRoutes);
app.use('/message', messageRoutes);

app.use('/chatgpt', chatgptRoutes);

const __dirname = path.resolve();
app.use(express.static(__dirname));


const PORT = process.env.PORT || 8200;
sendMessage(io);

server.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});