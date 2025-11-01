import express from 'express';
import Noderoutes from './routes/node'
import Graphroutes from './routes/graph'
const app = express();
import dotenv from 'dotenv';
import connectToDatabase from './config/db';
dotenv.config();
import cors from "cors";
const PORT = process.env.PORT || 3000;
app.use(express.json());

const whitelist = [
  'http://localhost:3000', // local dev
  'http://localhost:5173', // local dev
  'https://userrelatitonshitp.up.railway.app',
];

const corsOptions = {
  origin: function (origin:string|undefined, callback:any) {
    // Allow requests with no origin (like Postman, curl)
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS',],
};

app.use(cors(corsOptions));

app.use('/api/users',Noderoutes);
app.use('/api/graph',Graphroutes);

app.get('/', (_req, res) => {
  res.send('Hello from TypeScript backend!');
});

const startServer = async () => {
  await connectToDatabase();

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
};

startServer();
