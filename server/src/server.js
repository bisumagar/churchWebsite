import dotenv from 'dotenv';
import app from './app.js';
import connectDB from './database/connection.js';
dotenv.config();

await connectDB();


const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`);
});