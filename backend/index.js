const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config')
const cors = require('cors');
const authRouter = require('./routes/authRoutes');

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth',authRouter);



const PORT =  5000;
app.listen(PORT, () => {
    console.log(`Server started on  http://localhost:${PORT}`);
}); 