import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// Add this before your routes
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://milan-patel-to-do-list-app.vercel.app');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    // Handle OPTIONS method
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

app.use(cors({
    origin: 'https://milan-patel-to-do-list-app-1gwi.vercel.app', // Your frontend URL
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS']
    // allowedHeaders: ['Content-Type', 'Authorization']
}))

app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true, limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

// routes import
import userRouter from './src/routes/user.routes.js'
import todoRouter from './src/routes/todo.routes.js';

app.use("/api/v1/users",userRouter);
app.use("/api/v1/todos", todoRouter);

app.get('/',(req,res) => {
    res.send('Hello world')
})
export {app}
