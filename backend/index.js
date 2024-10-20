import express from 'express';
import connectDB from './src/db/index.js';
import dotenv from 'dotenv';
import { app } from './app.js';

dotenv.config({
    path: './.env'
});


// Connect to database
await connectDB();

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});