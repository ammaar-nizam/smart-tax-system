const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cookieParser = require('cookie-parser');
const cors = require("cors");

const agentRoute = require('./routes/agentRoute');

dotenv.config()

const PORT = process.env.PORT || 3000;

app.use(express.json())
app.use(cookieParser())
app.use(cors())

app.listen(PORT, ()=> {
    console.log(`Backend server is running on port ${PORT}!`);
});

app.use('/api/agents', agentRoute)