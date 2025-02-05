const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config')
const cors = require('cors');
const authRouter = require('./routes/authRoutes');
const transactionRouter = require("./routes/transactionRoutes");

dotenv.config();
connectDB();

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
app.use(express.json());

app.use('/api/auth',authRouter);
app.use('/api/transactions',transactionRouter);



const PORT =  5000;
app.listen(PORT, () => {
    console.log(`Server started on  http://localhost:${PORT}`);
}); 