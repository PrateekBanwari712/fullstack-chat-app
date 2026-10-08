import {app, server} from './socket/socket.js'
// import dotenv from 'dotenv';
// dotenv.config();
import express from 'express';
import {connectDB} from './db/connection1.db.js'
import cookieParser from 'cookie-parser';
import cors from 'cors';

connectDB();
// const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); 
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true, // Allow cookies to be sent   
   
}));
app.use(cookieParser());


//user routes
import userRoute from './routes/user.route.js';
app.use('/api/v1/user', userRoute);

// message route
import messageRoute from './routes/message.route.js';
app.use('/api/v1/message', messageRoute)

//middlwares
import { errorMiddleware } from './middlewares/error.middleware.js';
app.use(errorMiddleware);

server.listen(PORT, () => {
    console.log('listening server on port ' + PORT);
});