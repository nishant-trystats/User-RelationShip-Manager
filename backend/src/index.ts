import express from 'express';
import Noderoutes from './routes/node'
import Graphroutes from './routes/graph'
const app = express();
import dotenv from 'dotenv';
import connectToDatabase from './config/db';
dotenv.config();

const PORT = process.env.PORT || 3000;
app.use(express.json());

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
