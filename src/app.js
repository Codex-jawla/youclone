import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
    origin: '*',
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.use(express.json({limit: '32kb'}));
app.use(express.urlencoded({ extended: true, limit: '32kb' }));
app.use(express.static('public'));
app.use(cookieParser());



// Import routes here

import userRoutes from './routes/user.routes.js';

// Use routes here
app.use('/api/v1/auth', userRoutes);

export {app}