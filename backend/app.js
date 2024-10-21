import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
    origin: 'https://milan-patel-to-do-list-app-1gwi.vercel.app', // Your frontend URL
    credentials: true,
    methods: 'GET, POST, PUT, DELETE',
    allowedHeaders: ['Content-Type', 'Authorization']
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
