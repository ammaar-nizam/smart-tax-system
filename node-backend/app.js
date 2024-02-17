import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { authorRoute } from './routes/authorRoute.js';
import { guidanceRoute } from './routes/guidanceRoute.js';

dotenv.config()

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json())
app.use(cookieParser())
app.use(cors())

app.listen(PORT, ()=> {
    console.log(`Backend server is running on port ${PORT}!`);
});

app.use('/api/authors', authorRoute)
app.use('/api/guides', guidanceRoute)