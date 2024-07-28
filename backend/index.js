const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRoutes = require('./Routes/AuthRoutes');
const productRouter = require('./Routes/productRouter');
require('dotenv').config();
require('./Models/db'); // Assuming this file initializes your database connection

const PORT = process.env.PORT || 3008;

// Middleware setup
app.use(bodyParser.json());
app.use(cors());

// Route setup
app.use('/auth', AuthRoutes);
app.use('/products', productRouter);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
