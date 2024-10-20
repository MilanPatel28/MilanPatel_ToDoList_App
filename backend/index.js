import express from 'express';
import connectDB from './src/db/index.js';
import dotenv from 'dotenv';

dotenv.config({
    path: './.env'
});

const app = express();

// Connect to database
await connectDB();

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});