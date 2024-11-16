import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import emailRoutes from './routes/emailRoutes.js';
import authRoutes from './routes/authRoutes.js';
import analyticsRoutes from './routes/analyticsRoutes.js';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);

// Configure CORS for Socket.IO
const io = new SocketIOServer(server, {
  cors: {
    origin: 'http://localhost:5173', // Allow requests from this origin
    methods: ['GET', 'POST'],       // Allow these HTTP methods
  },
});

// Connect to the database
connectDB();

// Define your API routes
app.use('/api/emails', emailRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/analytics', analyticsRoutes);

// Root route handler to avoid 404 for root path requests
app.get('/', (req, res) => {
  res.send('Welcome to the API server!');
});

// Socket.io connection
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Function to emit email status updates
export const emitEmailStatus = (statusUpdate) => {
  io.emit('emailStatusUpdate', statusUpdate);
};

// Catch-all 404 handler for undefined routes
app.use((req, res) => {
  res.status(404).send('Route not found');
});

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
