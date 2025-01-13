const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config')

dotenv.config();
connectDB();

const app = express();





const PORT =  5000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
}); 