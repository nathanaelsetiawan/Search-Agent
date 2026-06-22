import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import searchRoutes from './app/routes/searchRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', searchRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', uptime: process.uptime() });
});

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
