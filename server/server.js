import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import userRoutes from './routes/userRouter.js';
import messageRoutes from './routes/chatRouters/messageRouter.js';
import conversationRoutes from './routes/chatRouters/conversationRouter.js';

// for environment variables
import dotenv from 'dotenv';
dotenv.config();

const app = express();

// general settings
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

//user routes
app.use('/user', userRoutes);

// chat routes
app.use('/conversation', conversationRoutes);
app.use('/message', messageRoutes);

// database connection
const {MONGO_URL} = process.env;
const PORT = process.env.PORT || 5000;
mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set('useFindAndModify', false);

