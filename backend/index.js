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
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
app.use(express.json());

app.use('/api/auth',authRouter);
app.use('/api/transactions',transactionRouter);



const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server started on port ${PORT}`);
});