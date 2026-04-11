import express from 'express';
import aiRoutes from './routes/ai.routes.js';
import cors from 'cors';

const app = express();

app.use(cors()); // Allow frontend to talk to backend
app.use(express.json()); // Allow backend to read JSON data

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use('/ai', aiRoutes);

export default app;
