// Import necessary modules
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Create an Express app
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// MongoDB connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        process.exit(1);
    }
};

// Start the database connection
connectDB();

// Example route
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Example API route for users (optional based on your setup)
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

// Define the port and start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
